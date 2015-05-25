/**
 * Created by fraser on 14/05/15.
 */
'use strict';

function Player(game, name, isPlayer) {
    this.state;
    this.health;
    this.emitter;
    this.isPlayer = isPlayer;
    this.game = game;
    this.speed = 0;
    this.velocity = new Phaser.Point(0, 0);
    this.maxSpeed = 500;
    this.accel = 50;
    this.deccel = 20;
    this.scale = 0.3;
    this.weapon = null;
    this.deathTime = 0;
    this.clearTime = 500;
    this.respawnTime = 1200;
    this.name = name;
    this.nameText;
}

Player.prototype = {

    create: function() {
        console.log('Spawned player');
        this.state = 'alive';
        this.sprite = this.game.add.sprite(Math.floor((Math.random() * this.game.world.width) + 1),
            Math.floor((Math.random() * this.game.world.height) + 1), 'player');
        this.sprite.anchor.setTo(0.5);
        this.sprite.scale.set(this.scale);
        this.game.physics.arcade.enable(this.sprite);
        this.weapon = new SingleBulletGun(this.game);

        this.health = 100;
        this.sprite.body.collideWorldBounds = true;
        if(this.isPlayer)
            this.game.camera.follow(this.sprite);

        this.nameText = this.game.add.text(
            this.sprite.body.x,
            this.sprite.body.y,
            this.name,
            {
                font: "bold 10pt Sans",
                fill: "#FFF",
                align: "center"
            }
        );

        this.nameText.shadowBlur = 1;
        this.nameText.shadowColor = "black";
        this.nameText.anchor.setTo(0.5,0.5);
    },
    update: function(mouse) {

        if (this.isPlayer && this.state == 'alive') {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A ||
                    this.game.input) && this.velocity.x > -this.maxSpeed)
                this.velocity.x -= this.accel;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) && this.velocity.x < this.maxSpeed)
                this.velocity.x += this.accel;
            else if (this.velocity.x < 0)
                this.velocity.x += this.deccel;
            else if (this.velocity.x > 0)
                this.velocity.x -= this.deccel;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W) && this.velocity.y > -this.maxSpeed)
                this.velocity.y -= this.accel;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S) && this.velocity.y < this.maxSpeed)
                this.velocity.y += this.accel;
            else if (this.velocity.y < 0)
                this.velocity.y += this.deccel;
            else if (this.velocity.y > 0)
                this.velocity.y -= this.deccel;

            this.sprite.body.velocity = this.velocity;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.game.input.activePointer.isDown)
                this.weapon.fire(this);

            this.sprite.angle = Math.atan2(this.sprite.body.y + (this.sprite.body.width / 2) - this.game.input.worldY, this.sprite.body.x + (this.sprite.body.height / 2) - this.game.input.worldX) * 180 / Math.PI - 90;
        }
        else if (this.state == 'dead') {
            if ((this.game.time.time - this.deathTime) > this.clearTime)
                this.clear();
        }
        else if (this.state == 'cleared') {
            if ((this.game.time.time - this.deathTime) > this.respawnTime)
                this.spawn();
        }

        this.nameText.position.setTo(this.sprite.position.x, this.sprite.position.y+40);
    },
    damage: function(player,bullet) {
        this.health -= bullet.damage;
        bullet.kill();
        this.emitter = this.game.add.emitter(this.sprite.body.x+(this.sprite.width/2), this.sprite.body.y+(this.sprite.height/2));
        this.emitter.makeParticles('spark', 1, 10, true, true);
        this.emitter.setXSpeed(-300,300);
        this.emitter.setYSpeed(-300,300);
        this.emitter.setScale(1,3,1,3);
        this.emitter.gravity=0;
        this.emitter.explode(200,10);
        console.log("hit me, health " + this.health);
        if (this.health <= 0)
            this.die();
        else
            this.sprite.tint = RGBtoHEX(255, (this.health/100 * 255), (this.health/100) * 255);
    },
    die: function(bullet,player) {
        console.log('Died');
        this.state = 'dead';
        this.sprite.loadTexture('dead');
        this.velocity.set(0, 0);
        this.sprite.angle = 0;
        this.deathTime = this.game.time.time;
    },

    clear: function() {
        console.log('Cleared');
        this.sprite.visible = false;
        //this.kill();
        this.state = 'cleared';
        this.nameText.kill();
    },

    spawn: function() {
        console.log('Spawning');
        this.create();
    }
};