function Game() {
    this.player = null;
    this.bullets;
}

Game.prototype = {
    create: function() {
        console.log('Hit game prototype');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.image(0, 0, 'background');
        this.bullets = this.game.add.group();
        this.player = new Player(this.game);
        this.player.create();
    },

    update: function() {
        if(this.player !== null)
            this.player.update(this.game.input);
        this.game.physics.arcade.overlap(this.player.sprite, this.bullets, this.player.damage, null, this.player);
    },

    render: function() {

    }
};

window['phaser'] = window['phaser'] || {};
window['phaser'].Game = Game;