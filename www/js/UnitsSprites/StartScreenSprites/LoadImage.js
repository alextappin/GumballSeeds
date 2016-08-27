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
    this.Properties.textures = [];
    this.Properties.testCount = 0;
    this.initiateLoadImageSprites();
};
LoadImage.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.loadScale = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.loadPercent);

    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.loadScale,MainGlobals.Scaling.loadScale);
    obj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.Helpers.getScreenPositionMiddleWidth(obj.width)+MainGlobals.ScreenWidth/obj.width, MainGlobals.Helpers.getScreenPositionMiddleHeight(obj.height));
    obj.alpha = this.Properties.alphaStart;
    //no scale yet...
};
LoadImage.prototype.initiateLoadImageSprites = function() {
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("loadscreen")));

    //load all the lagging sprites into the texture cache by using them!
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("loadscreen")));
    this.children[1].scale = MainGlobals.Helpers.getNewPoint(0,0);

    this.Properties.textures.push(
        PIXI.Texture.fromFrame("titleBG"),
        PIXI.Texture.fromFrame("title"),
        PIXI.Texture.fromFrame("startbutton1"),
        PIXI.Texture.fromFrame("startbutton2"),
        PIXI.Texture.fromFrame("startbutton3"),
        PIXI.Texture.fromFrame("startbutton4"),
        PIXI.Texture.fromFrame("startrainbowanimation1"),
        PIXI.Texture.fromFrame("startrainbowanimation2"),
        PIXI.Texture.fromFrame("gbs run1"),
        PIXI.Texture.fromFrame("gbs run2"),
        PIXI.Texture.fromFrame("gbs run3"),
        PIXI.Texture.fromFrame("gbs a1"),
        PIXI.Texture.fromFrame("gbs a2"),
        PIXI.Texture.fromFrame("gbs a1"),
        PIXI.Texture.fromFrame("gbs j1"),
        PIXI.Texture.fromFrame("gbs j2"),
        PIXI.Texture.fromFrame("gbs j3"),
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7"),
        PIXI.Texture.fromFrame("gbs ja1"),
        PIXI.Texture.fromFrame("gbs ja2"),
        PIXI.Texture.fromFrame("gbs ja3"),
        PIXI.Texture.fromFrame("gbs ja4"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("3 super powerup"),
        PIXI.Texture.fromFrame("4 super powerup"),
        PIXI.Texture.fromFrame("5 super powerup"),
        PIXI.Texture.fromFrame("rainbowband 1start"),
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband down1b"),
        PIXI.Texture.fromFrame("rainbowband down2a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down3a"),
        PIXI.Texture.fromFrame("rainbowband down3b"),
        PIXI.Texture.fromFrame("rainbowband up1a"),
        PIXI.Texture.fromFrame("rainbowband up1b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up2b"),
        PIXI.Texture.fromFrame("rainbowband up3a"),
        PIXI.Texture.fromFrame("rainbowband up3b"),
        PIXI.Texture.fromFrame("superbarBG"),
        PIXI.Texture.fromFrame("superbar1"),
        PIXI.Texture.fromFrame("superbar9"),
        PIXI.Texture.fromFrame("ts death1"),
        PIXI.Texture.fromFrame("ts death2"),
        PIXI.Texture.fromFrame("ts death3"),
        PIXI.Texture.fromFrame("ts death4"),
        PIXI.Texture.fromFrame("ts death5"),
        PIXI.Texture.fromFrame("ts flying1"),
        PIXI.Texture.fromFrame("ts flying2")
    );
};
LoadImage.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
LoadImage.prototype.update = function(imageObj) {
    this.updateSprites(imageObj);
};
LoadImage.prototype.updateSprites = function(imageObj) {
    if (imageObj.position.x < -100) { //black screen scene to fix scaling issues.
        MainGlobals.Helpers.switchToLoad();
        MainGlobals.Helpers.switchScreenToggle();
        return;
    }
    if (imageObj.Properties.testCount < imageObj.Properties.textures.length) {
        imageObj.children[1].texture = imageObj.Properties.textures[imageObj.Properties.testCount];
        imageObj.Properties.testCount++;
        imageObj.alpha += this.Properties.alphaIncrement/5;
    } else {
        if (imageObj.alpha + this.Properties.alphaIncrement > 1) {
            this.Properties.alphaIncrement = 0 - this.Properties.alphaIncrement;
        }

        imageObj.alpha += this.Properties.alphaIncrement;

        if (MainGlobals.Map.soundLoaded && imageObj.alpha < this.Properties.alphaStart) {
            MainGlobals.Helpers.switchToTitle();
            MainGlobals.Helpers.switchScreenToggle();
        }
    }
};