/**
 * Created by ajt on 3/11/2016.
 */
function StartButton() {
    PIXI.Container.call(this);
    this.constructStartButton();
}

StartButton.constructor = StartButton;
StartButton.prototype = Object.create(PIXI.Container.prototype);

StartButton.prototype.constructStartButton = function() {
    this.Properties = new StartButtonProperties();
    this.initiateStartButtonSprites();
};
StartButton.prototype.setPositionAndScale = function(obj) {
    ScalingGlobals.startButtonRatios[this.Properties.spriteCount] = HelperFunctions().getScreenRatioUsingHeight(obj.height,ScalingGlobals.startButtonsPercentOfScreen[this.Properties.spriteCount]); //access array and grab correct ratios out of array
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.startButtonRatios[this.Properties.spriteCount],ScalingGlobals.startButtonRatios[this.Properties.spriteCount]);
    obj.position = HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), HelperFunctions().getHeightGivenConstant(ScalingGlobals.titleStartYOffset, obj.height));
    obj.alpha = TimingGlobals.titleAlphaStart;
};
StartButton.prototype.initiateStartButtonSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("startbutton1"),
        PIXI.Texture.fromFrame("startbutton2"),
        PIXI.Texture.fromFrame("startbutton3"),
        PIXI.Texture.fromFrame("startbutton4")
    );
    var sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.handleClickEvents(sprite);
    this.addChild(sprite);
};
StartButton.prototype.setSpriteToCurrentTexture = function(startButtonObj) {
    startButtonObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};

StartButton.prototype.updateOpacity = function(startButtonObj) {
    if (this.Properties.alphaPulse) { //if it needs to pulse down
        startButtonObj.alpha -= TimingGlobals.titleStartAlphaIncrement;
        if (startButtonObj.alpha < TimingGlobals.titlePulseMinimumAlpha) {
            this.Properties.alphaPulse = false;
        }
    } else { //pulse up to brightness
        if (startButtonObj.alpha + TimingGlobals.titleStartAlphaIncrement > 1) {
            this.Properties.alphaPulse = true;
        } else {
            startButtonObj.alpha += TimingGlobals.titleStartAlphaIncrement;
        }
    }
};

StartButton.prototype.updateClickedStartTextures = function(startButtonObj) {
    if (this.Properties.spriteCount < this.Properties.textures.length - 1) {
        if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
            this.Properties.spriteCount++;
            this.Properties.changeSpriteCounter = 0;
            this.nextClickedStartSprite(startButtonObj);
        } else {
            this.Properties.changeSpriteCounter++;
        }
    }
    else {
        startButtonObj.alpha = 0;
    }
};

StartButton.prototype.nextClickedStartSprite = function(startButtonObj) {
    startButtonObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
    ScalingGlobals.startButtonRatios[this.Properties.spriteCount] = HelperFunctions().getScreenRatioUsingHeight(startButtonObj.height,ScalingGlobals.startButtonsPercentOfScreen[this.Properties.spriteCount]); //access array and grab correct ratios out of array
    startButtonObj.scale = HelperFunctions().getNewPoint(ScalingGlobals.startButtonRatios[this.Properties.spriteCount],ScalingGlobals.startButtonRatios[this.Properties.spriteCount]);
    startButtonObj.position = HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(startButtonObj.width), HelperFunctions().getHeightGivenConstant(ScalingGlobals.titleStartYOffset, startButtonObj.height));
    startButtonObj.alpha = 1;
};

StartButton.prototype.hideStart = function(startButtonObj) {
    startButtonObj.alpha = 0;
};

StartButton.prototype.handleClickEvents = function(spriteToHandle) {
    if (!spriteToHandle.interactive) {
        var spriteTimeout;
        function onButtonDown() {
            TimingGlobals.startButtonPressed = true;
            clearTimeout(spriteTimeout);
        }
        spriteToHandle.interactive = true;
        spriteToHandle.interactive = true;
        spriteToHandle
            .on('mousedown', onButtonDown)
            .on('touchstart', onButtonDown);
    }
};