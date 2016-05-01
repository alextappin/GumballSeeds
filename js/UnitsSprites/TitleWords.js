/**
 * Created by ajt on 5/1/2016.
 */
function TitleWords() {
    PIXI.Container.call(this);
    this.constructTitleWords();
}

TitleWords.constructor = TitleWords;
TitleWords.prototype = Object.create(PIXI.Container.prototype);

TitleWords.prototype.constructTitleWords = function() {
    this.Properties = new TitleWordsProperties();
    this.initiateTitleWordsSprites();
};

TitleWords.prototype.setPositionAndScale = function(obj) {
    ScalingGlobals.titleWordsScaleX = HelperFunctions().getCorrectScaleWidth(obj.width);
    ScalingGlobals.titleWordsScaleY = HelperFunctions().getCorrectScaleHeight(obj.height);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.titleWordsScaleX,ScalingGlobals.titleWordsScaleY);
    obj.position =  HelperFunctions().getNewPoint((MapGlobals.screenWidth - obj.width)/2, (MapGlobals.screenHeight - obj.height)/2);
    obj.alpha = TimingGlobals.titleAlphaStart;
};

TitleWords.prototype.initiateTitleWordsSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("title")
    );
    this.addChild(new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]));
};

TitleWords.prototype.setSpriteToCurrentTexture = function(titleBoardObj) {
    titleBoardObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};

TitleWords.prototype.update = function(titleBoardObj) {
    if (titleBoardObj.alpha + TimingGlobals.titleAlphaIncrement > 1) {
        titleBoardObj.alpha = 1;
    } else {
        titleBoardObj.alpha += TimingGlobals.titleAlphaIncrement;
    }
};