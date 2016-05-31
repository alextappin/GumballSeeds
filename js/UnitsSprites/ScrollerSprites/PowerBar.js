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
    MainGlobals.Scaling.superbarScale = HelperFunctions().getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.superbarPercent);
    obj.scale = HelperFunctions().getNewPoint(MainGlobals.Scaling.superbarScale,MainGlobals.Scaling.superbarScale);
    obj.position =  HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), MainGlobals.Scaling.superbarPositionY);
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
        PIXI.Texture.fromFrame("superbar8"),
        PIXI.Texture.fromFrame("superbar9")
    );

    this.setCurrentTextures();

    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

PowerBar.prototype.setCurrentTextures = function(speed, textures) {
    if (textures) {
        this.Properties.currentTextures = textures;
        this.Properties.spriteSpeed = speed;
        this.Properties.spriteCount = 0; //the setTexture will be one behind since it was already called for this loop
        this.Properties.changeSpriteCounter = 0;
    } else {
        this.Properties.currentTextures = this.Properties.superbarTextures; //default is run...
        this.Properties.spriteSpeed = MainGlobals.Timing.superbarTime;
        this.Properties.spriteCount = 0;
        this.Properties.changeSpriteCounter = 0;
    }

};

PowerBar.prototype.setSpriteToCurrentTexture = function(superbarObj) {
    superbarObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

PowerBar.prototype.update = function(superbarObj) {
    if (this.Properties.currentTextures != this.Properties.superbarTextures) {
        this.setCurrentTextures(MainGlobals.Timing.superbarTime, this.Properties.superbarFullTextures);
    }
    this.checkForUpdate(superbarObj);
};

PowerBar.prototype.updatePowerUp = function(superbarObj) {
    if (this.Properties.currentTextures != this.Properties.superbarFullTextures) {
        this.setCurrentTextures(MainGlobals.Timing.superbarTime, this.Properties.superbarFullTextures);
    }
    this.superCheckForUpdate(superbarObj);
};

PowerBar.prototype.checkForUpdate = function(superbarObj) {
    if (MainGlobals.PowerUp.powerBarLevel != this.Properties.spriteCount) {
        this.Properties.spriteCount = MainGlobals.PowerUp.powerBarLevel;
        this.setSpriteToCurrentTexture(superbarObj);
    }
};

PowerBar.prototype.superCheckForUpdate = function(superbarObj) {
    if (this.Properties.changeSpriteCounter == MainGlobals.Timing.superbarTime) {
        if (this.Properties.spriteCount < this.Properties.currentTextures.length-1) {
            this.Properties.changeSpriteCounter = 0;
            this.Properties.spriteCount++;
            this.setSpriteToCurrentTexture(superbarObj);
        }
    } else {
        this.Properties.changeSpriteCounter++;
    }
};

PowerBar.prototype.setCurrentTextures = function(speed, textures) {
    this.Properties.currentTextures = textures;
    this.Properties.spriteSpeed = speed;
    this.Properties.spriteCount = 0; //the setTexture will be one behind since it was already called for this loop
    this.Properties.changeSpriteCounter = 0;
};