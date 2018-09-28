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
        this.speed = 3;
        this.leanRight = true;
        this.leanSpeed = 0.1;
        this.canPress = true;
        this.pressTimer = 0;
        currentTheme = this.game.rnd.integerInRange(1,5);

        this.roads = this.add.group();
        this.roads.create(0,0,this.addRoad(currentTheme));
        this.roads.scrollY = 0;

        this.player = this.game.add.sprite(this.game.world.centerX,this.game.world.height-200,'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('straight',[0,1]);
        this.player.animations.add('right',[4,5]);
        this.player.animations.add('left',[2,3]);
        this.player.animations.play('straight',10,true);
        this.player.inv = false;
        this.player.invTick = 0;
        this.player.invBlinkTimer = 0;
        this.game.physics.enable(this.player);

        this.stageObstacles = this.add.physicsGroup();
        this.stageGimmicks = this.add.group();
        this.spawnObstacles(currentTheme,this,true);
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
            //EVERYTHING HAPPENS IN REAL TIME
            this.liveNumber.text = "x"+this.lives;

            if(!this.player.inv){
                if(this.player.x < 0 || this.player.x > this.game.world.width){
                    this.player.inv = true;
                    this.lives -= 1;
                    this.player.x = this.game.world.centerX;
                    this.leanSpeed = 0.1;
                    console.log('oob');
                }
                this.stageObstacles.forEach(this.checkHit, this, true, this.player)
            } else {
                this.player.invBlinkTimer += this.game.time.elapsed;
                if( this.player.invBlinkTimer >= 300 ){
                    this.player.invBlinkTimer = 0;
                    this.player.visible = !this.player.visible;
                    this.player.invTick += 1;
                }

                if(this.player.invTick >= 10){
                    this.player.invTick = 0;
                    this.player.invBlinkTimer = 0;
                    this.player.inv = false;
                }
            }

            if(this.leanRight){
                this.player.animations.play('right',10,true);
                this.player.x += this.leanSpeed;
            } else {
                this.player.animations.play('left',10,true);
                this.player.x -= this.leanSpeed;
            }
            this.leanSpeed += 0.1;

            if(this.game.input.activePointer.worldY >= 150 && this.canPress){
                if(this.game.input.activePointer.justPressed()){
                    this.leanRight = !this.leanRight;
                    this.leanSpeed = 0.1;
                    this.canPress = false;
                }
            }

            if(!this.canPress){
                this.pressTimer += this.game.time.elapsed;
                if(this.pressTimer >= 500){
                    this.pressTimer = 0;
                    this.canPress = true;
                }
            }

            this.scoreUpTimer += this.game.time.elapsed;
            if(this.scoreUpTimer>=5000){
                this.scoreUpTimer = 0;
                this.score += this.level;
            }
            this.scoreNumber.text = this.score;

            this.stageGimmicks.y += this.speed;
            this.stageObstacles.y += this.speed;
            this.roads.y += this.speed;
            this.roads.scrollY -= 1;
            if(this.roads.scrollY <= 0){
                this.roads.scrollY += 50;
                this.roads.create(0,this.roads.cursor.y-1440,this.addRoad(currentTheme));
                this.spawnObstacles(currentTheme,this);
                this.roads.next();
            }

            for (var i = 0; i<this.stageObstacles.length;) {
                if(this.stageObstacles.children[i].y > 2000){
                    this.stageObstacles.remove(this.stageObstacles.children[i], true);
                    continue;
                }
                i++;
            }

            //this.road.tilePosition.y += this.speed;

            this.levelUpTimer += this.game.time.elapsed;
            if( this.levelUpTimer >= 3000 ){
                this.levelUpTimer = 0;
                this.level += 1;
                currentTheme = this.game.rnd.integerInRange(1,5);
                this.speed += 0.3;
                console.log(currentTheme);
                for(var i=0; i<this.roads.length;){
                    if(this.roads.children[i].y > 3000){
                        this.roads.remove(this.roads.children[i], true);
                        continue;
                    }
                    i++;
                }
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
                //interstitial.load();
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

    spawnObstacles: function(cT,me,init=false){
        var d = 144, cf, j = 0;
        if(init){
            oy = 0;
        } else {
            oy = me.roads.cursor.y-1500;
        }

        for (var i = 49; i >= 0; i--) {
            switch(i % 5){
                case 0:
                    switch(cT){
                        case 1:
                            if(me.game.rnd.integerInRange(1,100) > 80){
                                me.stageObstacles.create(0,(d*j)+oy,'obs_kpa_l');
                            }
                            break;
                        case 2:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                me.stageObstacles.create(0,(d*j)+oy,'obs_lwc_m');
                                me.stageGimmicks.create(0,(d*j)+oy-100,'obs_lwc_ml');
                            }
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            if(me.game.rnd.integerInRange(1,100) > 90){
                                if(me.game.rnd.integerInRange(1,100) > 50){
                                    me.stageObstacles.create(0,(d*j)+oy,'obs_ucc_a');
                                } else {
                                    me.stageObstacles.create(0,(d*j)+oy,'obs_ucc_r');
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 1:
                    cf = me.game.rnd.integerInRange(0,2);
                    switch(cT){
                        case 1:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 90){
                                    me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        case 2:
                            if(me.game.rnd.integerInRange(1,100) > 97){
                                me.stageGimmicks.create(d*1,(d*j)+oy,'obs_lwc_l');
                            }
                            break;
                        case 3:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 60){
                                    me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        case 4:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 30){
                                    me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        case 5:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 30){
                                    me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*1,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 2:
                    switch(cT){
                        case 1:
                            break;
                        case 2:
                            if(me.game.rnd.integerInRange(1,100) > 97){
                                me.stageGimmicks.create(d*2,(d*j)+oy,'obs_lwc_l');
                            }
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                        default:
                            break;
                    }
                    break;
                case 3:
                    cf = me.game.rnd.integerInRange(3,5);
                    switch(cT){
                        case 1:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 90){
                                    me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        case 2:
                            if(me.game.rnd.integerInRange(1,100) > 97){
                                me.stageGimmicks.create(d*3,(d*j)+oy,'obs_lwc_l');
                            }
                            break;
                        case 3:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 60){
                                    me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        case 4:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 30){
                                    me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        case 5:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                if(me.game.rnd.integerInRange(1,100) > 30){
                                    me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_s',cf);
                                } else {
                                    if(me.game.rnd.integerInRange(1,100) > 50){
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_t',cf);
                                    } else {
                                        me.stageGimmicks.create(d*3,(d*j)+oy,'obs_gbl_v',cf);
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 4:
                    switch(cT){
                        case 1:
                            if(me.game.rnd.integerInRange(1,100) > 80){
                                me.stageObstacles.create(d*4,(d*j)+oy,'obs_kpa_r');
                            }
                            break;
                        case 2:
                            if(me.game.rnd.integerInRange(1,100) > 95){
                                me.stageObstacles.create(d*4,(d*j)+oy,'obs_lwc_m');
                                me.stageGimmicks.create(d*3,(d*j)+oy-100,'obs_lwc_mr');
                            }
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            if(me.game.rnd.integerInRange(1,100) > 90){
                                if(me.game.rnd.integerInRange(1,100) > 50){
                                    me.stageObstacles.create(d*4,(d*j)+oy,'obs_ucc_a');
                                } else {
                                    me.stageObstacles.create(d*4,(d*j)+oy,'obs_ucc_r');
                                }
                            }
                            break;
                        default:
                            break;
                        }
                    j++;
                    break;
                default:
                    break;
            }
        }
    },

    checkHit: function(obstacle,player){
        if(player.x-(player.width/2) <= obstacle.x+obstacle.width &&
            player.x-(player.width/2)+player.width >= obstacle.x &&
            player.y-(player.height/2) <= obstacle.y+obstacle.height &&
            player.height+player.y-(player.height/2) >= obstacle.y){
                player.inv = true;
                this.lives -= 1;
                console.log('hit');
        }
        return;
    },

    // FPS Counter
    render: function(){
        //this.game.debug.text(this.player.x || '--', 2, 100, "#00ff00");
        //this.game.debug.text(this.player.y || '--', 2, 150, "#00ff00");
        //this.game.debug.pointer(this.game.input.activePointer);
    }
};