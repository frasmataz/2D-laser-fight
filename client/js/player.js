/**
 * Created by fraser on 14/05/15.
 */
'use strict';

function Player(game) {
    this.alive = true;
    this.game = game;
    this.speed = 0;
    this.velocity = new Phaser.Point(0, 0);
    this.maxSpeed = 500;
    this.accel = 50;
    this.deccel = 20;
    this.scale = 0.3;
    this.weapon = null;
}

Player.prototype = {

    create: function() {
        this.sprite = this.game.add.sprite(20, 20, 'player');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.setSize(150,120,0,0);
        this.sprite.scale.set(this.scale);
        this.weapon = new Weapon.SingleBullet(this.game);

        this.sprite.body.collideWorldBounds = true;
        this.game.camera.follow(this.sprite);
    },
    update: function(mouse) {
        // this.game.physics.arcade.collide(this.sprite,this.sprite2);
        // if(this.sprite,this.map)
        // 	this.game.physics.arcade.collide(this.map.collisionLayer,this.sprite);
        if (!this.alive) {
            this.speed = 0;
            return;
        }
        var velocity = new Phaser.Point(0, 0);
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A) && this.velocity.x > -this.maxSpeed)
            this.velocity.x -= this.accel;
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) && this.velocity.x < this.maxSpeed)
            this.velocity.x += this.accel;
        else
            if (this.velocity.x < 0)
                this.velocity.x += this.deccel;
            else if (this.velocity.x > 0)
                this.velocity.x -= this.deccel;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W) && this.velocity.y > -this.maxSpeed)
            this.velocity.y -= this.accel;
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S) && this.velocity.y < this.maxSpeed)
            this.velocity.y += this.accel;
        else
            if (this.velocity.y < 0)
                this.velocity.y += this.deccel;
            else if (this.velocity.y > 0)
                this.velocity.y -= this.deccel;

        this.sprite.body.velocity = this.velocity;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.weapon.fire(this);
        }

        var newAngle = Math.atan2(this.sprite.body.y + (this.sprite.body.width/2) - mouse.y, this.sprite.body.x + (this.sprite.body.height/2) - mouse.x) * 180 / Math.PI - 90;

        this.sprite.angle = newAngle;
    }
};