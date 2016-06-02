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
    this.listenForJumpTrigger();
    this.listenForAttackTrigger();
};

Character.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.characterScale = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.characterPercent);

    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.characterScale,MainGlobals.Scaling.characterScale);
    obj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.characterPositionX, 0);
};

Character.prototype.initiateCharacterSprites = function() {
    this.Properties.runTextures.push(
        PIXI.Texture.fromFrame("gbs run1"),
        PIXI.Texture.fromFrame("gbs run2"),
        PIXI.Texture.fromFrame("gbs run3")
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
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7"),
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
    this.Properties.superStartTextures.push(
        PIXI.Texture.fromFrame("gbs super1"),
        PIXI.Texture.fromFrame("gbs super1"),
        PIXI.Texture.fromFrame("gbs super2"),
        PIXI.Texture.fromFrame("gbs super3"),
        PIXI.Texture.fromFrame("gbs super4"),
        PIXI.Texture.fromFrame("gbs super5"),
        PIXI.Texture.fromFrame("gbs super6")
    );
    this.Properties.superTextures.push(
        PIXI.Texture.fromFrame("gbs super5"),
        PIXI.Texture.fromFrame("gbs super6")
    );

    this.setCurrentTextures();
    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

Character.prototype.setSpriteToCurrentTexture = function(characterObj) {
    characterObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

Character.prototype.update = function(characterObj, groundObj) {
    if (this.Properties.currentTextures == this.Properties.superStartTextures) {
        this.endSuper();
    }
    this.updateSprites(characterObj);
    this.gravityCharacter(characterObj, groundObj);
    this.resetCharacter(characterObj);
    this.attackCharacter();
};

Character.prototype.updateSprites = function(characterObj) {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(characterObj);
    } else {
        this.Properties.changeSpriteCounter++;
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
    } else if (characterObj.position.y + MainGlobals.Physics.characterVelocityY > groundHeight) {
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

Character.prototype.riseCharacter = function(characterObj) {
    MainGlobals.Physics.characterVelocityY += MainGlobals.Physics.characterGravity;
    characterObj.position.y += MainGlobals.Physics.characterVelocityY;
};

Character.prototype.attackCharacter = function() {
    if (MainGlobals.Balance.isAttacking) {
        this.Properties.attackCounter++;
        var counter = MainGlobals.Physics.characterAirborn ? MainGlobals.Balance.jumpAttackTime : MainGlobals.Balance.attackTime;

        if (this.Properties.attackCounter >= counter) { //attack updates over
            MainGlobals.Balance.isAttacking = false;
            this.setCurrentTextures(); //default
            this.Properties.attackCounter = 0;
        }
    }
};

Character.prototype.startJumpAnimation = function() {
    if (!MainGlobals.Physics.characterAirborn) {
        MainGlobals.Physics.characterAirborn = true;
        MainGlobals.Physics.isAttacking = false;
        MainGlobals.Physics.characterVelocityY = MainGlobals.Physics.characterJumpVelocity;
        this.setCurrentTextures(MainGlobals.Timing.characterJumpTime, this.Properties.jumpTextures);
    } else if (this.Properties.spriteCount < 2 && !MainGlobals.Physics.characterHighJumping) {
        this.startJumpHighAnimation();
    }
};

Character.prototype.startJumpHighAnimation = function() {
    MainGlobals.Physics.characterAirborn = true;
    MainGlobals.Physics.characterHighJumping = true;
    MainGlobals.Physics.isAttacking = false;
    MainGlobals.Physics.characterVelocityY = MainGlobals.Physics.characterJumpHighVelocity;
    this.setCurrentTextures(MainGlobals.Timing.characterJumpTime, this.Properties.jumpHighTextures);
};

Character.prototype.startAttackAnimation = function() {
    if (!MainGlobals.Balance.isAttacking) {
        if (MainGlobals.Physics.characterAirborn) {
            MainGlobals.Balance.isAttacking = false;
        } else {
            this.setCurrentTextures(MainGlobals.Timing.characterAttackTime, this.Properties.attackTextures);
            MainGlobals.Balance.isAttacking = true;
        }
    }
};

Character.prototype.startJumpAttackAnimation = function() {
    if (!MainGlobals.Physics.characterAirborn && this.Properties.spriteCount < 2) {
        MainGlobals.Physics.characterAirborn = true;
        MainGlobals.Physics.characterVelocityY = MainGlobals.Physics.characterJumpAttackVelocity;
        this.setCurrentTextures(MainGlobals.Timing.characterJumpAttackTime, this.Properties.jumpAttackTextures);
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
    if (!MainGlobals.PowerUp.characterDonePoweringUp) { //not done powering..
        if (this.Properties.currentTextures != this.Properties.superStartTextures) {
            this.setCurrentTextures(MainGlobals.Timing.characterPowerUpTime, this.Properties.superStartTextures);
        }
        this.updateSprites(characterObj);
    } else if (this.Properties.currentTextures != this.Properties.superTextures) {
        this.setCurrentTextures(MainGlobals.Timing.characterSuperTime, this.Properties.superTextures);
    } else {
        this.updateSprites(characterObj);
    }
    if (MainGlobals.PowerUp.characterRise) {
        this.setSuperPositionY(characterObj);
    }
    if (MainGlobals.PowerUp.characterDonePoweringUp) {
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
    if (characterObj.position.x < MainGlobals.ScreenWidth*MainGlobals.Scaling.characterSuperPosition) {
        characterObj.position.x += MainGlobals.Physics.characterBoltSpeed;
    } else {
        characterObj.position.x = MainGlobals.ScreenWidth*MainGlobals.Scaling.characterSuperPosition;
    }
};

Character.prototype.endSuper = function() {
    MainGlobals.Physics.characterAirborn = true;
    MainGlobals.Physics.characterVelocityY = MainGlobals.Physics.characterEndSuperVelocity;
    this.setCurrentTextures(MainGlobals.Timing.characterJumpTime, this.Properties.endSuperTextures);
};

Character.prototype.resetCharacter = function(characterObj) {
    if (characterObj.position.x != MainGlobals.Scaling.characterPositionX) {
        if (characterObj.position.y < 0 - characterObj.height) {
            characterObj.position.x = MainGlobals.Scaling.characterPositionX;
        }
    }
};

Character.prototype.listenForJumpTrigger = function() {
    var that = this;
    this.Properties.spaceBar.press = function () {
        that.startJumpAnimation();
    }
};

Character.prototype.listenForAttackTrigger = function() {
    var that = this;
    this.Properties.ctrlButton.press = function () {
        if (MainGlobals.Balance.isAttacking == false) {
            that.startAttackAnimation();
        } else {
            that.startJumpAttackAnimation();
        }
    }
};