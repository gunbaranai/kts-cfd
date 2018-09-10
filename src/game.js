var CarFreeDay = CarFreeDay || {};

CarFreeDay.Game = function(){};
CarFreeDay.Game.prototype = {
    preload: function(){
        this.game.time.advancedTiming = true;
    },
    // Create
    create: function(){
        extraLive = false;
        interstitialShown = false;

        this.lives = lives;
        this.score = 0;
        this.level = 1;
        this.levelUpTimer = 0;
        this.scoreUpTimer = 0;
        this.speed = 1;
        currentTheme = this.game.rnd.integerInRange(1,5);

        this.roads = this.add.group();
        this.roads.create(0,0,this.addRoad(currentTheme));
        this.roads.scrollY = 0;
        //this.road = this.game.add.tileSprite(0,0,720,1280,this.seedRoad());

        this.top = this.game.add.sprite(this.game.world.centerX,48,'ui_top');
        this.top.anchor.setTo(0.5);

        this.scoreText = this.game.add.bitmapText(10,-5,'papercuts',"Score: ",40);
        this.recordText = this.game.add.bitmapText(10,30,'papercuts',"Record: ",40);
        this.scoreNumber = this.game.add.bitmapText(150,-5,'papercuts',lastScore,40);
        this.recordNumber = this.game.add.bitmapText(150,30,'papercuts',""+record+"",40);

        this.liveIcon = this.game.add.sprite(this.game.world.width-320,15,'live');
        this.liveNumber = this.game.add.bitmapText(this.game.world.width-270,15,'papercuts',"x"+this.lives,50);

        // Create mute button
        if(!this.game.sound.mute){
            sndSpr = 'ui_soundon';
        } else {
            sndSpr = 'ui_soundoff';
        }
        this.soundToggle = this.game.add.sprite(this.game.world.width-70,54,sndSpr);
        this.soundToggle.anchor.setTo(0.5);
        this.soundToggle.inputEnabled = true;
        this.soundToggle.events.onInputDown.add(function(sprite){
            if(!this.game.sound.mute){
                this.soundToggle.loadTexture('ui_soundoff');
                this.game.sound.mute = true;
            } else {
                this.soundToggle.loadTexture('ui_soundon');
                this.game.sound.mute = false;
            }
        },this);

        this.loadWalls();
    },

    // Update
    update: function(){

        if(this.lives < 1){
            // Gameover
            this.lwClose.start();
            this.rwClose.start();
            fromGameover = true;
            lastScore = this.score;
            this.lives = 0;
        } else {
            this.liveNumber.text = "x"+this.lives;


            this.scoreUpTimer += this.game.time.elapsed;
            if(this.scoreUpTimer>=5000){
                this.scoreUpTimer = 0;
                this.score += this.level;
            }
            this.scoreNumber.text = this.score;

            this.roads.y += this.speed;
            this.roads.scrollY -= 1;
            if(this.roads.scrollY <= 0){
                this.roads.scrollY += 25;
                this.roads.create(0,this.roads.cursor.y-1440,this.addRoad(currentTheme));
                this.roads.next();
            }

            //this.road.tilePosition.y += this.speed;

            this.levelUpTimer += this.game.time.elapsed;
            if( this.levelUpTimer >= 3000 ){
                this.levelUpTimer = 0;
                this.level += 1;
                currentTheme = this.game.rnd.integerInRange(1,5);
                this.speed += 0.5;
                console.log(currentTheme);
            }

            var pbr;
            pbr = this.score/40;
            bgm._sound.playbackRate.value = (pbr+100)/100;
        }
        
    },

    loadWalls: function(){
        this.leftWall = this.game.add.sprite(0, this.game.world.centerY, 'wall_l');
        this.leftWall.anchor.setTo(0.5);
        //this.leftWall.x = this.game.world.centerX-(this.leftWall.width/2);
        this.leftWall.x = 0 - (this.leftWall.width/2);
        this.lwOpen = this.game.add.tween(this.leftWall).to({x:0-(this.leftWall.width/2)},2500,Phaser.Easing.Bounce.Out);
        this.lwClose = this.game.add.tween(this.leftWall).to({x:this.game.world.centerX-(this.leftWall.width/2)},2500,Phaser.Easing.Bounce.Out);
        this.rightWall = this.game.add.sprite(0, this.game.world.centerY, 'wall_r');
        this.rightWall.anchor.setTo(0.5);
        //this.rightWall.x = this.game.world.centerX+(this.rightWall.width/2);
        this.rightWall.x = this.game.world.width + (this.rightWall.width/2);
        this.rwOpen = this.game.add.tween(this.rightWall).to({x:this.game.world.width+(this.rightWall.width/2)},2500,Phaser.Easing.Bounce.Out);
        this.rwClose = this.game.add.tween(this.rightWall).to({x:this.game.world.centerX+(this.rightWall.width/2)},2500,Phaser.Easing.Bounce.Out);

        //this.lwClose.onComplete.addOnce(function(){
            this.rwClose.onComplete.addOnce(function(){
                interstitial.load();
                //rewardedVideo.load();
                //rewardedVideoReady = rewardedVideo.isReady();
                this.game.state.start('Title');
            }, this);
        //}, this);
    },

    addRoad: function(seed){
        switch(seed){
            case 1:
                backTheme = 'bg_kpa';
                break;
            case 2:
                backTheme = 'bg_lwc';
                break;
            case 3:
                backTheme = 'bg_ncf';
                break;
            case 4:
                backTheme = 'bg_sbx';
                break;
            case 5:
                backTheme = 'bg_ucc';
                break;
            default:
                break;
        }
        return backTheme;
    },

    // FPS Counter
    render: function(){
        //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        //this.game.debug.pointer(this.game.input.activePointer);
    }
};