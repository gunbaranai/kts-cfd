var CarFreeDay = CarFreeDay || {};

CarFreeDay.Preload = function(){};
CarFreeDay.Preload.prototype = {
    preload: function(){
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+196, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.bitmapFont('papercuts', 'assets/fonts/papercuts.png', 'assets/fonts/papercuts.fnt');

        this.loadImages();
        this.loadAudio();    
    },

    create: function(){
        this.state.start('Title');
    },

    loadImages: function(){
        this.load.spritesheet('title_bg','assets/images/title_bg.png',720,1280);
        this.load.image('title_title','assets/images/title_title.png');

        this.load.image('ui_top','assets/images/ui_top.png');
        this.load.image('ui_close','assets/images/ui_close.png');
        this.load.image('ui_gameover','assets/images/ui_gameover.png');
        this.load.image('ui_share','assets/images/ui_share.png');
        this.load.image('ui_replay','assets/images/ui_replay.png');
        this.load.image('ui_f','assets/images/ui_f.png');
        this.load.image('ui_t','assets/images/ui_t.png');
        this.load.image('ui_help','assets/images/ui_help.png');
        this.load.image('ui_tutorial','assets/images/ui_tutorial.png');
        this.load.image('ui_credits','assets/images/ui_credits.png');
        this.load.image('ui_ad','assets/images/ui_ad.png');
        this.load.image('ui_soundon','assets/images/ui_sndon.png');
        this.load.image('ui_soundoff','assets/images/ui_sndoff.png');

        this.load.image('bg_kpa','assets/images/kpa/background.png');
        this.load.image('bg_lwc','assets/images/lwc/background.png');
        this.load.image('bg_ncf','assets/images/ncf/background.png');
        this.load.image('bg_sbx','assets/images/sbx/background.png');
        this.load.image('bg_ucc','assets/images/ucc/background.png');

        this.load.image('obs_kpa_l','assets/images/kpa/obs_static_left.png');
        this.load.image('obs_kpa_r','assets/images/kpa/obs_static_right.png');

        this.load.image('obs_lwc_m','assets/images/lwc/obs_static_side.png');
        this.load.image('obs_lwc_ml','assets/images/lwc/obs_passable_left.png');
        this.load.image('obs_lwc_mr','assets/images/lwc/obs_passable_right.png');
        this.load.image('obs_lwc_l','assets/images/lwc/obs_static_center.png');

        this.load.image('obs_ucc_a','assets/images/ucc/obs_static_red.png');
        this.load.image('obs_ucc_r','assets/images/ucc/obs_static_blue.png');

        this.load.spritesheet('obs_gbl_v','assets/images/car/mobil-01.png',144,288);
        this.load.spritesheet('obs_gbl_t','assets/images/car/mobil-02.png',144,288);
        this.load.spritesheet('obs_gbl_s','assets/images/car/mobil-03.png',144,288);

        this.load.image('live','assets/images/live.png');
        this.load.image('coin','assets/images/coin.png');
        this.load.spritesheet('star','assets/images/star.png',102,90);

        this.load.spritesheet('player','assets/images/player.png',144,144);

        this.load.image('wall_l','assets/images/wall-l.png');
        this.load.image('wall_r','assets/images/wall-r.png');
    },

    loadAudio: function(){
        this.load.audio('applause','assets/audio/applause.ogg');
        this.load.audio('correct','assets/audio/correct.ogg');
        this.load.audio('wrong','assets/audio/wrong.ogg');
        this.load.audio('hit','assets/audio/hit.ogg');
        this.load.audio('empty','assets/audio/empty.ogg');

        this.load.audio('bgm','assets/audio/bgm.ogg');
    }
};