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

        this.activationDelay = 0;
        this.lives = lives;
        this.score = 0;

        var seed;
        seed = this.game.rnd.integerInRange(1,6);

        this.backWidth = this.game.cache.getImage(this.backTheme).width;
        this.backHeight = this.game.cache.getImage(this.backTheme).height;
        this.backs = this.game.add.group();
        this.backs.createMultiple(100, this.backTheme);

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
        this.scoreNumber.text = this.score;
        var pbr;
        pbr = this.score/40;
        bgm._sound.playbackRate.value = (pbr+100)/100;

        if(this.score >= 4300){
            this.spawnInterval = 100;
            this.spawnDuration = 600;
        } else if(this.score >= 2300){
            this.spawnInterval = (4750-this.score)/5;
            this.spawnDuration = 600;
        } else if(this.score >= 1550){
            this.spawnInterval = (5250-this.score)/6;
            this.spawnDuration = (6750-this.score)/7;
        } else if(this.score >= 1000){
            this.spawnInterval = (4000-this.score)/4;
            this.spawnDuration = (4300-this.score)/4;
        } else if(this.score >= 950){
            this.spawnInterval = 775;
            this.spawnDuration = 850;
        } else if(this.score >= 650){
            this.spawnInterval = (2500-this.score)/2;
            this.spawnDuration = (2600-this.score)/2;
        } else if(this.score >= 550){
            this.spawnInterval = (2500-this.score)/2;
            this.spawnDuration = 1000;
        } else if(this.score >= 300){
            this.spawnInterval = (1000-this.score)*2;
            this.spawnDuration = 1000;
        }

        this.activationDelay += this.game.time.elapsed;
        if(this.activationDelay >= this.spawnInterval){
            var searching = true, mole, seed;
            while(searching){
                mole = this.moles.getRandom();
                if(!mole.active){
                    mole.active = true;
                    seed = this.game.rnd.integerInRange(1,100);
                    //console.log(seed);
                    
                    if(this.score > 4250){
                        if(seed < 30){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else if(seed > 65){
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        } else {
                            mole.type = 'head';
                            mole.loadTexture('head');
                        }
                    } else if(this.score > 2250){
                        var coffeeSum = (7250-this.score)/100;
                        if(seed < coffeeSum){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else if(seed > 100-(coffeeSum/2)){
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        } else {
                            mole.type = 'head';
                            mole.loadTexture('head');
                        }
                    // Third phase, 60 | 30 | 10
                    } else if(this.score > 100){
                        if(seed > 50){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else if(seed > 25){
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        } else {
                            mole.type = 'head';
                            mole.loadTexture('head');
                        }
                    // Second phase, 80 | 20 | 0
                    } else if(this.score >= 0){
                        if(seed > 25){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else {
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        }
                    // First phase, 100 | 0 | 0
                    } else {
                        mole.type = 'coffee';
                        mole.loadTexture('coffee');
                    }
                    searching = false;
                }
            }
            this.activationDelay = 0;
        }
        
        this.moles.forEach(function(mole){
            if(mole.active){
                //console.log('durray: ',mole.x,mole.y);
                mole.activeDuration += this.game.time.elapsed;
                if(mole.activeDuration >= this.spawnDuration){
                    if(!mole.hit && mole.type == 'coffee'){
                        this.lives -= 2;
                    }
                    mole.active = false;
                    mole.hit = false;
                    mole.type = '';
                    mole.loadTexture('idle');
                    mole.activeDuration = 0;
                }
            }
        }, this);

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

    // FPS Counter
    render: function(){
        //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        //this.game.debug.pointer(this.game.input.activePointer);
    }
};