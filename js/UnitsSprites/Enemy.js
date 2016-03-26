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
    this.instantiateProperties();
};
Enemy.prototype.instantiateProperties = function() {

    //USE RAND CLASS
    var obj = this.getUpdatedPositionVariables(-100, 800);
    this.EnemyProperties.positionY = obj.y;
    this.EnemyProperties.positionX = obj.x;
    var rand = Math.floor((Math.random() * 5) + 3);
    this.EnemyProperties.scaleY = rand/10;
    this.EnemyProperties.scaleX = rand/10;
};
Enemy.prototype.update = function(enemyObj, characterObj) {
    this.updateSprite();
    this.updatePosition(enemyObj);
    this.moveEnemy(enemyObj, characterObj);
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

Enemy.prototype.updatePosition = function(enemyObj) {
    enemyObj.scale.x = this.EnemyProperties.scaleX;
    enemyObj.scale.y = this.EnemyProperties.scaleY;
};

Enemy.prototype.moveEnemy = function(enemyObj, characterObj) {
    var obj = this.getUpdatedPositionVariables(enemyObj.position.x, enemyObj.position.y);
    enemyObj.position.x = obj.x;
    enemyObj.position.y = obj.y;
    if (this.isIntersecting(characterObj, this)) {
        if (characterObj.CharacterProperties.isAttacking) {
            GameVariables.setCurrentScore(GameVariables.getCurrentScore()+1);
            if (GameVariables.getCurrentScore()%5 == 0) {
                GameVariables.setEnemies(GameVariables.getEnemies()+1);
            }
        }
        else {
            GameVariables.setLives(GameVariables.getLives()-1);
            if (GameVariables.getLives() < 0) {
                characterObj.CharacterProperties.continueGame = false;
                characterObj.CharacterProperties.jumping = true;
            }
        }
        this.updateVelocity();
        var newObj = this.getNewPositions();
        enemyObj.position.x = newObj.x;
        enemyObj.position.y = newObj.y;
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