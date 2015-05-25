function RGBtoHEX(r, g, b) {

    return r << 16 | g << 8 | b;

}

function Game() {
    this.player = null;
    this.bullets;
}

Game.prototype = {
    create: function() {
        console.log('Hit game prototype');
        this.game.world.setBounds(0, 0, 1920, 1920);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.image(0, 0, 'background');
        this.bullets = this.game.add.group();
        this.player = new Player(this.game, "Fraser", true);
        this.player.create();

        this.enemy = new Player(this.game, "Plarp", false);
        this.enemy.create();
        this.enemy1 = new Player(this.game, "Sponge", false);
        this.enemy1.create();
        this.enemy2 = new Player(this.game, "Alan", false);
        this.enemy2.create();
        this.enemy3 = new Player(this.game, "Flange", false);
        this.enemy3.create();
    },

    update: function() {
        this.player.update(this.game.input);
        this.enemy.update(this.game.input);
        this.enemy1.update(this.game.input);
        this.enemy2.update(this.game.input);
        this.enemy3.update(this.game.input);

        

        if(this.player.state == 'alive')
            this.game.physics.arcade.overlap(this.player.sprite, this.bullets, this.player.damage, null, this.player);
        if(this.enemy.state == 'alive')
            this.game.physics.arcade.overlap(this.enemy.sprite, this.bullets, this.enemy.damage, null, this.enemy);
        if(this.enemy1.state == 'alive')
            this.game.physics.arcade.overlap(this.enemy1.sprite, this.bullets, this.enemy1.damage, null, this.enemy1);
        if(this.enemy2.state == 'alive')
            this.game.physics.arcade.overlap(this.enemy2.sprite, this.bullets, this.enemy2.damage, null, this.enemy2);
        if(this.enemy3.state == 'alive')
            this.game.physics.arcade.overlap(this.enemy3.sprite, this.bullets, this.enemy3.damage, null, this.enemy3);
    },

    render: function() {
        //this.game.debug.body(this.player.sprite);
    }
};

window['phaser'] = window['phaser'] || {};
window['phaser'].Game = Game;