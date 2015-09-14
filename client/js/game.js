function RGBtoHEX(r, g, b) {

    return r << 16 | g << 8 | b;

}

function Game() {
    this.player = null;
    this.players = new Array();
    this.bullets;
}

var messageList = document.getElementById("messages");

Game.prototype = {
    create: function() {
        console.log('Hit game prototype');

        this.game.world.setBounds(0, 0, 1920, 1920);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.image(0, 0, 'background');
        this.bullets = this.game.add.group();
        this.player = new Player(this.game, "Fraser", true);
        this.players.push(this.player);

        this.players.push(new Player(this.game, "Plarp", false));
        this.players.push(new Player(this.game, "Sponge", false));
        this.players.push(new Player(this.game, "Alan", false));
        this.players.push(new Player(this.game, "Flange", false));

        this.players.forEach(
            function(player){
                player.create();
            }
        )
    },

    update: function() {

        var parent = this;

        this.players.forEach(
            function(player){
                player.update();

                if(player.state == 'alive')
                    parent.game.physics.arcade.overlap(player.sprite, parent.bullets, player.damage, null, player);
            }
        );
    },

    render: function() {
        //this.game.debug.body(this.player.sprite);
    }
};

window['phaser'] = window['phaser'] || {};
window['phaser'].Game = Game;