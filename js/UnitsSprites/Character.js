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
        PIXI.Texture.fromFrame("sprite4"),
        PIXI.Texture.fromFrame("sprite5"),
        PIXI.Texture.fromFrame("sprite6")
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
        this.gravitateAndCheckIfLanded(characterObj,
            this.calculateMapToCharacterHeightOffset(groundObj.getHeightAtPositionX(characterObj.position.x)));
    }
    //if there is no ground, notice ! sign
    else if (!this.calculateMapToCharacterHeightOffset(groundObj.getHeightAtPositionX(characterObj.position.x))) {
        this.Properties.airborn = true;
        this.gravitateAndCheckIfLanded(characterObj,
            this.calculateMapToCharacterHeightOffset(groundObj.getHeightAtPositionX(characterObj.position.x)));
    }
};
Character.prototype.gravitateAndCheckIfLanded = function(characterObj, groundHeight) {
    //get new velocity
    this.startGravity();
    //if falling, check if lower than ground, then check if next position is lower than ground, set character on ground
    if (this.isFalling()) {
        if(characterObj.position.y > groundHeight) {
            this.endGame();
            characterObj.position.y += this.Properties.velocityY;
        }
        else if ((characterObj.position.y + this.Properties.velocityY) > groundHeight) {
            characterObj.position.y = groundHeight;
            this.Properties.airborn = false;
        }
        else {
            characterObj.position.y += this.Properties.velocityY;
        }
    }
    //if not falling, you are rising at this point, apply gravity.
    else {
        characterObj.position.y += this.Properties.velocityY;
    }
};
Character.prototype.isFalling = function() {
    //negative velocity is up... not rising ur falling. maybe >=
    return this.Properties.velocityY > 0;
};
Character.prototype.endGame = function() {
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
Character.prototype.calculateMapToCharacterHeightOffset = function(groundY) {
    //if there is a height, return the offset, else null
    return groundY ? groundY - this.Properties.sprite.height/2 + 10: null;
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