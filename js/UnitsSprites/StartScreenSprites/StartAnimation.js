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
    ScalingGlobals.titleScreenScaleX = HelperFunctions().getCorrectScaleWidth(obj.width);
    ScalingGlobals.titleScreenScaleY = HelperFunctions().getCorrectScaleHeight(obj.height);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.titleScreenScaleX,ScalingGlobals.titleScreenScaleY);
    obj.position =  HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), HelperFunctions().getScreenPositionMiddleHeight(obj.height));
    obj.alpha = TimingGlobals.titleAlphaStart;
};

StartAnimation.prototype.initiateStartAnimationSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("titleBG")
    );
    this.addChild(new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]));
};

StartAnimation.prototype.setSpriteToCurrentTexture = function(titleBoardObj) {
    titleBoardObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};

StartAnimation.prototype.update = function(titleBoardObj) {
    if (titleBoardObj.alpha + TimingGlobals.titleBgAlphaIncrement > 1) {
        titleBoardObj.alpha = 1;
    } else {
        titleBoardObj.alpha += TimingGlobals.titleBgAlphaIncrement;
    }
};