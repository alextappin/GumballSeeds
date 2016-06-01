/**
 * Created by ajt on 3/11/2016.
 */
function TitleBoard() {
    PIXI.Container.call(this);
    this.constructTitleBoard();
}

TitleBoard.constructor = TitleBoard;
TitleBoard.prototype = Object.create(PIXI.Container.prototype);

TitleBoard.prototype.constructTitleBoard = function() {
    this.Properties = new TitleBoardProperties();
    this.initiateTitleBoardSprites();
};

TitleBoard.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.titleScreenScale = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.titleScreenPercent);
    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.titleScreenScale,MainGlobals.Scaling.titleScreenScale);
    obj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.Helpers.getScreenPositionMiddleWidth(obj.width), MainGlobals.Helpers.getScreenPositionMiddleHeight(obj.height));
    obj.alpha = MainGlobals.Timing.titleAlphaStart;
};

TitleBoard.prototype.initiateTitleBoardSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("titleBG"),
        PIXI.Texture.fromFrame("startrainbowanimation3")
    );
    this.addChild(new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]));
};

TitleBoard.prototype.setSpriteToCurrentTexture = function(titleBoardObj) {
    titleBoardObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};

TitleBoard.prototype.update = function(titleBoardObj) {
    if (titleBoardObj.alpha + MainGlobals.Timing.titleBgAlphaIncrement > 1) {
        titleBoardObj.alpha = 1;
    } else {
        titleBoardObj.alpha += MainGlobals.Timing.titleBgAlphaIncrement;
    }
};

TitleBoard.prototype.switchToWhiteBackground = function(titleBoardObj) {
    if (titleBoardObj.children[0].texture != this.Properties.textures[this.Properties.whiteBoardTextureNumber]) //if its not already set
        titleBoardObj.children[0].texture = this.Properties.textures[this.Properties.whiteBoardTextureNumber];
};