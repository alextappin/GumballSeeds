/**
 * Created by t_tappa on 11/30/2015.
 */
function Enemy() {
    PIXI.Container.call(this);

    this.characterSprites = [];
    this.spriteCount = 0;

    this.continueGame = true;

    this.velocityX = 7;
    this.velocityY = 2;

    this.changeSpriteCounter = 0;
    this.spriteSpeed = 12;
    this.initiateCharacterSprites();
}

Enemy.constructor = Enemy;
Enemy.prototype = Object.create(PIXI.Container.prototype);

Enemy.prototype.initiateCharacterSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("BadGuy2Tran"),
        sprite2 = PIXI.Sprite.fromFrame("BadGuy1Tran");
    //add them to the array
    this.characterSprites.push(sprite1,sprite2);
    this.addChild(this.characterSprites[this.spriteCount]);
};

Enemy.prototype.nextSprite = function() {
    this.removeChild(this.characterSprites[this.spriteCount]);
    if (this.spriteCount == 1) {
        this.spriteCount = 0;
    }
    else {
        this.spriteCount++;
    }
    this.addChild(this.characterSprites[this.spriteCount]);
};

Enemy.prototype.updateSprite = function() {
    if (this.changeSpriteCounter == this.spriteSpeed) {
        this.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.changeSpriteCounter ++;
    }
};

//TODO make the 720 and 1080 or whatever screen size is a CONST
Enemy.prototype.updatePositionX = function(posX) {
    if (posX < 0) {
        this.updateVelocity();
        return 1080;
    }
    return posX - this.velocityX;
};

Enemy.prototype.updatePositionY = function(posY) {
    if (posY > 720) {
        this.updateVelocity();
        return 0;
    }
    return posY + this.velocityY;
};

Enemy.prototype.updateVelocity = function() {
    var randX = Math.floor((Math.random() * 15) + 6),
        randY = Math.floor((Math.random() * 4) + 1);
    this.velocityX = randX;
    this.velocityY = randY;
};