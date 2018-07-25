var CarFreeDay = CarFreeDay || {};

CarFreeDay.Title = function(){};
CarFreeDay.Title.prototype = {
    // Create title objects (background, buttons, etc)
    create: function(){
        banner.show();
        this.background = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'title_bg');
        this.background.anchor.setTo(0.5);
        this.background.animations.add('loop');
        this.background.animations.play('loop',5,true);

        this.title = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-370,'title_title');
        this.title.anchor.setTo(0.5);
        this.top = this.game.add.sprite(this.game.world.centerX,48,'ui_top');
        this.top.anchor.setTo(0.5);

        var playText = "TAP TO PLAY";
        var playStyle = { font: "50px Arial", fill: "#ffffff", align: "center", strokeThickness: 10 };
        this.play = this.game.add.text(this.game.world.centerX,this.game.world.centerY-150,playText,playStyle);
        this.play.anchor.setTo(0.5);
        this.blinkTimer = 0;

        this.facebook = this.game.add.button(70,this.game.world.height-70,'ui_f',this.facebookButton);
        this.facebook.anchor.setTo(0.5);
        this.twitter = this.game.add.button(180,this.game.world.height-70,'ui_t',this.twitterButton);
        this.twitter.anchor.setTo(0.5);
        this.help = this.game.add.button(this.game.world.width-70,this.game.world.height-70,'ui_help',this.tutorialButton);
        this.help.anchor.setTo(0.5);

        this.bgm = this.game.add.audio('bgm');
        this.bgm.play();
        this.sound = this.game.add.button(this.game.world.width-70,55,'ui_soundon',this.soundButton);
        this.sound.anchor.setTo(0.5);
    },

    // Update
    update: function(){
        // Text blinker
        this.blinkTimer += this.game.time.elapsed;
        if( this.blinkTimer >= 600 ){
            this.blinkTimer = 0;
            this.play.visible = !this.play.visible;
        }

        // Tapping anywhere not button
        if(this.game.input.activePointer.worldY >= 450 && this.game.input.activePointer.worldY <= 1100){
            if(this.game.input.activePointer.justPressed()){
                this.playButton();
            }
        }
    },

    // Sound button to enable/disable sound
    soundButton: function(){

    },

    // Tutorial button and picture
    // Button turns background dark, then show picture
    tutorialButton: function(){

    },
    // When clicked/tapped, background turns dark no more, then erase picture
    tutorialPicture: function(){

    },

    // Opens facebook link
    facebookButton: function(){
        console.log('fb');
    },
    // Opens twitter link
    twitterButton: function(){
        console.log('tw');
    },
    
    // Game: *exists*
    playButton: function(){
        this.game.state.start('Game');
    }
};