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
    MainGlobals.Scaling.superbarScale = HelperFunctions().getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.superbarPercent);
    obj.scale = HelperFunctions().getNewPoint(MainGlobals.Scaling.superbarScale,MainGlobals.Scaling.superbarScale);
    obj.position =  HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), MainGlobals.Scaling.superbarPositionY);
};

LifeBar.prototype.initiateLifeBarSprites = function() {
    this.Properties.currentTextures.push(
        PIXI.Texture.fromFrame("superbarBG"),
        PIXI.Texture.fromFrame("superbar1"),
        PIXI.Texture.fromFrame("superbar2"),
        PIXI.Texture.fromFrame("superbar3"),
        PIXI.Texture.fromFrame("superbar4"),
        PIXI.Texture.fromFrame("superbar5"),
        PIXI.Texture.fromFrame("superbar6")
    );

    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

LifeBar.prototype.setSpriteToCurrentTexture = function(superbarObj) {
    superbarObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

LifeBar.prototype.update = function(superbarObj) {
    if (!superbarObj.visible) {
        superbarObj.visible = true;
    }

    this.checkForUpdate(superbarObj);
};

LifeBar.prototype.updatePowerUp = function(superbarObj) {
    if (superbarObj.visible) {
        superbarObj.visible = false;
    }
};

LifeBar.prototype.checkForUpdate = function(superbarObj) {
    if (MainGlobals.PowerUp.powerBarLevel != this.Properties.spriteCount) {
        this.Properties.spriteCount = MainGlobals.PowerUp.powerBarLevel;
        this.setSpriteToCurrentTexture(superbarObj);
    }
};