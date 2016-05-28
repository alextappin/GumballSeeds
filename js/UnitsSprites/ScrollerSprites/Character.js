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
        PIXI.Texture.fromFrame("gbs super3"),
        PIXI.Texture.fromFrame("gbs super4"),
        PIXI.Texture.fromFrame("gbs super5"),
        PIXI.Texture.fromFrame("gbs super6"),
        PIXI.Texture.fromFrame("rainbowband gumballstart")
    );
    this.Properties.superPowerupTextures.push(
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("3 super powerup"),
        PIXI.Texture.fromFrame("4 super powerup"),
        PIXI.Texture.fromFrame("5 super powerup"),
        PIXI.Texture.fromFrame("rainbowband 1start")
    );
    this.Properties.rainbowSuperTextures.push(
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband down1b"),
        PIXI.Texture.fromFrame("rainbowband down2a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down3a"),
        PIXI.Texture.fromFrame("rainbowband down3b"),
        PIXI.Texture.fromFrame("rainbowband down3a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down2a"),
        PIXI.Texture.fromFrame("rainbowband down1b"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband up1a"),
        PIXI.Texture.fromFrame("rainbowband up1b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up2b"),
        PIXI.Texture.fromFrame("rainbowband up3a"),
        PIXI.Texture.fromFrame("rainbowband up3b"),
        PIXI.Texture.fromFrame("rainbowband up3a"),
        PIXI.Texture.fromFrame("rainbowband up2b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up1b"),
        PIXI.Texture.fromFrame("rainbowband up1a")
    );

    this.setCurrentTextures();
    /*var testSprite = new PIXI.Sprite(this.Properties.rainbowSuperTextures[2]);
    console.log(testSprite);
    testSprite.position.x -= 1300;
    testSprite.position.y -= 700;
    this.scale = HelperFunctions().getNewPoint(ScalingGlobals.characterRatio +.2, ScalingGlobals.characterRatio +.2);
    this.addChild(testSprite);
    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
    this.children[1].scale.x = .5;
    this.children[1].scale.y = .5;
    this.children[1].position.x += 400;*/
    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

Character.prototype.setSpriteToCurrentTexture = function(characterObj) {
    characterObj.children[characterObj.children.length-1].texture = this.Properties.currentTextures[this.Properties.spriteCount];
    //characterObj.children[0].texture = this.Properties.rainbowSuperTextures[this.Properties.spriteCount];
};

Character.prototype.update = function(characterObj, groundObj) {
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
/*        if (PhysicsGlobals.characterAirborn) { //jump attacking
            if (this.Properties.attackCounter >= BalanceGlobals.attackTime) {
                BalanceGlobals.isAttacking = false;
            }
        }*/
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

//POWERUP STUFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

Character.prototype.updatePowerUpStart = function(characterObj, groundObj) {
    //if character is airborn, wait until on floor... then GO
    if (characterObj.Properties.currentTextures != this.Properties.superStartTextures) {
        this.setCurrentTextures(TimingGlobals.characterPowerUpTime, this.Properties.superStartTextures);
        this.setCurrentSuperTextures(TimingGlobals.rainbowChargeTime, this.Properties.superPowerupTextures);
        this.setupSuper(characterObj);
    } else {
        this.updateSprites(characterObj);
        this.updatePowerSprite(characterObj);
        this.startPowerJump(characterObj);
    }
};

Character.prototype.setupSuper = function(characterObj) {
    ScalingGlobals.characterSuperPosition = characterObj.position;

    this.addChildAt(new PIXI.Sprite(this.Properties.currentSuperTextures[this.Properties.spriteCount]), 0); //add the rainbow thing to the back of the character container.

    ScalingGlobals.characterObjSuperScale = HelperFunctions().getScreenRatioUsingHeight(
        characterObj.children[0].height,
        ScalingGlobals.characterObjSuperPercentOfScreen
    );

    ScalingGlobals.rainbowSuperRatio = HelperFunctions().getScreenRatioUsingHeight(
        MapGlobals.screenHeight,
        ScalingGlobals.rainbowSuperPercentOfScreen
    );

    ScalingGlobals.characterSuperRatio = HelperFunctions().getScreenRatioUsingHeight(
        MapGlobals.screenHeight,
        ScalingGlobals.characterSuperPercentOfScreen
    );

    characterObj.scale = HelperFunctions().getNewPoint(
        ScalingGlobals.characterObjSuperScale,
        ScalingGlobals.characterObjSuperScale
    );

    characterObj.children[0].scale = HelperFunctions().getNewPoint(
        ScalingGlobals.rainbowSuperRatio,
        ScalingGlobals.rainbowSuperRatio
    );

    characterObj.children[1].scale = HelperFunctions().getNewPoint(
        ScalingGlobals.characterSuperRatio,
        ScalingGlobals.characterSuperRatio
    );

    characterObj.position = HelperFunctions().getNewPoint(0,0);

    //the ratio between the old screen and new. if its 2x then it will be 360p...
    ScalingGlobals.superScreenSize = ScalingGlobals.characterSuperPercentOfScreen / ScalingGlobals.characterObjSuperScale;
    characterObj.children[1].position =  HelperFunctions().getNewPoint(
        ScalingGlobals.characterSuperPosition.x/ScalingGlobals.characterSuperRatio*ScalingGlobals.superScreenSize,
        ScalingGlobals.characterSuperPosition.y/ScalingGlobals.characterSuperRatio*ScalingGlobals.superScreenSize
    );
};

Character.prototype.updatePowerSprite = function(characterObj) {
    if (this.Properties.superChangeSpriteCounter == this.Properties.superSpriteSpeed) {
        this.Properties.superChangeSpriteCounter = 0;
        this.nextSpriteSuper(characterObj);
    } else {
        this.Properties.superChangeSpriteCounter++;
    }
};

Character.prototype.nextSpriteSuper = function(characterObj) {
    if (this.Properties.superSpriteCount == this.Properties.currentSuperTextures.length - 1) {
        this.Properties.superSpriteCount = 0;
        if (PowerUpGlobals.characterDonePoweringUp == false) {
            PowerUpGlobals.characterDonePoweringUp = true;
            this.setCurrentSuperTextures(TimingGlobals.rainbowChargeTime, this.Properties.rainbowSuperTextures);
        }
    } else {
        this.Properties.superSpriteCount++;
    }

    this.setSuperSpriteToCurrentTexture(characterObj);
};

Character.prototype.setSuperSpriteToCurrentTexture = function(characterObj) {
    characterObj.children[0].texture = this.Properties.currentSuperTextures[this.Properties.superSpriteCount];
};

Character.prototype.updatePowerUp = function(characterObj, groundObj) {
    this.updateSprites(characterObj);
    this.gravityCharacter(characterObj, groundObj);
    this.attackCharacter();
};

Character.prototype.startPowerJump = function(characterObj) {

};

Character.prototype.setCurrentSuperTextures = function(speed, textures) {
    this.Properties.currentSuperTextures = textures;
    this.Properties.superSpriteSpeed = speed;
    this.Properties.superSpriteCount = 0;
    this.Properties.superChangeSpriteCounter = 0;
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