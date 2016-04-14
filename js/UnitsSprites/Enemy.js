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
    this.Properties = new EnemyProperties();
    this.instantiateProperties();
    this.initiateCharacterSprites();
};
Enemy.prototype.setPositionAndScale = function(obj) {
    obj.position = GameVariables.getNewPoint(this.Properties.startPosX, this.Properties.startPosY);
    obj.scale = GameVariables.getNewPoint(this.Properties.scaleX, this.Properties.scaleY);
};
Enemy.prototype.initiateCharacterSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("BadGuy1Tran"),
        PIXI.Texture.fromFrame("BadGuy2Tran")
    );
    //add them to the array
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
Enemy.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Enemy.prototype.instantiateProperties = function() {
    //USE RAND CLASS
    var obj = this.getUpdatedPositionVariables(-100, 800);
    this.Properties.positionY = obj.y;
    this.Properties.positionX = obj.x;
    var rand = Math.floor((Math.random() * 5) + 3);
    this.Properties.scaleY = rand/10;
    this.Properties.scaleX = rand/10;
};
Enemy.prototype.update = function(enemyObj, characterObj) {
    this.updateSprite();
    this.moveEnemy(enemyObj, characterObj);
};
Enemy.prototype.updateSprite = function() {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
Enemy.prototype.nextSprite = function() {
    if (this.Properties.spriteCount == 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};
Enemy.prototype.moveEnemy = function(enemyObj, characterObj) {
    var obj = this.getUpdatedPositionVariables(enemyObj.position.x, enemyObj.position.y);
    enemyObj.position.x = obj.x;
    enemyObj.position.y = obj.y;
    if (this.isIntersecting(characterObj, this)) {
        if (characterObj.Properties.isAttacking) {
            ScoreHelper().killEnemy(this.Properties.pointsForKill);
            if (ScoreHelper().createNewEnemy()) {
                GameVariables.setEnemies(GameVariables.getEnemies()+1);
            }
        }
        else {
            GameVariables.setLives(GameVariables.getLives()-1);
            ScoreHelper().getHitByEnemy(1);
            if (GameVariables.getLives() < 0) {
                characterObj.endGame();
            }
        }
        this.updateVelocity();
        var newObj = this.getNewPositions();
        enemyObj.position.x = newObj.x;
        enemyObj.position.y = newObj.y;
    }
};
Enemy.prototype.updateVelocity = function() {
    this.Properties.velocityX = GameVariables.getRandomNumber(4,10);
    this.Properties.velocityY =  GameVariables.getRandomNumber(1,3);
    this.speedOrSlow();
};
Enemy.prototype.getUpdatedPositionVariables = function(posX, posY) {
    if (posX < GameVariables.getScreenOffsetX() || posY > GameVariables.getHeight() + GameVariables.getScreenOffsetY()) {
        this.updateVelocity();
        return this.getNewPositions();
    }
    else {
        this.Properties.velocityX += this.Properties.velocityX < 1 ? this.Properties.changeVelocityX : 0;
        this.Properties.velocityY += this.Properties.velocityY > 1 ? this.Properties.changeVelocityY : 0;

        return {
            x : posX - this.Properties.velocityX,
            y : posY + this.Properties.velocityY
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
    this.Properties.changeVelocityX = GameVariables.getRandomNumber(1,2) == 1 ? this.Properties.velocityDecelerate : this.Properties.velocityAccelerate;
    this.Properties.changeVelocityY = GameVariables.getRandomNumber(1,2) == 1 ? this.Properties.velocityDecelerate : this.Properties.velocityAccelerate;
};
Enemy.prototype.isIntersecting = function(rectangle1, rectangle2) {
    return !(rectangle2.position.x > (rectangle1.position.x + rectangle1.width) ||
    (rectangle2.position.x + rectangle2.width) < rectangle1.x ||
    rectangle2.position.y > (rectangle1.position.y + rectangle1.height) ||
    (rectangle2.position.y + rectangle2.height) < rectangle1.position.y);

};