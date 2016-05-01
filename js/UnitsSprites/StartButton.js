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
    ScalingGlobals.startButton1Ratio = HelperFunctions().getRatioToScreenGivenConst(ScalingGlobals.startButton1Const, obj.height, obj.width);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.startButton1Ratio,ScalingGlobals.startButton1Ratio);
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
        startButtonObj.alpha -= TimingGlobals.titleAlphaIncrement;
        if (startButtonObj.alpha < TimingGlobals.titlePulseMinimumAlpha) {
            this.Properties.alphaPulse = false;
        }
    } else { //pulse up to brightness
        if (startButtonObj.alpha + TimingGlobals.titleAlphaIncrement > 1) {
            this.Properties.alphaPulse = true;
        } else {
            startButtonObj.alpha += TimingGlobals.titleAlphaIncrement;
        }
    }
};

StartButton.prototype.handleClickEvents = function(spriteToHandle) {
    if (!spriteToHandle.interactive) {
        var spriteTimeout;
        function onButtonDown() {
            HelperFunctions().switchScreenToggle();
            TimingGlobals.startButtonPressed = true;
            MapGlobals.screenToShow = MapGlobals.gameString;
            clearTimeout(spriteTimeout);
        }
        spriteToHandle.interactive = true;
        spriteToHandle.interactive = true;
        spriteToHandle
            .on('mousedown', onButtonDown)
            .on('touchstart', onButtonDown);
    }
};