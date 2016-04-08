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
    this.StartButtonProperties = new StartButtonProperties();
    this.initiateStartButtonSprites();
};
StartButton.prototype.setPositionAndScale = function(obj) {
    obj.position = GameVariables.getNewPoint((GameVariables.getWidth() - obj.width)/2, (GameVariables.getHeight() - obj.height)/2);
    //obj.scale is not being use YET
};
StartButton.prototype.initiateStartButtonSprites = function() {
    this.StartButtonProperties.textures.push(
        PIXI.Texture.fromFrame("Start1"),
        PIXI.Texture.fromFrame("Start2")
    );
    this.StartButtonProperties.sprite = new PIXI.Sprite(this.StartButtonProperties.textures[this.StartButtonProperties.spriteCount]);
    this.handleClickEvents(this.StartButtonProperties.sprite);
    //add the child once
    this.addChild(this.StartButtonProperties.sprite);
};
StartButton.prototype.setSpriteToCurrentTexture = function() {
    this.StartButtonProperties.sprite.texture = this.StartButtonProperties.textures[this.StartButtonProperties.spriteCount];
};
StartButton.prototype.update = function(startButtonObj) {
    this.updateSprites();
};
StartButton.prototype.updateSprites = function() {
    if (this.StartButtonProperties.changeSpriteCounter == this.StartButtonProperties.spriteSpeed) {
        this.StartButtonProperties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.StartButtonProperties.changeSpriteCounter++;
    }
};
StartButton.prototype.nextSprite = function() {
    //TODO ternary this
    if (this.StartButtonProperties.spriteCount == 1) {
        this.StartButtonProperties.spriteCount = 0;
    }
    else {
        this.StartButtonProperties.spriteCount++;
    }
    //just change the texture
    this.setSpriteToCurrentTexture();
};
StartButton.prototype.handleClickEvents = function(spriteToHandle) {
    if (!spriteToHandle.interactive) {
        var spriteTimeout;
        function onButtonDown() {
            GameVariables.toggleScreenChange();
            GameVariables.setScreenGame();
            clearTimeout(spriteTimeout);
        }
        spriteToHandle.interactive = true;
        spriteToHandle.interactive = true;
        spriteToHandle
            .on('mousedown', onButtonDown)
            .on('touchstart', onButtonDown);
    }
};