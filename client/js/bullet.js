Bullet = function (game,x,y,weapon,angle) {
    Phaser.Sprite.call(this, game, x, y);
    this.checkWorldBounds=true;
    this.outOfBoundsKill=true;
    this.alive = true;
    this.game.state.callbackContext.bullets.add(this);

    this.resetProperties(x,y,weapon,angle);
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.resetProperties = function(x,y,weapon,angle) {
    this.loadTexture('bullet1');
    this.scale.set(0.5);
    this.anchor.setTo(0.5);
    this.damage = weapon.damage;
    this.angle = angle;
    this.reset(x,y);
    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.velocityFromAngle(angle, weapon.bulletSpeed, this.body.velocity);
};

function SingleBulletGun (game) {
    this.game = game;
    this.bulletSpeed=1500;
    this.nextFire = 0;
    this.fireRate = 150;
    this.damage = 30;
    this.distanceFromPlayer = 60;
}

SingleBulletGun.prototype = {
    fire: function(source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        var angle = source.sprite.angle-90;
        var bulletx = (Math.cos(angle * Math.PI / 180.0) * this.distanceFromPlayer) + source.sprite.x;
        var bullety = (Math.sin(angle * Math.PI / 180.0) * this.distanceFromPlayer) + source.sprite.y;

        var bullet = this.game.state.callbackContext.bullets.getFirstExists(false);

        if (bullet != null) {
            bullet.resetProperties(bulletx,bullety,this,angle);
        }else{
            bullet = new Bullet(this.game, bulletx, bullety, this, angle);
        }

        console.log(this.game.state.callbackContext.bullets.length + " bullets in existance");
        this.nextFire = this.game.time.time + this.fireRate;
    }
};