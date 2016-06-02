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
    this.initiateCharacterSprites();
};

Enemy.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.enemyRatio = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.enemyPercent);
    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.enemyRatio, MainGlobals.Scaling.enemyRatio);
    obj.position =  MainGlobals.Helpers.getNewPoint(0-obj.width, 0);
};

Enemy.prototype.initiateCharacterSprites = function() {
    this.Properties.flyTextures.push(
        PIXI.Texture.fromFrame("ts flying2"),
        PIXI.Texture.fromFrame("ts flying1")
    );
    this.Properties.deathTextures.push(
        PIXI.Texture.fromFrame("ts death1"),
        PIXI.Texture.fromFrame("ts death2"),
        PIXI.Texture.fromFrame("ts death3"),
        PIXI.Texture.fromFrame("ts death4"),
        PIXI.Texture.fromFrame("ts death5")
    );

    this.setCurrentTextures(MainGlobals.Timing.enemyFlyTime, this.Properties.flyTextures);
    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

Enemy.prototype.setSpriteToCurrentTexture = function(enemyObj) {
    enemyObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

Enemy.prototype.update = function(enemyObj, characterObj) {
    this.updateSprite(enemyObj);
};

Enemy.prototype.updatePowerUp = function(enemyObj, characterObj) {
    this.updateSprite();
};

Enemy.prototype.updateSprite = function(enemyObj) {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(enemyObj);
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};

Enemy.prototype.nextSprite = function(enemyObj) {
    if (this.Properties.spriteCount == this.Properties.spriteSpeed) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }

    this.setSpriteToCurrentTexture(enemyObj);
};

Enemy.prototype.setCurrentTextures = function(speed, textures) {
    this.Properties.currentTextures = textures;
    this.Properties.spriteSpeed = speed;
    this.Properties.spriteCount = 0; //the setTexture will be one behind since it was already called for this loop
    this.Properties.changeSpriteCounter = 0;


};