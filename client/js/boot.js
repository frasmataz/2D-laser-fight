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
            //    game.stage.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            // Keep original size
            //    game.stage.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
            // Maintain aspect ratio
            if (this.game.device.desktop) {
                this.game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.stage.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.stage.scale.pageAlignHorizontally = true;
            } else {

                this.game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.stage.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
                // this.game.stage.scale.minWidth =  480;
                // this.game.stage.scale.minHeight = 260;
                // this.game.stage.scale.maxWidth = 640;
                // this.game.stage.scale.maxHeight = 480;
                this.game.stage.scale.pageAlignHorizontally = true;
                this.game.stage.scale.setScreenSize(true);
                //this.game.stage.scale.forceLandscape = true;
            }
            //this.game.stage.scale.refresh();
            this.game.state.start('preloader');
        }
    };

    window['phaser'] = window['phaser'] || {};
    window['phaser'].Boot = Boot;

}());