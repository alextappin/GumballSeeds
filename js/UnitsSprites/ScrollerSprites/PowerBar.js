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
        PIXI.Texture.fromFrame("superbar6"),
        PIXI.Texture.fromFrame("superbar7")
    );

    this.Properties.superbarFullTextures.push (
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
    this.checkForUpdate(superbarObj);
};

PowerBar.prototype.updatePowerUp = function(superbarObj) {
    this.checkForUpdate();
};

PowerBar.prototype.checkForUpdate = function(superbarObj) {
    if (MainGlobals.PowerUp.powerBarLevel != this.Properties.spriteCount) {
        this.Properties.spriteCount = MainGlobals.PowerUp.powerBarLevel;
        this.setSpriteToCurrentTexture(superbarObj);
    }
};

PowerBar.prototype.addBar = function() {
    if (this.Properties.spriteCount !== this.Properties.textures.length) {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};

PowerBar.prototype.removeBar = function() {
    if (this.Properties.spriteCount !== 0) {
        this.Properties.spriteCount--;
    }
    this.setSpriteToCurrentTexture();
};