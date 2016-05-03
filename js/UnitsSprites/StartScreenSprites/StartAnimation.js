/**
 * Created by ajt on 5/2/2016.
 */
function StartAnimation() {
    PIXI.Container.call(this);
    this.constructStartAnimation();
}

StartAnimation.constructor = StartAnimation;
StartAnimation.prototype = Object.create(PIXI.Container.prototype);

StartAnimation.prototype.constructStartAnimation = function() {
    this.Properties = new StartAnimationProperties();
    this.initiateStartAnimationSprites();
};

StartAnimation.prototype.setPositionAndScale = function(obj) {
    ScalingGlobals.startAnimationRatio = HelperFunctions().getScreenRatioUsingHeight(obj.height);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.startAnimationRatio,ScalingGlobals.startAnimationRatio);
    obj.position =  HelperFunctions().getNewPoint((0-obj.width*1.5), HelperFunctions().getScreenPositionMiddleHeight(obj.height));
    obj.alpha = 1;
};

StartAnimation.prototype.initiateStartAnimationSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("startrainbowanimation1"),
        PIXI.Texture.fromFrame("startrainbowanimation2")
    );
    this.addChild(new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]));
};

StartAnimation.prototype.setSpriteToCurrentTexture = function(titleBoardObj) {
    titleBoardObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};

StartAnimation.prototype.update = function(startAnimationObj) {
    this.updateTextures(startAnimationObj);
};

StartAnimation.prototype.updateTextures = function(startAnimationObj) {
    startAnimationObj.position.x += this.Properties.moveSpeed;
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(startAnimationObj);
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};

StartAnimation.prototype.nextSprite = function(startAnimationObj) {
    if (this.Properties.spriteCount == this.Properties.textures.length - 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture(startAnimationObj);
};