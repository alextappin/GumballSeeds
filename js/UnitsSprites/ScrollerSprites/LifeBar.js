/**
 * Created by ajt on 4/9/2016.
 */
function LifeBar() {
    PIXI.Container.call(this);
    this.constructLifeBar();
}

LifeBar.constructor = LifeBar;
LifeBar.prototype = Object.create(PIXI.Container.prototype);

LifeBar.prototype.constructLifeBar = function() {
    this.Properties = new LifeBarProperties();
    this.initiateLifeBarSprites();
};

LifeBar.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.lifeBarScale = HelperFunctions().getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.superbarPercent);
    obj.scale = HelperFunctions().getNewPoint(MainGlobals.Scaling.lifeBarScale,MainGlobals.Scaling.lifeBarScale);
    obj.position =  HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), MainGlobals.Scaling.superbarPositionY);
};

LifeBar.prototype.initiateLifeBarSprites = function() {
    this.Properties.currentTextures.push(
        PIXI.Texture.fromFrame("lifebar1"),
        PIXI.Texture.fromFrame("lifebar2"),
        PIXI.Texture.fromFrame("lifebar3"),
        PIXI.Texture.fromFrame("lifebar4"),
        PIXI.Texture.fromFrame("lifebar5"),
        PIXI.Texture.fromFrame("lifebar6"),
        PIXI.Texture.fromFrame("lifebar7"),
        PIXI.Texture.fromFrame("lifebar8"),
        PIXI.Texture.fromFrame("lifebar9"),
        PIXI.Texture.fromFrame("lifebar10"),
        PIXI.Texture.fromFrame("lifebar11"),
        PIXI.Texture.fromFrame("lifebar12"),
        PIXI.Texture.fromFrame("lifebar13"),
        PIXI.Texture.fromFrame("lifebar14"),
        PIXI.Texture.fromFrame("lifebar15"),
        PIXI.Texture.fromFrame("lifebar16"),
        PIXI.Texture.fromFrame("lifebar17"),
        PIXI.Texture.fromFrame("lifebar18"),
        PIXI.Texture.fromFrame("lifebar19"),
        PIXI.Texture.fromFrame("lifebar20")
    );

    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

LifeBar.prototype.setSpriteToCurrentTexture = function(lifebarObj) {
    lifebarObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

LifeBar.prototype.update = function(lifebarObj) {
    if (!lifebarObj.visible) {
        lifebarObj.visible = true;
    }

    this.checkForUpdate(lifebarObj);
};

LifeBar.prototype.updatePowerUp = function(lifebarObj) {
    if (lifebarObj.visible) {
        lifebarObj.visible = false;
    }
};

LifeBar.prototype.checkForUpdate = function(lifebarObj) {
    if (MainGlobals.PowerUp.powerBarLevel != this.Properties.spriteCount) {
        this.Properties.spriteCount = MainGlobals.PowerUp.powerBarLevel;
        this.setSpriteToCurrentTexture(lifebarObj);
    }
};