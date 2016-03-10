/**
 * Created by t_tappa on 11/30/2015.
 */
function Enemy() {
    PIXI.Container.call(this);
    this.constructEnemy();
}

Enemy.constructor = Enemy;
Enemy.prototype = Object.create(PIXI.Container.prototype);

Enemy.prototype.constructEnemy = function() {
    this.EnemyProperties = new EnemyProperties();
    this.initiateCharacterSprites();
};

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
        this.EnemyProperties.changeSpriteCounter++;
    }
};

Enemy.prototype.updateVelocity = function() {
    this.EnemyProperties.velocityX = GameVariables.getRandomNumber(4,10);
    this.EnemyProperties.velocityY =  GameVariables.getRandomNumber(1,3);
    this.speedOrSlow();
};

Enemy.prototype.getUpdatedPositionVariables = function(posX, posY) {
    if (posX < GameVariables.getScreenOffsetX() || posY > GameVariables.getHeight() + GameVariables.getScreenOffsetY()) {
        this.updateVelocity();
        return this.getNewPositions();
    }
    else {
        this.EnemyProperties.velocityX += this.EnemyProperties.velocityX < 1 ? this.EnemyProperties.changeVelocityX : 0;
        this.EnemyProperties.velocityY += this.EnemyProperties.velocityY > 1 ? this.EnemyProperties.changeVelocityY : 0;

        return {
            x : posX - this.EnemyProperties.velocityX,
            y : posY + this.EnemyProperties.velocityY
        };
    }

};

Enemy.prototype.getNewPositions = function() {
    return {
        x : GameVariables.getWidth()+100,
        y :  GameVariables.getRandomNumber(0, 400)
    };
};

Enemy.prototype.speedOrSlow = function() {
    this.EnemyProperties.changeVelocityX = GameVariables.getRandomNumber(1,2) == 1 ? this.EnemyProperties.velocityDecelerate : this.EnemyProperties.velocityAccelerate;
    this.EnemyProperties.changeVelocityY = GameVariables.getRandomNumber(1,2) == 1 ? this.EnemyProperties.velocityDecelerate : this.EnemyProperties.velocityAccelerate;
};

Enemy.prototype.isIntersecting = function(rectangle1, rectangle2) {
    return !(rectangle2.position.x > (rectangle1.position.x + rectangle1.width) ||
    (rectangle2.position.x + rectangle2.width) < rectangle1.x ||
    rectangle2.position.y > (rectangle1.position.y + rectangle1.height) ||
    (rectangle2.position.y + rectangle2.height) < rectangle1.position.y);

};