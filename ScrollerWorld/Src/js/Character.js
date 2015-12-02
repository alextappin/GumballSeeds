/**
 * Created by t_tappa on 11/30/2015.
 */
function Character() {
    PIXI.Container.call(this);

    this.characterSprites = [];
    this.spriteCount = 0;

    this.jumping = false;
    this.jumpCounter = 0;

    this.jumpHeight = 64;

    this.originalPosY = 0;

    this.velocityY = 0;
    this.gravity = .27;

    this.changeSpriteCounter = 0;
    this.spriteSpeed = 8;
    this.initiateCharacterSprites();
    this.spaceBar = new KeyboardControl(32);
    this.listenForJumpTrigger();
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
    this.velocityY = -8.0;
};

Character.prototype.moveHeightJumping = function(posY) {
    return this.simulateGravity(posY);
};

Character.prototype.listenForJumpTrigger = function() {
    var that = this;
    this.spaceBar.press = function () {
        if (!that.jumping) {
            that.startJumpAnimation();
        }
    }
};

Character.prototype.simulateGravity = function(posY) {
    this.velocityY += this.gravity;
    posY += this.velocityY;

    //TODO psyY > endPos & velocity is positive(negative...)
    if (posY > this.originalPosY) {
        posY = this.originalPosY;
        this.velocityY = 0.0;
        this.jumping = false;
    }
    return posY;
};

Character.prototype.endJumping = function(pos) {
    this.jumping = false;
    this.jumpCounter = 0;
    this.originalPosY = pos;
};

Character.prototype.charIsJumping = function() {
    return (this.jumping && this.jumpCounter < this.jumpHeight)
};

