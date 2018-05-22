var CarFreeDay = CarFreeDay || {};

CarFreeDay.Boot = function(){};
CarFreeDay.Boot.prototype = {
    preload: function(){
        this.load.image('logo','assets/images/logo.png');
        //this.load.image('preloadbar','assets/images/preloadbar.png');
    },
    create: function(){
        this.game.stage.backgroundColor = '#000000';

        //this.game.scale.setMinMax(360,640,720,1280);
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //this.scale.setGameSize(720,1280);
        this.game.scale.refresh();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};