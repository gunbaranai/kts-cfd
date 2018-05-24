var CarFreeDay = CarFreeDay || {};

CarFreeDay.Preload = function(){};
CarFreeDay.Preload.prototype = {
    preload: function(){
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+196, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.spritesheet('player','assets/images/player.png',144,144);

        this.load.spritesheet('title_bg','assets/images/title_bg.png',720,1280);
        this.load.image('title_title','assets/images/title_title.png');

        this.load.image('ui_top','assets/images/ui_top.png');
        this.load.image('ui_f','assets/images/ui_f.png');
        this.load.image('ui_t','assets/images/ui_t.png');
        this.load.image('ui_help','assets/images/ui_help.png');
        this.load.image('ui_soundon','assets/images/ui_sndon.png');
        this.load.image('ui_soundoff','assets/images/ui_sndoff.png');

        this.load.image('kpa','assets/images/r_kpa.png');
        this.load.image('lwc','assets/images/r_lwc.png');
        this.load.image('ncf','assets/images/r_ncf.png');
        this.load.image('sbx','assets/images/r_sbx.png');
        this.load.image('ucc','assets/images/r_ucc.png');

        this.load.audio('bgm','assets/audio/bgm.ogg');
    },
    create: function(){
        this.state.start('Title');
    }
};