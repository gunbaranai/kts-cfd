var CarFreeDay = CarFreeDay || {};

CarFreeDay.Boot = function(){};
CarFreeDay.Boot.prototype = {
    preload: function(){
        this.load.image('logo','assets/images/preload_bg.png');
        this.load.image('preloadbar','assets/images/preload_bar.png');

        banner.load();
        banner.setLayout(Cocoon.Ad.BannerLayout.TOP_CENTER);
    },
    create: function(){
        this.game.stage.backgroundColor = '#000000';

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};