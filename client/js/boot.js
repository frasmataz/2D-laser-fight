/**
 * Created by fraser on 14/05/15.
 */
(function () {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        create: function () {
            console.log('boot create');
            this.game.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.stage.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.stage.scale.pageAlignHorizontally = true;
            } else {

                this.game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.stage.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

                this.game.stage.scale.pageAlignHorizontally = true;
                this.game.stage.scale.setScreenSize(true);
            }
            //this.game.stage.scale.refresh();
            this.game.state.start('preloader');
        }
    };

    window['phaser'] = window['phaser'] || {};
    window['phaser'].Boot = Boot;

}());