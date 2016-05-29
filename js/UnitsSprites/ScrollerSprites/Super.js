/**
 * Created by ajt on 5/28/2016.
 */
function Super() {
    PIXI.Container.call(this);
    this.constructSuper();
}

Super.constructor = Super;
Super.prototype = Object.create(PIXI.Container.prototype);

Super.prototype.constructSuper = function() {
    //this.Properties = new SuperProperties();
    this.Properties = {};
    this.Properties.spriteCount = 0;
    this.Properties.changeSpriteCounter = 10;
    this.Properties.spriteSpeed = 10;
    this.Properties.currentTexture = [];
    this.initiateSuperSprites();
};

Super.prototype.setPositionAndScale = function(obj) {
    ScalingGlobals.superRatio = HelperFunctions().getScreenRatioUsingHeight(obj.height, ScalingGlobals.superPercentOfScreen);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.superRatio, ScalingGlobals.superRatio);
    obj.position =  HelperFunctions().getNewPoint(0,0);
};

Super.prototype.initiateSuperSprites = function() {
    this.Properties.superPowerupTextures.push(
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("3 super powerup"),
        PIXI.Texture.fromFrame("4 super powerup"),
        PIXI.Texture.fromFrame("5 super powerup"),
        PIXI.Texture.fromFrame("rainbowband 1start")
    );
    this.Properties.rainbowSuperTextures.push(
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband down1b"),
        PIXI.Texture.fromFrame("rainbowband down2a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down3a"),
        PIXI.Texture.fromFrame("rainbowband down3b"),
        PIXI.Texture.fromFrame("rainbowband down3a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down2a"),
        PIXI.Texture.fromFrame("rainbowband down1b"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband up1a"),
        PIXI.Texture.fromFrame("rainbowband up1b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up2b"),
        PIXI.Texture.fromFrame("rainbowband up3a"),
        PIXI.Texture.fromFrame("rainbowband up3b"),
        PIXI.Texture.fromFrame("rainbowband up3a"),
        PIXI.Texture.fromFrame("rainbowband up2b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up1b"),
        PIXI.Texture.fromFrame("rainbowband up1a")
    );

    this.setCurrentTextures(TimingGlobals.rainbowChargeTime, this.Properties.superPowerupTextures);

    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame(this.Properties.currentTextures[this.Properties.spriteCount])));
};

Super.prototype.update = function(superObj) {
    if (!PowerUpGlobals.characterDonePoweringUp) {
        this.updateSprites(superObj);
    } else if (this.Properties.currentTextures != this.Properties.rainbowSuperTextures) {
        this.setCurrentTextures(TimingGlobals.rainbowTime, this.Properties.rainbowSuperTextures);
        this.updateSprites(superObj);
    }
};

Super.prototype.updateSprites = function(superObj) {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(superObj);
    } else {
        this.Properties.changeSpriteCounter++;
    }
};

Super.prototype.nextSprite = function(superObj) {
    if (this.Properties.spriteCount == this.Properties.currentTextures.length - 1) {
        this.Properties.spriteCount = 0;
    } else {
        this.Properties.spriteCount++;
    }

    this.setSpriteToCurrentTexture(superObj);
};

Super.prototype.setSpriteToCurrentTexture = function(superObj) {
    superObj.children[0].texture = this.Properties.currentTextures[this.Properties.spriteCount];
};

Super.prototype.setCurrentTextures = function(speed, textures) {
    this.Properties.currentTextures = textures;
    this.Properties.spriteSpeed = speed;
    this.Properties.spriteCount = 0; //the setTexture will be one behind since it was already called for this loop
    this.Properties.changeSpriteCounter = 0;
};
