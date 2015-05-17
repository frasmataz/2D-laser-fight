/**
 * Created by fraser on 14/05/15.
 */
(function () {
    'use strict';

    function Game() {
        this.player = null;
    }

    Game.prototype = {
        create: function() {
            console.log('Hit game prototype');
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //this.game.add.image(0, 0, 'background');

            this.player = new Player(this.game);
            this.player.create();
        },

        update: function() {
            if(this.player !== null)
                this.player.update(this.game.input);
        },

        render: function() {

        }
    };

    window['phaser'] = window['phaser'] || {};
    window['phaser'].Game = Game;
}());