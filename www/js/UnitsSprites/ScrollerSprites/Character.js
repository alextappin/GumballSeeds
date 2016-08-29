/**
 * Created by t_tappa on 11/30/2015.
 */
function Character() {
    PIXI.Container.call(this);
    this.constructCharacter();
}

Character.constructor = Character;
Character.prototype = Object.create(PIXI.Container.prototype);

Character.prototype.constructCharacter = function() {
    this.Properties = new CharacterProperties();
    this.initiateCharacterSprites();
    /*this.listenForJumpTrigger();
    this.listenForAttackTrigger();*/
};

Character.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.characterScale = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.characterPercent);

    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.characterScale,MainGlobals.Scaling.characterScale);
    obj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.characterPositionX, 0);

    MainGlobals.Physics.characterAirborn = true;
};

Character.prototype.initiateCharacterSprites = function() {
    this.Properties.runTextures.push(
        PIXI.Texture.fromFrame("gbs run1"),
        PIXI.Texture.fromFrame("gbs run2"),
        PIXI.Texture.fromFrame("gbs run3"),
        PIXI.Texture.fromFrame("gbs run4"),
        PIXI.Texture.fromFrame("gbs run5"),
        PIXI.Texture.fromFrame("gbs run6")
    );
    this.Properties.jumpTextures.push(
        PIXI.Texture.fromFrame("gbs j1"),
        PIXI.Texture.fromFrame("gbs j1"),
        PIXI.Texture.fromFrame("gbs j2"),
        PIXI.Texture.fromFrame("gbs j3"),
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7")
    );
    this.Properties.jumpHighTextures.push(
        PIXI.Texture.fromFrame("gbs j1"),
        PIXI.Texture.fromFrame("gbs j2"),
        PIXI.Texture.fromFrame("gbs j3"),
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j3"),
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7")
    );
    this.Properties.endSuperTextures.push(
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7")
    );
    this.Properties.attackTextures.push(
        PIXI.Texture.fromFrame("gbs a1"),
        PIXI.Texture.fromFrame("gbs a1"),
        PIXI.Texture.fromFrame("gbs a2"),
        PIXI.Texture.fromFrame("gbs a1")
    );
    this.Properties.jumpAttackTextures.push(
        PIXI.Texture.fromFrame("gbs ja1"),
        PIXI.Texture.fromFrame("gbs ja1"),
        PIXI.Texture.fromFrame("gbs ja2"),
        PIXI.Texture.fromFrame("gbs ja3"),
        PIXI.Texture.fromFrame("gbs ja4")
    );
    this.Properties.attack2Textures.push(
        PIXI.Texture.fromFrame("gbs a2a"),
        PIXI.Texture.fromFrame("gbs a2a"),
        PIXI.Texture.fromFrame("gbs a2"),
        PIXI.Texture.fromFrame("gbs a1"),
        PIXI.Texture.fromFrame("gbs run1"),
        PIXI.Texture.fromFrame("gbs run2")
    );
    this.Properties.jumpAttack2Textures.push(
        PIXI.Texture.fromFrame("gbs ja2a"),
        PIXI.Texture.fromFrame("gbs ja2a"),
        PIXI.Texture.fromFrame("gbs ja2"),
        PIXI.Texture.fromFrame("gbs ja3")
    );
    this.Properties.superStartTextures.push(
        PIXI.Texture.fromFrame("gbs ja1")
    );
    this.newJumpPosition = [];
    this.newJumpPosition.push(
        PIXI.Texture.fromFrame("gbs j1"),
        PIXI.Texture.fromFrame("gbs j2"),
        PIXI.Texture.fromFrame("gbs j3"),
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7")
    );

    this.setCurrentTextures(MainGlobals.Timing.characterRunTime, this.Properties.runTextures);

    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

Character.prototype.setCorrectTextureForPositionJumping = function(characterObj) {
    if (!MainGlobals.Physics.characterAirborn || MainGlobals.Balance.isAttacking) {
        return false;
    }
    var characterPositionPercentage = characterObj.position.y / MainGlobals.ScreenHeight;

    if (MainGlobals.Physics.characterVelocityY < 0) {
        if (MainGlobals.Physics.characterHighJumping) {
            if (characterPositionPercentage > .28) {
                characterObj.children[0].texture = this.newJumpPosition[0];
            } else if (characterPositionPercentage > .133) {
                characterObj.children[0].texture = this.newJumpPosition[1];
            } else if (characterPositionPercentage > .038) {
                characterObj.children[0].texture = this.newJumpPosition[2];
            } else if (characterPositionPercentage > 0) {
                characterObj.children[0].texture = this.newJumpPosition[3];
            } else if (characterPositionPercentage < 0 ) {
                characterObj.children[0].texture = this.newJumpPosition[3];
            }
        } else {
            if (characterPositionPercentage > .42) {
                characterObj.children[0].texture = this.newJumpPosition[0];
            } else if (characterPositionPercentage > .36) {
                characterObj.children[0].texture = this.newJumpPosition[1];
            } else if (characterPositionPercentage > .35) {
                characterObj.children[0].texture = this.newJumpPosition[2];
            }
        }
    } else {
        if (MainGlobals.Physics.characterHighJumping) {
            // high jumping fall logic
            if (characterPositionPercentage < 0) {
                characterObj.children[0].texture = this.newJumpPosition[4];
            } else if (characterPositionPercentage < .075) {
                characterObj.children[0].texture = this.newJumpPosition[2];
            } else if (characterPositionPercentage < .196) {
                characterObj.children[0].texture = this.newJumpPosition[3];
            } else if (characterPositionPercentage < .37) {
                characterObj.children[0].texture = this.newJumpPosition[4];
            } else if (characterPositionPercentage < .5 ) {
                characterObj.children[0].texture = this.newJumpPosition[5];
            } else if (characterPositionPercentage > .5 ) {
                characterObj.children[0].texture = this.newJumpPosition[6];
            }
        } else {
            //fall logic regular
            if (characterPositionPercentage < .355) {
                characterObj.children[0].texture = this.newJumpPosition[2];
            } else if (characterPositionPercentage < .39) {
                characterObj.children[0].texture = this.newJumpPosition[3];
            } else if (characterPositionPercentage < .48) {
                characterObj.children[0].texture = this.newJumpPosition[4];
            } else if (characterPositionPercentage < .629) {
                characterObj.children[0].texture = this.newJumpPosition[5];
            } else if (characterPositionPercentage < .73) {
                characterObj.children[0].texture = this.newJumpPosition[6];
            }
        }
    }
};

Character.prototype.setSpriteToCurrentTexture = function(characterObj) {
    characterObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

Character.prototype.update = function(characterObj, groundObj) {
    characterObj.alpha = 1;
    if (this.Properties.currentTextures == this.Properties.superStartTextures) {
        this.endSuper();
        characterObj.visible = true;
    }

    this.updateSprites(characterObj);
    this.gravityCharacter(characterObj, groundObj);
    this.resetCharacter(characterObj);
    this.attackCharacter(characterObj, groundObj.getHeightAtPositionX(0, groundObj));
    this.setCorrectTextureForPositionJumping(characterObj);
};

Character.prototype.updateSprites = function(characterObj) {
    if (!MainGlobals.Physics.characterAirborn || MainGlobals.Balance.isAttacking || MainGlobals.Balance.isComboAttacking) {
        if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
            this.Properties.changeSpriteCounter = 0;
            this.nextSprite(characterObj);
        } else {
            this.Properties.changeSpriteCounter++;
        }
    }
};

Character.prototype.nextSprite = function(characterObj) {
    if (this.Properties.spriteCount == this.Properties.currentTextures.length - 1) {
        this.Properties.spriteCount = 0;
    } else {
        this.Properties.spriteCount++;
    }

    this.setSpriteToCurrentTexture(characterObj);
};

Character.prototype.gravityCharacter = function(characterObj, groundObj) {
    if (MainGlobals.Physics.characterAirborn) {
        if (MainGlobals.Physics.characterVelocityY >= 0) { //falling
            this.fallCharacter(characterObj, groundObj);
        } else {
            this.riseCharacter(characterObj);
        }
    } else if(!groundObj.getHeightAtPositionX(characterObj.position.x, groundObj)) { //falling onto block
        MainGlobals.Physics.characterAirborn = true;
        this.fallCharacter(characterObj, groundObj)
    }
};

Character.prototype.fallCharacter = function(characterObj, groundObj) {
    var groundHeight = groundObj.getHeightAtPositionX(characterObj.position.x, groundObj); // get the groundHeight
    MainGlobals.Physics.characterVelocityY += MainGlobals.Physics.characterGravity;

    if (characterObj.position.y < groundHeight) { //keep falling
        characterObj.position.y += MainGlobals.Physics.characterVelocityY;
    } else if (characterObj.position.y + MainGlobals.Physics.characterVelocityY >= groundHeight) {
        characterObj.position.y = groundHeight;
        MainGlobals.Physics.characterVelocityY = 0;
        MainGlobals.Physics.characterAirborn = false;
        MainGlobals.Physics.characterHighJumping = false;
        this.setCurrentTextures();
    } else {
        MainGlobals.Helpers.endGame();
        characterObj.position.y += MainGlobals.Physics.characterVelocityY;
    }
};

Character.prototype.riseCharacter = function(characterObj, groundHeight) {
    MainGlobals.Physics.characterVelocityY += MainGlobals.Physics.characterGravity;
    characterObj.position.y += MainGlobals.Physics.characterVelocityY;
};

Character.prototype.attackCharacter = function(characterObj, groundHeight) {
    if (MainGlobals.Balance.isAttacking && !MainGlobals.Balance.isComboAttacking) {
        this.Properties.attackCounter++;
        var counter = MainGlobals.Physics.characterAirborn ? MainGlobals.Balance.jumpAttackTime : MainGlobals.Balance.attackTime;

        if (this.Properties.attackCounter >= counter) { //attack updates over
            MainGlobals.Balance.isAttacking = false;
            if (!MainGlobals.Balance.isComboAttacking) {
                this.setCurrentTextures();
            } //default
            this.Properties.attackCounter = 0;
        }
    }

    if (MainGlobals.Balance.isComboAttacking) {
        this.Properties.comboAttackCounter++;
        counter = MainGlobals.Physics.characterAirborn ? MainGlobals.Balance.jumpComboAttackTime : MainGlobals.Balance.comboAttackTime;
        if (!MainGlobals.Physics.characterAirborn) {
            if (this.Properties.comboAttackCounter < 17 && this.Properties.comboAttackCounter > 6) {
                characterObj.position.y = groundHeight * .94;
            } else {
                characterObj.position.y = groundHeight;
            }
        }
        if (this.Properties.comboAttackCounter >= counter) { //attack updates over
            MainGlobals.Balance.isComboAttacking = false;
            this.setCurrentTextures(); //default
            this.Properties.comboAttackCounter = 0;
        }
    }
};

Character.prototype.startJumpAnimation = function() {
    if (!MainGlobals.Physics.characterAirborn && !MainGlobals.Balance.isAttacking) {
        MainGlobals.Physics.characterAirborn = true;
        MainGlobals.Balance.isAttacking = false;
        MainGlobals.Balance.isComboAttacking = false;
        MainGlobals.Physics.characterVelocityY = MainGlobals.Physics.characterJumpVelocity;
        MainGlobals.Helpers.playSound("GumballJump",.4);
        //this.setCurrentTextures(MainGlobals.Timing.characterJumpTime, this.Properties.jumpTextures);
    } else if (!MainGlobals.Physics.characterHighJumping && MainGlobals.Physics.characterVelocityY < 0 && !MainGlobals.Balance.isAttacking) {
        this.startJumpHighAnimation();
    }
};

Character.prototype.startJumpHighAnimation = function() {
    MainGlobals.Helpers.playSound("GumballJump",.4);
    MainGlobals.Physics.characterAirborn = true;
    MainGlobals.Physics.characterHighJumping = true;
    MainGlobals.Physics.isAttacking = false;
    MainGlobals.Physics.isComboAttacking = false;
    MainGlobals.Physics.characterVelocityY = MainGlobals.Physics.characterJumpHighVelocity;
    //this.setCurrentTextures(MainGlobals.Timing.characterJumpTime, this.Properties.jumpHighTextures);
};

Character.prototype.startAttackAnimation = function() {
    if (!MainGlobals.Balance.isAttacking && !MainGlobals.Balance.isComboAttacking) {
        if (MainGlobals.Physics.characterAirborn) {
            this.setCurrentTextures(MainGlobals.Timing.characterJumpAttackTime, this.Properties.jumpAttackTextures);
        } else {
            this.setCurrentTextures(MainGlobals.Timing.characterAttackTime, this.Properties.attackTextures);
        }
        MainGlobals.Helpers.playSound("GumballAttack1",.6);
        MainGlobals.Helpers.playSound("GumballAttack2",.5);
        MainGlobals.Helpers.playSound("GumballAttack3",.3);
        MainGlobals.Balance.isAttacking = true;
    }
};

Character.prototype.startComboAttackAnimation = function() {
    if (!MainGlobals.Balance.isComboAttacking) {
        if (MainGlobals.Physics.characterAirborn) {
            this.setCurrentTextures(MainGlobals.Timing.characterJumpComboAttackTime, this.Properties.jumpAttack2Textures);
        } else {
            this.setCurrentTextures(MainGlobals.Timing.characterComboAttackTime, this.Properties.attack2Textures);
        }
        MainGlobals.Helpers.playSound("GumballAttackCombo",.7);
        MainGlobals.Helpers.playSound("GumballAttack2",.5);
        MainGlobals.Helpers.playSound("GumballAttack3",.3);
        MainGlobals.Balance.isComboAttacking = true;
    }
};

Character.prototype.setCurrentTextures = function(speed, textures) {
    if (textures) {
        this.Properties.currentTextures = textures;
        this.Properties.spriteSpeed = speed;
        this.Properties.spriteCount = 0; //the setTexture will be one behind since it was already called for this loop
        this.Properties.changeSpriteCounter = 0;
    } else {
        this.Properties.currentTextures = this.Properties.runTextures; //default is run...
        this.Properties.spriteSpeed = MainGlobals.Timing.characterRunTime;
        this.Properties.spriteCount = 0;
        this.Properties.changeSpriteCounter = 0;
    }

};
//POWERUP STUFF

Character.prototype.updatePowerUp = function(characterObj) {
    characterObj.alpha = 0;
    if (!MainGlobals.PowerUp.characterDonePoweringUp) { //not done powering..
        if (this.Properties.currentTextures != this.Properties.superStartTextures) {
            this.setCurrentTextures(MainGlobals.Timing.characterPowerUpTime, this.Properties.superStartTextures);
        }

        if (MainGlobals.PowerUp.characterRise) {
            this.setSuperPositionY(characterObj);
        }

        this.updateSprites(characterObj);
    } else if (characterObj.visible) {
        characterObj.visible = false;
        this.setSuperPositionX(characterObj);
    }
};

Character.prototype.setSuperPositionY = function(characterObj) {
    if (characterObj.position.y + (characterObj.height/2) >= MainGlobals.ScreenHeight / 2) {
        characterObj.position.y -= MainGlobals.Physics.characterRiseSpeed;
    } else {
        characterObj.position.y = MainGlobals.ScreenHeight/2 - (characterObj.height/2);
    }
};

Character.prototype.setSuperPositionX = function(characterObj) {
    characterObj.position.x = MainGlobals.ScreenHeight*MainGlobals.Scaling.characterSuperPosition;
};

Character.prototype.endSuper = function() {
    MainGlobals.Physics.characterAirborn = true;
    MainGlobals.Physics.characterVelocityY = MainGlobals.Physics.characterEndSuperVelocity;
    this.setCurrentTextures(MainGlobals.Timing.characterJumpTime, this.Properties.endSuperTextures);
};

Character.prototype.resetCharacter = function(characterObj) {
    if (characterObj.position.x != MainGlobals.Scaling.characterPositionX) {
        if (MainGlobals.Physics.characterVelocityY > 0) {
            characterObj.position.x = MainGlobals.Scaling.characterPositionX;
        }
    }
};

/*
Character.prototype.listenForJumpTrigger = function() {
    var that = this;
    MainGlobals.KeyboardSpace(32).press = function () {
        that.startJumpAnimation();
    }
};

Character.prototype.listenForAttackTrigger = function() {
    var that = this;
    MainGlobals.KeyboardCtrl(17).press = function () {
        if (MainGlobals.Balance.isAttacking == false) {
            that.startAttackAnimation();
        } else {
            that.startJumpAttackAnimation();
        }
    }
};*/
