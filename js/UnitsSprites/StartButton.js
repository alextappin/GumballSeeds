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
    obj.position = HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), HelperFunctions().getScreenPositionMiddleHeight(obj.height));
    obj.alpha = this.Properties.alphaStart;
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
StartButton.prototype.update = function(startButtonObj) {
    if (TimingGlobals.startButtonPressed) {
        this.updateSprites(startButtonObj);
    } else {
        this.updateOpacity(startButtonObj);
    }
};

StartButton.prototype.updateOpacity = function(startButtonObj) {
    if (startButtonObj.alpha + this.Properties.alphaIncrement > 1) {
        this.Properties.alphaIncrement = 0 - this.Properties.alphaIncrement;
    } else if (startButtonObj.alpha + this.Properties.alphaIncrement < 0.01) {
        this.Properties.alphaIncrement = 0 - this.Properties.alphaIncrement;
    }
    startButtonObj.alpha += this.Properties.alphaIncrement;
};

StartButton.prototype.updateSprites = function(startButtonObj) {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(startButtonObj);
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
StartButton.prototype.nextSprite = function(startButtonObj) {
    //TODO ternary this
    if (this.Properties.spriteCount == 0) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    //just change the texture
    this.setSpriteToCurrentTexture(startButtonObj);
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