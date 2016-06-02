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
    this.Properties.superPowerupTextures = [];
    this.Properties.rainbowSuperTextures = [];
    this.initiateSuperSprites();
};

Super.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.superRatio = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.superPercentOfScreen);
    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.superRatio, MainGlobals.Scaling.superRatio);
    obj.position =  MainGlobals.Helpers.getNewPoint(0,0);
    obj.visible = false;
};

Super.prototype.initiateSuperSprites = function() {
    //TODO have a counter for this lol performa upgrade
    this.Properties.superPowerupTextures.push(
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("3 super powerup"),
        PIXI.Texture.fromFrame("3 super powerup"),
        PIXI.Texture.fromFrame("4 super powerup"),
        PIXI.Texture.fromFrame("5 super powerup"),
        PIXI.Texture.fromFrame("rainbowband 1start")
    );
    this.Properties.rainbowSuperTextures.push(
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down3a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband up1b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up3b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up1b")
    );

    this.setCurrentTextures(MainGlobals.Timing.rainbowChargeTime, this.Properties.superPowerupTextures);
    this.addChild(new PIXI.Sprite(this.Properties.currentTextures[this.Properties.spriteCount]));
};

Super.prototype.update = function(superObj) {
    if (this.Properties.currentTextures == this.Properties.rainbowSuperTextures) {
        this.setCurrentTextures(MainGlobals.Timing.rainbowChargeTime, this.Properties.superPowerupTextures);
        this.nextSprite(superObj);
        this.resetScaleAndPosition(superObj);
    }
};

Super.prototype.updatePowerUp = function(superObj) {
    if (!MainGlobals.PowerUp.characterDonePoweringUp && MainGlobals.PowerUp.powerUpActive) {
        this.updateSprites(superObj);
        this.characterJumpTiming();
        this.characterBoltTiming();
    } else if (this.Properties.currentTextures != this.Properties.rainbowSuperTextures) {
        this.setCurrentTextures(MainGlobals.Timing.rainbowTime, this.Properties.rainbowSuperTextures);
        this.getNewScaleForChild(superObj);
    } else {
        this.updateSprites(superObj);
    }
};

Super.prototype.updateSprites = function(superObj) {
    superObj.visible = true;
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(superObj);
    } else {
        this.Properties.changeSpriteCounter++;
    }
};

Super.prototype.nextSprite = function(superObj) {
    if (this.Properties.spriteCount == this.Properties.currentTextures.length - 1) {
        if(!MainGlobals.PowerUp.characterDonePoweringUp) {
            MainGlobals.PowerUp.characterDonePoweringUp = true;
        } else {
            this.Properties.spriteCount = 0;
            this.setSpriteToCurrentTexture(superObj);
        }
    } else {
        this.Properties.spriteCount++;
        this.setSpriteToCurrentTexture(superObj);
    }
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

Super.prototype.characterJumpTiming = function() {
    if (this.Properties.spriteCount == MainGlobals.PowerUp.superRiseSpriteIndex) {
        MainGlobals.PowerUp.characterRise = true;
    }
};

Super.prototype.characterBoltTiming = function() {
    if (this.Properties.spriteCount == MainGlobals.PowerUp.superBoltSpriteIndex) {
        MainGlobals.PowerUp.characterBolt = true;
    }
};

Super.prototype.resetScaleAndPosition = function(superObj) {
    superObj.visible = false;
    superObj.children[0].scale.x = 1;
    superObj.children[0].scale.y = 1;
};

Super.prototype.getNewScaleForChild = function(superObj) {
    var scale2 = MainGlobals.Helpers.getScreenRatioUsingHeight(superObj.height, MainGlobals.Scaling.superPercentOfScreen);
    superObj.children[0].scale = MainGlobals.Helpers.getNewPoint(scale2, scale2);
};