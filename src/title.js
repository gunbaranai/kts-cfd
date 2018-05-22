var CarFreeDay = CarFreeDay || {};

CarFreeDay.Title = function(){};
CarFreeDay.Title.prototype = {
    // Create title objects (background, buttons, etc)
    create: function(){
        console.log('No error preloading.');
        this.background = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'title_bg');
        this.background.animations.add('loop');
        this.background.animations.play('loop',10,true);
    },

    // Update
    update: function(){

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

    },
    // Opens twitter link
    twitterButton: function(){

    },

    // Game: *exists*
    playButton: function(){
        this.game.state.start('Game');
    }
};