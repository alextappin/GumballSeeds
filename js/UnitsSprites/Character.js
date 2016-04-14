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
    //if there is no ground,
    if (!groundObj.getHeightAtPositionX(this.Properties.sprite.position.x)) {
        this.Properties.airborn = true;
        this.gravitateAndCheckIfLanded(characterObj, groundObj.getHeightAtPositionX(this.Properties.sprite.position.x));
    }
    else if (this.Properties.airborn) {
        this.gravitateAndCheckIfLanded(characterObj, groundObj.getHeightAtPositionX(this.Properties.sprite.position.x));
    }
};
Character.prototype.gravitateAndCheckIfLanded = function(characterObj, groundHeight) {
    //if falling, check if lower than ground, then check if next position is lower than ground, set character on ground
    if (this.isFalling()) {
        if(this.Properties.sprite.position.x > groundHeight) {
            this.endGame();
        }
        else if (this.startGravityGetPosition() > groundHeight) {
            characterObj.position.y = groundHeight;
        }
    }
    //if not falling, you are rising at this point, apply gravity.
    else {
        characterObj.position.y = this.startGravityGetPosition();
    }
};
Character.prototype.isFalling = function() {
    //negative velocity is up... not rising ur falling. maybe >=
    return this.Properties.velocityY > 0;
};
Character.prototype.endGame = function() {

};
Character.prototype.startGravityGetPosition = function() {
    this.Properties.velocityY += this.Properties.gravity;
    return this.Properties.sprite.position.y + this.Properties.velocityY;
};

Character.prototype.jumpCharacter = function(characterObj, groundObj){
    if (this.charIsJumping()) {
        characterObj.position.y = this.moveHeightJumping(characterObj.position.y,
            groundObj.Properties.positionY, groundObj.Properties.positionY);
    }
    else {
        this.endJumping();
    }
};
Character.prototype.attackCharacter = function() {
    if (this.Properties.isAttacking) {
        this.Properties.attackingTime -= 1;
        if (this.Properties.attackingTime == 0) {
            this.stopAttacking();
        }
    }
};
Character.prototype.startJumpAnimation = function() {
    if (!this.charIsJumping()) {
        this.Properties.jumping = true;
        this.Properties.velocityY = -15.0;
    }
};
Character.prototype.moveHeightJumping = function(posY, currentSlicePosY, nextSlicePosY) {
    return this.simulateGravity(posY, this.calculateMapToCharacterHeightOffset(currentSlicePosY), this.calculateMapToCharacterHeightOffset(nextSlicePosY));
};
Character.prototype.simulateGravity = function(posY, currentSlicePosY, nextSlicePosY) {
    this.Properties.velocityY += this.Properties.gravity;
    posY += this.Properties.velocityY;

    //TODO put these numbers in a config file. This number signifies the lowest wall
    //if the character isnt moving up and the next slice is taller than the character...
    //if the character is lower than the next slice, the character is travelling down and they are over a gap (99976) then the game is over
    if (posY > nextSlicePosY+100 && this.Properties.velocityY > 0) {
        this.Properties.continueGame = false;
        GameVariables.toggleScreenChange();
        GameVariables.setScreenTitle();
    }
    //TODO psyY > currentSlicePos & velocity is positive(negative...)
    if (posY >= currentSlicePosY && this.Properties.continueGame) {
        this.Properties.velocityY = 0.0;
        this.Properties.jumping = false;
        posY = currentSlicePosY;
    }
    return posY;
};
Character.prototype.endJumping = function() {
    this.Properties.jumping = false;
};
Character.prototype.charIsJumping = function() {
    return (this.Properties.jumping);
};
Character.prototype.calculateMapToCharacterHeightOffset = function(wallPos) {
    return wallPos - 52;
};
Character.prototype.checkIfFalling = function(currentSliceHeight, nextSliceHeight) {
    if (!this.Properties.jumping && this.calculateMapToCharacterHeightOffset(currentSliceHeight) > this.position.y) {
        this.Properties.jumping = true;
        this.simulateGravity(this.position.y, this.calculateMapToCharacterHeightOffset(currentSliceHeight), this.calculateMapToCharacterHeightOffset(nextSliceHeight));
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
        if (!that.Properties.jumping) {
            that.startJumpAnimation();
        }
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