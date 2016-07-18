/**
 * Created by ajt on 5/3/2016.
 */
function Hill3b16() {
    PIXI.Container.call(this);
    this.textures = [
        PIXI.Texture.fromFrame("16a hill3b"),
        PIXI.Texture.fromFrame("16b hill3b")
    ];
    this.spriteCounter = 0;
    this.currentSprite = 0;
    var sprite = new PIXI.Sprite(this.textures[this.currentSprite]);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill3b16.constructor = Hill3b16;
Hill3b16.prototype = Object.create(PIXI.Container.prototype);

Hill3b16.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width);
    obj.position = MainGlobals.Helpers.getNewPoint(MainGlobals.ScreenWidth, MainGlobals.Scroller.hill3bY);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale, scale);
};

Hill3b16.prototype.update = function(obj, newViewportX, aObj) {
    if (obj.position.x <= 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj, aObj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * MainGlobals.Scroller.deltaXhill3); //distance traveled * change
    obj.viewportX = newViewportX;

    if (obj.spriteCounter >= MainGlobals.Timing.mapWaterfallTime2) {
        obj.currentSprite = obj.currentSprite == 0 ? 1 : 0;
        obj.children[0].texture = obj.textures[obj.currentSprite];
        obj.spriteCounter = 0;
    }

    obj.spriteCounter++;
};

Hill3b16.prototype.getNewPosition = function(obj, aObj) {
    obj.position.x = (aObj.position.x + aObj.width);
};