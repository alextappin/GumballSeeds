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
    obj.scale = HelperFunctions.getNewPoint(.8,.8);
    obj.position =  HelperFunctions.getNewPoint((MapGlobals.screenWidth - obj.width)/2, (MapGlobals.screenHeight - obj.height)/2);
    //no scale yet...
};
LoadImage.prototype.initiateLoadImageSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("loadScreen")
    );
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
LoadImage.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
LoadImage.prototype.update = function(imageObj) {
    //this.updateSprites();
};
LoadImage.prototype.updateSprites = function() {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
LoadImage.prototype.nextSprite = function() {
    if (this.Properties.spriteCount == 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};