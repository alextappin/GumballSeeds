/**
 * Created by t_tappa on 11/30/2015.
 */
function Enemy() {
    PIXI.Container.call(this);

    this.EnemyProperties = new EnemyProperties();
    this.initiateCharacterSprites();
}

Enemy.constructor = Enemy;
Enemy.prototype = Object.create(PIXI.Container.prototype);

Enemy.prototype.initiateCharacterSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("BadGuy2Tran"),
        sprite2 = PIXI.Sprite.fromFrame("BadGuy1Tran");
    //add them to the array
    this.EnemyProperties.characterSprites.push(sprite1,sprite2);
    this.addChild(this.EnemyProperties.characterSprites[this.EnemyProperties.spriteCount]);
};

Enemy.prototype.nextSprite = function() {
    this.removeChild(this.EnemyProperties.characterSprites[this.EnemyProperties.spriteCount]);
    if (this.EnemyProperties.spriteCount == 1) {
        this.EnemyProperties.spriteCount = 0;
    }
    else {
        this.EnemyProperties.spriteCount++;
    }
    this.addChild(this.EnemyProperties.characterSprites[this.EnemyProperties.spriteCount]);
};

Enemy.prototype.updateSprite = function() {
    if (this.EnemyProperties.changeSpriteCounter == this.EnemyProperties.spriteSpeed) {
        this.EnemyProperties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.EnemyProperties.changeSpriteCounter ++;
    }
};

//TODO make the 720 and 1080 or whatever screen size is a CONST
Enemy.prototype.updateVelocity = function() {
    var randX = Math.floor((Math.random() * 10) + 4),
        randY = Math.floor((Math.random() * 3) + 1);
    this.speedOrSlow();
    this.EnemyProperties.velocityX = randX;
    this.EnemyProperties.velocityY = randY;
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
    }
    else {
        this.EnemyProperties.velocityX += this.EnemyProperties.velocityX < 1 ? this.EnemyProperties.changeVelocityX : 0;
        this.EnemyProperties.velocityY += this.EnemyProperties.velocityY > 1 ? this.EnemyProperties.changeVelocityY : 0;
        obj.x = posX - this.EnemyProperties.velocityX;
        obj.y = posY + this.EnemyProperties.velocityY;
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
        this.EnemyProperties.changeVelocityX = -.01;
    }
    else {
        this.EnemyProperties.changeVelocityX = .05;
    }
    trig = Math.floor((Math.random() * 2) + 1);
    if (trig == 1) {
        this.EnemyProperties.changeVelocityY = -.01;
    }
    else {
        this.EnemyProperties.changeVelocityY = .05;
    }
};

Enemy.prototype.isIntersecting = function(r1, r2) {
    return !(r2.position.x > (r1.position.x + r1.width) ||
    (r2.position.x + r2.width) < r1.x ||
    r2.position.y > (r1.position.y + r1.height) ||
    (r2.position.y + r2.height) < r1.position.y);

};