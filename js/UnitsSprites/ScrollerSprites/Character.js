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
    ScalingGlobals.characterRatio = HelperFunctions().getScreenRatioUsingHeight(obj.height, ScalingGlobals.characterPercentOfScreen);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.characterRatio, ScalingGlobals.characterRatio);
    obj.position =  HelperFunctions().getNewPoint(ScalingGlobals.characterStartXScale, ScalingGlobals.characterStartYScale);
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
        PIXI.Texture.fromFrame("gbs j4"),
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
        PIXI.Texture.fromFrame("gbs ja4"),
        PIXI.Texture.fromFrame("gbs j7")
    );
    this.Properties.superStartTextures.push(
        PIXI.Texture.fromFrame("gbs super1"),
        PIXI.Texture.fromFrame("gbs super1"),
        PIXI.Texture.fromFrame("gbs super2"),
        PIXI.Texture.fromFrame("gbs super1"),
        PIXI.Texture.fromFrame("gbs super2"),
        PIXI.Texture.fromFrame("gbs super3"),
        PIXI.Texture.fromFrame("gbs super4"),
        PIXI.Texture.fromFrame("gbs super5"),
        PIXI.Texture.fromFrame("gbs super6"),
        PIXI.Texture.fromFrame("rainbowband gumballstart")
    );
    this.Properties.superTextures.push(
        PIXI.Texture.fromFrame("rainbowband gumball1"),
        PIXI.Texture.fromFrame("rainbowband gumball2")
    );

    this.setCurrentTextures();
    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

Character.prototype.setSpriteToCurrentTexture = function(characterObj) {
    characterObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

Character.prototype.update = function(characterObj, groundObj) {
    if (this.Properties.currentTextures == this.Properties.superStartTextures) {
        PhysicsGlobals.characterAirborn = true;
        this.setCurrentTextures();
    }
    this.updateSprites(characterObj);
    this.gravityCharacter(characterObj, groundObj);
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
    if (PhysicsGlobals.characterAirborn) {
        if (PhysicsGlobals.characterVelocityY >= 0) { //falling
            this.fallCharacter(characterObj, groundObj);
        } else {
            this.riseCharacter(characterObj);
        }
    } else if(!groundObj.getHeightAtPositionX(characterObj.position.x, groundObj)) { //falling onto block
        PhysicsGlobals.characterAirborn = true;
        this.fallCharacter(characterObj, groundObj)
    }
};

Character.prototype.fallCharacter = function(characterObj, groundObj) {
    var groundHeight = groundObj.getHeightAtPositionX(characterObj.position.x, groundObj); // get the groundHeight
    PhysicsGlobals.characterVelocityY += PhysicsGlobals.characterGravity;

    if (characterObj.position.y < groundHeight) { //keep falling
        characterObj.position.y += PhysicsGlobals.characterVelocityY;
    } else if (characterObj.position.y + PhysicsGlobals.characterVelocityY > groundHeight) {
        characterObj.position.y = groundHeight;
        PhysicsGlobals.characterVelocityY = 0;
        PhysicsGlobals.characterAirborn = false;
        PhysicsGlobals.characterHighJumping = false;
        this.setCurrentTextures();
    } else {
        HelperFunctions().endGame();
        characterObj.position.y += PhysicsGlobals.characterVelocityY;
    }
};

Character.prototype.riseCharacter = function(characterObj) {
    PhysicsGlobals.characterVelocityY += PhysicsGlobals.characterGravity;
    characterObj.position.y += PhysicsGlobals.characterVelocityY;
};

Character.prototype.attackCharacter = function() {
    if (BalanceGlobals.isAttacking) {
        this.Properties.attackCounter++;
        var counter = PhysicsGlobals.characterAirborn ? BalanceGlobals.jumpAttackTime : BalanceGlobals.attackTime;

        if (this.Properties.attackCounter >= counter) { //attack updates over
            BalanceGlobals.isAttacking = false;
            this.setCurrentTextures(); //default
            this.Properties.attackCounter = 0;
        }
    }
};

Character.prototype.startJumpAnimation = function() {
    if (!PhysicsGlobals.characterAirborn) {
        PhysicsGlobals.characterAirborn = true;
        PhysicsGlobals.isAttacking = false;
        PhysicsGlobals.characterVelocityY = PhysicsGlobals.characterJumpVelocity;
        this.setCurrentTextures(TimingGlobals.characterJumpTime, this.Properties.jumpTextures);
    } else if (this.Properties.spriteCount < 2 && !PhysicsGlobals.characterHighJumping) {
        this.startJumpHighAnimation();
    }
};

Character.prototype.startJumpHighAnimation = function() {
    PhysicsGlobals.characterAirborn = true;
    PhysicsGlobals.characterHighJumping = true;
    PhysicsGlobals.isAttacking = false;
    PhysicsGlobals.characterVelocityY = PhysicsGlobals.characterJumpHighVelocity;
    this.setCurrentTextures(TimingGlobals.characterJumpTime, this.Properties.jumpHighTextures);
};

Character.prototype.startAttackAnimation = function() {
    if (!BalanceGlobals.isAttacking) {
        if (PhysicsGlobals.characterAirborn) {
            BalanceGlobals.isAttacking = false;
        } else {
            this.setCurrentTextures(TimingGlobals.characterAttackTime, this.Properties.attackTextures);
            BalanceGlobals.isAttacking = true;
        }
    }
};

Character.prototype.startJumpAttackAnimation = function() {
    if (!PhysicsGlobals.characterAirborn && this.Properties.spriteCount < 2) {
        PhysicsGlobals.characterAirborn = true;
        PhysicsGlobals.characterVelocityY = PhysicsGlobals.characterJumpAttackVelocity;
        this.setCurrentTextures(TimingGlobals.characterJumpAttackTime, this.Properties.jumpAttackTextures);
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
        this.Properties.spriteSpeed = TimingGlobals.characterRunTime;
        this.Properties.spriteCount = 0;
        this.Properties.changeSpriteCounter = 0;
    }

};

//POWERUP STUFF

Character.prototype.updatePowerUp = function(characterObj) {
    if (!PowerUpGlobals.characterDonePoweringUp) { //not done powering..
        if (this.Properties.currentTextures != this.Properties.superStartTextures) {
            this.setCurrentTextures(TimingGlobals.characterPowerUpTime, this.Properties.superStartTextures);
        }
        this.updateSprites(characterObj);
    } else if (this.Properties.currentTextures != this.Properties.superTextures) {
        this.setCurrentTextures(TimingGlobals.characterSuperTime, this.Properties.superTextures);
    } else {
        this.updateSprites(characterObj);
    }
    if (PowerUpGlobals.characterRise) {
        this.setSuperPositionY(characterObj);
    }
    if (PowerUpGlobals.characterBolt) {
        this.setSuperPositionX(characterObj);
    }
};

Character.prototype.setSuperPositionY = function(characterObj) {
    if (characterObj.position.y + (characterObj.height/2) >= MapGlobals.screenHeight / 2) {
        characterObj.position.y -= PhysicsGlobals.characterRiseSpeed;
    } else {
        characterObj.position.y = MapGlobals.screenHeight/2 - (characterObj.height/2);
    }
};

Character.prototype.setSuperPositionX = function(characterObj) {
    if (characterObj.position.x < MapGlobals.screenWidth*ScalingGlobals.characterSuperPosition) {
        characterObj.position.x += PhysicsGlobals.characterBoltSpeed;
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
        if (BalanceGlobals.isAttacking == false) {
            that.startAttackAnimation();
        } else {
            that.startJumpAttackAnimation();
        }
    }
};