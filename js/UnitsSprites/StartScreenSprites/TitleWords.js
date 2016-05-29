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
    MainGlobals.Scaling.titleWordsScaleX = HelperFunctions().getCorrectScaleWidth(obj.width);
    MainGlobals.Scaling.titleWordsScaleY = HelperFunctions().getCorrectScaleHeight(obj.height);
    obj.scale = HelperFunctions().getNewPoint(MainGlobals.Scaling.titleWordsScaleX,MainGlobals.Scaling.titleWordsScaleY);
    obj.position =  HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), HelperFunctions().getScreenPositionMiddleHeight(obj.height));
    obj.alpha = MainGlobals.Timing.titleAlphaStart;
};

TitleWords.prototype.initiateTitleWordsSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("titleWords")
    );
    this.addChild(new PIXI.Sprite(this.Properties.textures[0]));
};

TitleWords.prototype.update = function(titleWordsObj) {
    if (titleWordsObj.alpha + MainGlobals.Timing.titleWordsAlphaIncrement > 1) {
        titleWordsObj.alpha = 1;
    } else {
        titleWordsObj.alpha += MainGlobals.Timing.titleWordsAlphaIncrement;
    }
};

TitleWords.prototype.hideWords = function(titleWordsObj) {
    titleWordsObj.alpha = 0;
};