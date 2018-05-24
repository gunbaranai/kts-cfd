var CarFreeDay = CarFreeDay || {};

CarFreeDay.Game = function(){};
CarFreeDay.Game.prototype = {
    //preload: function(){
        //this.game.time.advancedTiming = true;
    //},
    // Create
    create: function(){
        this.background = this.game.add.tileSprite(this.game.world.centerX,this.game.world.centerY,this.game.width,this.game.height,'kpa');
        this.background.anchor.setTo(0.5);
        //this.background.scale.setTo(6);
        this.background.fixedToCamera = true;

        this.player = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('straight',[0,1]);
        this.player.animations.play('straight',10,true);
        this.game.physics.enable(this.player);
        this.player.body.velocity.set(-100);
    },

    // Update
    update: function(){
        this.game.world.bounds.centerOn(this.player.x,this.player.y-360);
        this.game.camera.setBoundsToWorld();

        this.background.tilePosition.y = -this.game.camera.y;
    },

    // Player collides
    playerHit: function(){
        this.game.state.start('Score', false, false);
    },

    // Level up
    levelUp: function(){
        
    },

    // Stage change
    changeStage: function(){
        nextLevelTheme = this.game.rnd.integerInRange(1,5);
        if(levelTheme == nextLevelTheme){
            changeStage;
        } else {
            
        }
    },

    generatesObstacles: function(){

    },

    generatesCars: function(){

    },

    // FPS Counter
    render: function(){
        //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        //this.game.debug.pointer(this.game.input.pointer1);
    }
};