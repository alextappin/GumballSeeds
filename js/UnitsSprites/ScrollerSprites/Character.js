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
    obj.position =  HelperFunctions().getNewPoint(ScalingGlobals.characterStartXScale, ScalingGlobals.characterStartYScale);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.characterScaleX, ScalingGlobals.characterScaleY);
};
Character.prototype.initiateCharacterSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("sprite1"),
        PIXI.Texture.fromFrame("sprite2"),
        PIXI.Texture.fromFrame("sprite3"),
        PIXI.Texture.fromFrame("sprite5"),
        PIXI.Texture.fromFrame("sprite6"),
        PIXI.Texture.fromFrame("sprite4")
    );
    //this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]));
};
Character.prototype.setSpriteToCurrentTexture = function(characterObj) {
    characterObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};
Character.prototype.update = function(characterObj, groundObj) {
    this.updateSprites(characterObj);
    this.characterGravity(characterObj, groundObj);
    this.attackCharacter();
};
Character.prototype.updatePowerUp = function(characterObj, groundObj) {
    this.updateSprites(characterObj);
    this.powerUpMove(characterObj);
    //this.characterGravity(characterObj, groundObj);
};
Character.prototype.updateSprites = function(characterObj) {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(characterObj);
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
Character.prototype.nextSprite = function(characterObj) {
    //Set ternary
    //TODO dont use ==5 instead use the maximum number of textures the character has
    if (this.Properties.spriteCount == 5) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture(characterObj);
};
Character.prototype.characterGravity = function(characterObj, groundObj) {
    if (PhysicsGlobals.characterAirborn) {
        if (this.isFalling()) {
            this.fall(characterObj,this.calculateMapToCharacterHeightOffset(characterObj, groundObj.getHeightAtPositionX(this.calculateCharacterFrontX(characterObj))));
        }
        else {
            this.rise(characterObj);
        }
    }
    //if there is no ground, notice ! sign, you will FALL
    else if (!this.calculateMapToCharacterHeightOffset(characterObj, groundObj.getHeightAtPositionX(this.calculateCharacterFrontX(characterObj)))) {
        PhysicsGlobals.characterAirborn = true;
        this.fall(characterObj,this.calculateMapToCharacterHeightOffset(characterObj, groundObj.getHeightAtPositionX(this.calculateCharacterFrontX(characterObj))));
    }
};
Character.prototype.fall = function(characterObj, groundHeight) {
    this.startGravity();
    //passed ground
    if(characterObj.position.y > groundHeight) {
        this.endGame();
        characterObj.position.y += PhysicsGlobals.characterVelocityY;
    }
    //landed
    else if ((characterObj.position.y + PhysicsGlobals.characterVelocityY) > groundHeight) {
        characterObj.position.y = groundHeight;
        PhysicsGlobals.characterVelocityY = 0;
        PhysicsGlobals.characterAirborn = false;
    }
    //falling
    else {
        characterObj.position.y += PhysicsGlobals.characterVelocityY;
    }
};
Character.prototype.rise = function(characterObj) {
    this.startGravity();
    characterObj.position.y += PhysicsGlobals.characterVelocityY;
};
Character.prototype.powerUpMove = function(characterObj) {
    BalanceGlobals.isAttacking = true;
    this.setNewPowerUpPosition(characterObj);
};
Character.prototype.isFalling = function() {
    //negative velocity is up... not rising ur falling. maybe >=
    return PhysicsGlobals.characterVelocityY >= 0;
};
Character.prototype.endGame = function() {
    PhysicsGlobals.airborn = true;
    BalanceGlobals.continueGame = false;
    HelperFunctions().switchScreenToggle();
    HelperFunctions().switchToTitle();
};
Character.prototype.startGravity = function() {
    PhysicsGlobals.characterVelocityY += PhysicsGlobals.characterGravity;
};
Character.prototype.startJumpAnimation = function() {
    //not airborn, then GO AIRBORN and set velocity
    if (!PhysicsGlobals.characterAirborn) {
        PhysicsGlobals.characterAirborn = true;
        PhysicsGlobals.characterVelocityY = PhysicsGlobals.characterJumpVelocity;
    }
};
Character.prototype.calculateCharacterFrontX = function(characterObj) {
    return characterObj.position.x + characterObj.width/2;
};
Character.prototype.calculateMapToCharacterHeightOffset = function(characterObj, groundY) {
    //if there is a height, return the offset, else null
    return groundY ? groundY - characterObj.children[0].height/2 + 10: undefined;
};
Character.prototype.attackCharacter = function() {
    if (BalanceGlobals.isAttacking) {
        PhysicsGlobals.attackingTime -= 1;
        if (PhysicsGlobals.attackingTime == 0) {
            this.stopAttacking();
        }
    }
};
Character.prototype.startAttackAnimation = function() {
    BalanceGlobals.isAttacking = true;
    this.removeChild(this.text);
    this.text = new PIXI.Text("Attacking", {font:"40px Arial", fill:"#228869"});
    this.text.position.x = 20;
    this.addChild(this.text);

    PhysicsGlobals.attackingTime = 20;
};
Character.prototype.stopAttacking = function() {
    BalanceGlobals.isAttacking = false;
    this.removeChild(this.text);

    PhysicsGlobals.attackingTime = 0;
};
Character.prototype.setNewPowerUpPosition = function(characterObj) {
    if (characterObj.position.y < MapGlobals.screenHeight/2 - characterObj.height) {
        this.Properties.powerUpPositionVelocity = 10;
    }
    else if (characterObj.position.y > MapGlobals.screenHeight/2 + characterObj.height) {
        this.Properties.powerUpPositionVelocity = -15;
    }
    this.Properties.powerUpPositionVelocity += PhysicsGlobals.characterGravity;
    characterObj.position.y += this.Properties.powerUpPositionVelocity;
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
        if (!that.Properties.isAttacking) {
            that.startAttackAnimation();
        }
    }
};