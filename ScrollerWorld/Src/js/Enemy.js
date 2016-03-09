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
    this.changeVelocityX = 0;
    this.changeVelocityY = 0;
    this.slowOrSpeedTrigger = false;

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
Enemy.prototype.updateVelocity = function() {
    var randX = Math.floor((Math.random() * 10) + 4),
        randY = Math.floor((Math.random() * 3) + 1);
    this.speedOrSlow();
    this.velocityX = randX;
    this.velocityY = randY;
};

Enemy.prototype.getUpdatedPositionVariables = function(posX, posY) {
    var obj = {
        x : 0,
        y : 0
    };
    if (posX < -50 || posY > 720) {
        this.updateVelocity();
        var newObj = this.getNewPositions();
        obj.x = newObj.x;
        obj.y = newObj.y;
        console.log(obj);
    }
    else {
        this.velocityX += this.velocityX < 1 ? this.changeVelocityX : 0;
        this.velocityY += this.velocityY > 1 ? this.changeVelocityY : 0;
        obj.x = posX - this.velocityX;
        obj.y = posY + this.velocityY;
    }
    return obj;

};

Enemy.prototype.getNewPositions = function() {
    var obj = {
        x : 0,
        y : 0
    };
    obj.y = Math.floor(Math.random() * 200);
    obj.x = 1100;
    return obj;
};

Enemy.prototype.speedOrSlow = function() {
    var trig = Math.floor((Math.random() * 2) + 1);
    if (trig == 1) {
        this.changeVelocityX = -.01;
    }
    else {
        this.changeVelocityX = .05;
    }
    trig = Math.floor((Math.random() * 2) + 1);
    if (trig == 1) {
        this.changeVelocityY = -.01;
    }
    else {
        this.changeVelocityY = .05;
    }
};