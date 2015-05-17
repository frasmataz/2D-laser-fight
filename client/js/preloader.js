/**
 * Created by fraser on 14/05/15.
 */
(function() {
    'use strict';

    function Preloader() {
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function() {
            console.log('Preloading..');
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.game.load.image('player', 'assets/ship.png');
            this.game.load.image('background', 'assets/background.jpg');
            this.game.load.image('bullet1', 'assets/bullet1.png');
        },

        update: function() {
            if (!!this.ready) {
                this.game.state.start('game');
            }
        },

        onLoadComplete: function() {
            console.log('Preloading done');
            this.ready = true;
        }
    };

    window['phaser'] = window['phaser'] || {};
    window['phaser'].Preloader = Preloader;
}());