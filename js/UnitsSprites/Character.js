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
    obj.position =  new GameVariables.getNewPoint(GameVariables.getCharacterPositionX(), this.Properties.startPosY);
    obj.scale = new GameVariables.getNewPoint(this.Properties.scaleX, this.Properties.scaleY);
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
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
Character.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Character.prototype.update = function(characterObj, groundObj) {
    this.updateSprites();
    this.characterGravity(characterObj, groundObj);
    this.attackCharacter();
};
Character.prototype.updateSprites = function() {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
Character.prototype.nextSprite = function() {
    //Set ternary
    //TODO dont use ==5 instead use the maximum number of textures the character has
    if (this.Properties.spriteCount == 5) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};
Character.prototype.characterGravity = function(characterObj, groundObj) {
    if (this.Properties.airborn) {
        if (this.isFalling()) {
            this.fall(characterObj,this.calculateMapToCharacterHeightOffset(groundObj.getHeightAtPositionX(this.calculateCharacterFrontX(characterObj))));
        }
        else {
            this.rise(characterObj);
        }
    }
    //if there is no ground, notice ! sign, you will FALL
    else if (!this.calculateMapToCharacterHeightOffset(groundObj.getHeightAtPositionX(this.calculateCharacterFrontX(characterObj)))) {
        this.Properties.airborn = true;
        this.fall(characterObj,this.calculateMapToCharacterHeightOffset(groundObj.getHeightAtPositionX(this.calculateCharacterFrontX(characterObj))));
    }
};
Character.prototype.fall = function(characterObj, groundHeight) {
    this.startGravity();
    //passed ground
    if(characterObj.position.y > groundHeight) {
        this.endGame();
        characterObj.position.y += this.Properties.velocityY;
    }
    //landed
    else if ((characterObj.position.y + this.Properties.velocityY) > groundHeight) {
        characterObj.position.y = groundHeight;
        this.Properties.velocityY = 0;
        this.Properties.airborn = false;
    }
    //falling
    else {
        characterObj.position.y += this.Properties.velocityY;
    }
};
Character.prototype.rise = function(characterObj) {
    this.startGravity();
    characterObj.position.y += this.Properties.velocityY;
};
Character.prototype.isFalling = function() {
    //negative velocity is up... not rising ur falling. maybe >=
    return this.Properties.velocityY >= 0;
};
Character.prototype.endGame = function() {
    this.Properties.airborn = true;
    this.Properties.continueGame = false;
    GameVariables.toggleScreenChange();
    GameVariables.setScreenTitle();
};
Character.prototype.startGravity = function() {
    this.Properties.velocityY += this.Properties.gravity;
};
Character.prototype.startJumpAnimation = function() {
    //not airborn, then GO AIRBORN and set velocity
    if (!this.Properties.airborn) {
        this.Properties.airborn = true;
        this.Properties.velocityY = this.Properties.jumpVelocity;
    }
};
Character.prototype.calculateCharacterFrontX = function(characterObj) {
    return characterObj.position.x + characterObj.width/2;
};
Character.prototype.calculateMapToCharacterHeightOffset = function(groundY) {
    //if there is a height, return the offset, else null
    return groundY ? groundY - this.Properties.sprite.height/2 + 10: undefined;
};
Character.prototype.attackCharacter = function() {
    if (this.Properties.isAttacking) {
        this.Properties.attackingTime -= 1;
        if (this.Properties.attackingTime == 0) {
            this.stopAttacking();
        }
    }
};
Character.prototype.startAttackAnimation = function() {
    this.Properties.isAttacking = true;
    this.removeChild(this.text);
    this.text = new PIXI.Text("Attacking", {font:"40px Arial", fill:"#228869"});
    this.text.position.x = 20;
    this.addChild(this.text);

    this.Properties.attackingTime = 20;
};
Character.prototype.stopAttacking = function() {
    this.Properties.isAttacking = false;
    this.removeChild(this.text);

    this.Properties.attackingTime = 0;
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