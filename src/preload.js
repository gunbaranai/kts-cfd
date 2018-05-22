var CarFreeDay = CarFreeDay || {};

CarFreeDay.Preload = function(){};
CarFreeDay.Preload.prototype = {
    preload: function(){
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);
        //this.splash.scale.setTo(0.3);
        
        //this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+120, 'preloadbar');
        //this.preloadBar.anchor.setTo(0.5);

        this.load.spritesheet('player','assets/images/player.png',24,24);
        this.load.spritesheet('title_bg','assets/images/title_bg.png',720,1280);
        this.load.image('kpa','assets/images/r_kpa.png');
        this.load.image('lwc','assets/images/r_lwc.png');
        this.load.image('ncf','assets/images/r_ncf.png');
        this.load.image('sbx','assets/images/r_sbx.png');
        this.load.image('ucc','assets/images/r_ucc.png');
        //this.load.audio();
    },
    create: function(){
        this.state.start('Title');
    }
};