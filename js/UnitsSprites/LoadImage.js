/**
 * Created by ajt on 4/27/2016.
 */
function LoadImage() {
    PIXI.Container.call(this);
    this.constructLoadImage();
}

LoadImage.constructor = LoadImage;
LoadImage.prototype = Object.create(PIXI.Container.prototype);

LoadImage.prototype.constructLoadImage = function() {
    this.Properties = new LoadImageProperties();
    this.initiateLoadImageSprites();
};
LoadImage.prototype.setPositionAndScale = function(obj) {
    obj.scale = HelperFunctions().getNewPoint(.8,.8);
    obj.position =  HelperFunctions().getNewPoint((MapGlobals.screenWidth - obj.width)/2, (MapGlobals.screenHeight - obj.height)/2);
    obj.alpha = this.Properties.alphaStart;
    //no scale yet...
};
LoadImage.prototype.initiateLoadImageSprites = function() {
    this.Properties.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame("loadScreen"));
    this.addChild(this.Properties.sprite);
};
LoadImage.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
LoadImage.prototype.update = function(imageObj) {
    this.updateSprites(imageObj);
};
LoadImage.prototype.updateSprites = function(imageObj) {
    if (imageObj.alpha + this.Properties.alphaIncrement > 1) {
        this.Properties.alphaIncrement = 0 - this.Properties.alphaIncrement;
    }

    imageObj.alpha += this.Properties.alphaIncrement;

    if (MapGlobals.soundLoaded && imageObj.alpha < this.Properties.alphaStart) {
        MapGlobals.screenToShow = "Title";
        MapGlobals.switchScreen = !MapGlobals.switchScreen;
    }

};