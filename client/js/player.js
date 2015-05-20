/**
 * Created by fraser on 14/05/15.
 */
'use strict';

function Player(game) {
    this.state;
    this.health;
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
}

Player.prototype = {

    create: function() {
        console.log('Spawned player');
        this.state = 'alive';
        this.sprite = this.game.add.sprite(20, 20, 'player');
        this.sprite.anchor.setTo(0.5);
        this.sprite.scale.set(this.scale);
        this.game.physics.arcade.enable(this.sprite);
        this.weapon = new SingleBulletGun(this.game);

        this.health = 100;
        this.sprite.body.collideWorldBounds = true;
        this.game.camera.follow(this.sprite);
    },
    update: function(mouse) {

        if (this.state == 'alive') {

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

            this.sprite.angle = Math.atan2(this.sprite.body.y + (this.sprite.body.width / 2) - mouse.y, this.sprite.body.x + (this.sprite.body.height / 2) - mouse.x) * 180 / Math.PI - 90;
        }
        else if (this.state == 'dead') {
            if ((this.game.time.time - this.deathTime) > this.clearTime)
                this.clear();
        }
        else if (this.state == 'cleared') {
            if ((this.game.time.time - this.deathTime) > this.respawnTime)
                this.spawn();
        }
    },
    damage: function(player,bullet) {
        this.health -= bullet.damage;
        bullet.kill();
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
    },

    spawn: function() {
        console.log('Spawning');
        this.create();
    }
};