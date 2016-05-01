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
    ScalingGlobals.titleScreenScaleX = HelperFunctions().getCorrectScaleWidth(obj.width);
    ScalingGlobals.titleScreenScaleY = HelperFunctions().getCorrectScaleHeight(obj.height);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.titleScreenScaleX,ScalingGlobals.titleScreenScaleY);
    obj.position =  HelperFunctions().getNewPoint((MapGlobals.screenWidth - obj.width)/2, (MapGlobals.screenHeight - obj.height)/2);
};
TitleBoard.prototype.initiateTitleBoardSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("titleBG")
    );
    this.addChild(new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]));
};
TitleBoard.prototype.setSpriteToCurrentTexture = function(titleBoardObj) {
    titleBoardObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};
TitleBoard.prototype.update = function(titleBoardObj) {
    this.updateSprites(titleBoardObj);
};
TitleBoard.prototype.updateSprites = function(titleBoardObj) {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(titleBoardObj);
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
TitleBoard.prototype.nextSprite = function(titleBoardObj) {
    if (this.Properties.spriteCount == this.Properties.numberOfTextures - 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture(titleBoardObj);
};