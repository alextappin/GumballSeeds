/**
 * Created by t_tappa on 11/30/2015.
 */
function Character() {
    PIXI.Container.call(this);

    this.characterSprites = [];
    this.spriteCount = 0;

    this.jumping = true;
    this.applyFallingGravity = false;

    this.isAttacking = false;
    this.attackingTime = 0;

    this.continueGame = true;

    this.velocityY = 0;
    this.gravity = .5;

    this.changeSpriteCounter = 0;
    this.spriteSpeed = 8;
    this.initiateCharacterSprites();
    this.spaceBar = new KeyboardControl(32);
    this.listenForJumpTrigger();

    this.ctrlButton = new KeyboardControl(17);
    this.listenForAttackTrigger();

    this.leftArrow = new KeyboardControl(37);
    this.rightArrow = new KeyboardControl(39);
}

Character.constructor = Character;
Character.prototype = Object.create(PIXI.Container.prototype);

Character.prototype.initiateCharacterSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("sprite1"),
        sprite2 = PIXI.Sprite.fromFrame("sprite2"),
        sprite3 = PIXI.Sprite.fromFrame("sprite3"),
        sprite4 = PIXI.Sprite.fromFrame("sprite4"),
        sprite5 = PIXI.Sprite.fromFrame("sprite5"),
        sprite6 = PIXI.Sprite.fromFrame("sprite6");
    //add them to the array
    this.characterSprites.push(sprite1,sprite2,sprite3, sprite4, sprite5, sprite6);
    this.addChild(this.characterSprites[this.spriteCount]);
};

Character.prototype.nextSprite = function() {
    this.removeChild(this.characterSprites[this.spriteCount]);
    if (this.spriteCount == 5) {
        this.spriteCount = 0;
    }
    else {
        this.spriteCount++;
    }
    this.addChild(this.characterSprites[this.spriteCount]);
};

Character.prototype.updateSprite = function() {
    if (this.changeSpriteCounter == this.spriteSpeed) {
        this.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.changeSpriteCounter ++;
    }
};

Character.prototype.startJumpAnimation = function() {
    this.jumping = true;
    this.velocityY = -13.0;
};

Character.prototype.moveHeightJumping = function(posY, currentSlicePosY, nextSlicePosY) {
    return this.simulateGravity(posY, this.calculateMapToCharacterHeightOffset(currentSlicePosY), this.calculateMapToCharacterHeightOffset(nextSlicePosY));
};

Character.prototype.listenForJumpTrigger = function() {
    var that = this;
    this.spaceBar.press = function () {
        if (!that.jumping) {
            that.startJumpAnimation();
        }
    }
};

Character.prototype.simulateGravity = function(posY, currentSlicePosY, nextSlicePosY) {
    this.velocityY += this.gravity;
    posY += this.velocityY;

    //TODO put these numbers in a config file. This number signifies the lowest wall
    //if the character isnt moving up and the next slice is taller than the character...
    //if the character is lower than the next slice, the character is travelling down and they are over a gap (99976) then the game is over
    if (posY > nextSlicePosY && this.velocityY > 0 && currentSlicePosY == 99976) {
        this.continueGame = false;
    }
    //TODO psyY > currentSlicePos & velocity is positive(negative...)
    if (posY >= currentSlicePosY && this.continueGame) {
        this.velocityY = 0.0;
        this.jumping = false;
        posY = currentSlicePosY;
    }
    return posY;
};

Character.prototype.endJumping = function(pos) {
    this.jumping = false;
};

Character.prototype.charIsJumping = function() {
    return (this.jumping)
};

Character.prototype.calculateMapToCharacterHeightOffset = function(wallPos) {
    return wallPos - 24;
};

Character.prototype.checkIfFalling = function(currentSliceHeight, nextSliceHeight) {
    if (!this.jumping && this.calculateMapToCharacterHeightOffset(currentSliceHeight) > this.position.y) {
        this.jumping = true;
        this.simulateGravity(this.position.y, this.calculateMapToCharacterHeightOffset(currentSliceHeight), this.calculateMapToCharacterHeightOffset(nextSliceHeight));
    }
};

Character.prototype.listenForAttackTrigger = function() {
    var that = this;
    this.ctrlButton.press = function () {
        if (!that.isAttacking) {
            that.startAttackAnimation();
        }
    }
};

Character.prototype.startAttackAnimation = function() {
    this.isAttacking = true;
    this.removeChild(this.text);
    this.text = new PIXI.Text("Attacking", {font:"40px Arial", fill:"#228869"});
    this.text.position.x = 20;
    this.addChild(this.text);

    this.attackingTime = 20;
};

Character.prototype.stopAttacking = function() {
    this.isAttacking = false;
    this.removeChild(this.text);

    this.attackingTime = 0;
};
