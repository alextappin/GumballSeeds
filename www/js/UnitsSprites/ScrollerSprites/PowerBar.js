/**
 * Created by ajt on 4/9/2016.
 */
function PowerBar() {
    PIXI.Container.call(this);
    this.constructPowerBar();
}

PowerBar.constructor = PowerBar;
PowerBar.prototype = Object.create(PIXI.Container.prototype);

PowerBar.prototype.constructPowerBar = function() {
    this.Properties = new PowerBarProperties();
    this.initiatePowerBarSprites();
};

PowerBar.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.superbarScale = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.superbarPercent);
    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.superbarScale,MainGlobals.Scaling.superbarScale);
    obj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.Helpers.getScreenPositionMiddleWidth(obj.width), MainGlobals.Scaling.superbarPositionY);
};

PowerBar.prototype.initiatePowerBarSprites = function() {
    this.Properties.superbarTextures.push(
        PIXI.Texture.fromFrame("superbarBG"),
        PIXI.Texture.fromFrame("superbar1"),
        PIXI.Texture.fromFrame("superbar2"),
        PIXI.Texture.fromFrame("superbar3"),
        PIXI.Texture.fromFrame("superbar4"),
        PIXI.Texture.fromFrame("superbar5"),
        PIXI.Texture.fromFrame("superbar6")
    );

    this.Properties.superbarFullTextures.push (
        PIXI.Texture.fromFrame("superbar7"),
        PIXI.Texture.fromFrame("superbar7"),
        PIXI.Texture.fromFrame("superbar8"),
        PIXI.Texture.fromFrame("superbar9")
    );

    this.setCurrentTextures(MainGlobals.Timing.superbarTime, this.Properties.superbarTextures);

    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

PowerBar.prototype.setSpriteToCurrentTexture = function(superbarObj) {
    superbarObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

PowerBar.prototype.update = function(superbarObj) {
    if (this.Properties.currentTextures != this.Properties.superbarTextures) {
        this.setCurrentTextures(MainGlobals.Timing.superbarTime, this.Properties.superbarTextures);
    }

    this.checkForUpdate(superbarObj);
};

PowerBar.prototype.updatePowerUp = function(superbarObj) {
    if (this.Properties.currentTextures != this.Properties.superbarFullTextures) {
        this.setCurrentTextures(MainGlobals.Timing.superbarTime, this.Properties.superbarFullTextures);
        this.Properties.changeSpriteCounter = MainGlobals.Timing.superbarTime;
    }

    this.superCheckForUpdate(superbarObj);
};

PowerBar.prototype.checkForUpdate = function(superbarObj) {
    if (MainGlobals.PowerUp.powerBarLevel != this.Properties.spriteCount) {
        this.Properties.spriteCount = MainGlobals.PowerUp.powerBarLevel;
        this.setSpriteToCurrentTexture(superbarObj);
    }
    if (this.Properties.superbarFullTextures.indexOf(superbarObj.children[0].texture) > -1) {
        this.Properties.spriteCount = MainGlobals.PowerUp.powerBarLevel;
        this.setSpriteToCurrentTexture(superbarObj);
        superbarObj.visible = true;
        this.setPositionScaleNew(superbarObj);
    }
};

PowerBar.prototype.superCheckForUpdate = function(superbarObj) {
    if (this.Properties.changeSpriteCounter == MainGlobals.Timing.superbarTime) {
        if (this.Properties.spriteCount < this.Properties.currentTextures.length-1) {
            this.Properties.changeSpriteCounter = 0;
            this.Properties.spriteCount++;
            this.setSpriteToCurrentTexture(superbarObj);
            this.setPositionScaleNew(superbarObj);
        } else {
            superbarObj.visible = false;
        }
    } else {
        this.Properties.changeSpriteCounter++;
    }
};

PowerBar.prototype.setCurrentTextures = function(speed, textures) {
    this.Properties.currentTextures = textures;
    this.Properties.spriteSpeed = speed;
    this.Properties.spriteCount = 0;
    this.Properties.changeSpriteCounter = 0;
};

PowerBar.prototype.setPositionScaleNew = function(superbarObj) {
    superbarObj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.Helpers.getScreenPositionMiddleWidth(superbarObj.width), MainGlobals.Scaling.superbarPositionY);
};