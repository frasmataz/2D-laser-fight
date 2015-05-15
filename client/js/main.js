/**
 * Created by fraser on 14/05/15.
 */
window.onload = function() {
    console.log('onload');
    'use strict';

    var game;
    var ns = window['phaser'];

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('game', ns.Game);

    console.log('Supposedly about to boot');
    game.state.start('boot');
};