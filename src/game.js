var CarFreeDay = CarFreeDay || {};

CarFreeDay.Game = function(){};
CarFreeDay.Game.prototype = {
    preload: function(){
        this.game.time.advancedTiming = true;
    },
    // Create game objects (Road, Player)
    create: function(){
        var movementDirection = true;
        var speedLevel = 1;
        var playerLife = 2;
        var objectSpeed, levelTheme, nextLevelTheme;

        this.game.world.setBounds(0,0,this.game.width,5000+500*speedLevel);

        levelTheme = this.game.rnd.integerInRange(1,5);
        this.background = this.game.add.tileSprite(0,0,this.game.world.width,this.game.world.height,'road');
        //this.background.autoScroll(0,speedLevel*10);

        this.player = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+320,'player');
        this.player.animations.add('normal',[0,1],10,true);
        this.player.animations.add('right',[4,5],10,true);
        this.player.animations.add('left',[2,3],10,true);
        this.player.body.collideWorldBounds = true;
        this.game.physics.arcade.enable(this.player);

        this.playerSpeed = 100;
        this.playerScore = 0;

        this.generatesObstacles();
        this.generatesCars();
    },

    // Update
    update: function(){
        // Counts time spent and converts into speed/stage
        objectSpeed = speedLevel*10;
        this.playerScore += speedLevel;

        // Road parallax effect, changing asset depending on stage number
        

        if(this.player.alive && !this.stopped){

            // Goes up up and away
            this.player.body.velocity.y = -(100+speedLevel*10);

            //if(!this.wrapping && this.player.y )

            // Checks for tap/click
            if(this.game.input.activePointer.justPressed()){
                if(movementDirection){
                    this.game.physics.arcade.accelerateToXY(this.player,720,this.player.y);
                    movementDirection = false;
                } 
                else {
                    this.game.physics.arcade.accelerateToXY(this.player,0,this.player.y);
                    movementDirection = true;
                }
            }
            // Checks for coin
            //if(this.game.)
        }
        
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
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
        game.debug.pointer(game.input.pointer1);
    }
};