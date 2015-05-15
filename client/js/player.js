/**
 * Created by fraser on 14/05/15.
 */
'use strict';

function Player(game) {
    this.alive = true;
    this.game = game;
    this.speed = 0;
    this.maxSpeed = 300;
    this.accel = 35;
    this.scale = 0.3;
}

Player.prototype = {

    create: function() {
        this.sprite = this.game.add.sprite(20, 20, 'player');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.setSize(150,120,0,0);
        this.sprite.scale.set(this.scale);

        this.sprite.body.collideWorldBounds = true;
        this.game.camera.follow(this.sprite);
        this.cursors = this.game.input.keyboard.createCursorKeys();
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
        if (this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.A))
            velocity.x += -1;
        if (this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.D))
            velocity.x += 1;
        if (this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W))
            velocity.y += -1;
        if (this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S))
            velocity.y += 1;

        //Speed
        if (velocity.x !== 0 || velocity.y !== 0) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
                if (this.speed < this.maxSpeed*2)
                    this.speed += this.accel;//2000;//
            } else {
                if (this.speed > this.maxSpeed)
                    this.speed -= this.accel;
                else if (this.speed < this.maxSpeed)
                    this.speed += this.accel;
            }
        } else {
            if (this.speed > 0)
                this.speed -= this.accel;
        }

        velocity.normalize();
        velocity.multiply(this.speed, this.speed);
        this.sprite.body.velocity = velocity;


        //running angle but easy
        //var maxAngle = 90/2;
        var newAngle = Math.atan2(this.sprite.body.y + (this.sprite.body.width/2) - mouse.y, this.sprite.body.x + (this.sprite.body.height/2) - mouse.x) * 180 / Math.PI - 90;

        this.sprite.angle = newAngle;
    }
};