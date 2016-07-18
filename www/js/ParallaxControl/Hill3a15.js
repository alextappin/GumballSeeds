/**
 * Created by ajt on 5/3/2016.
 */
function Hill3a15() {
    PIXI.Container.call(this);
    this.textures = [
        PIXI.Texture.fromFrame("15a hill3a"),
        PIXI.Texture.fromFrame("15b hill3a")
    ];
    this.spriteCounter = 0;
    this.currentSprite = 0;
    var sprite = new PIXI.Sprite(this.textures[this.currentSprite]);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill3a15.constructor = Hill3a15;
Hill3a15.prototype = Object.create(PIXI.Container.prototype);

Hill3a15.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width);
    obj.position = MainGlobals.Helpers.getNewPoint(0, MainGlobals.Scroller.hill3aY);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale, scale);
};

Hill3a15.prototype.update = function(obj, newViewportX, bObj) {
    if (obj.position.x <= 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj, bObj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * MainGlobals.Scroller.deltaXhill3); //distance traveled * change
    obj.viewportX = newViewportX;

    if (obj.spriteCounter >= MainGlobals.Timing.mapWaterfallTime1) {
        obj.currentSprite = obj.currentSprite == 0 ? 1 : 0;
        obj.children[0].texture = obj.textures[obj.currentSprite];
        obj.spriteCounter = 0;
    }

    obj.spriteCounter++;
};

Hill3a15.prototype.getNewPosition = function(obj, bObj) {
    obj.position.x = (bObj.position.x + bObj.width);
};