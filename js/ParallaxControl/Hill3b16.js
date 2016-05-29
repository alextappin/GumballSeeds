/**
 * Created by ajt on 5/3/2016.
 */
function Hill3b16() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("16 hill3b");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill3b16.constructor = Hill3b16;
Hill3b16.prototype = Object.create(PIXI.Container.prototype);

Hill3b16.prototype.setPositionAndScale = function(obj) {
    var scale = HelperFunctions().getCorrectScaleWidth(obj.width);
    obj.position = HelperFunctions().getNewPoint(MainGlobals.ScreenWidth, ScrollerGlobals.hill3bY);
    obj.scale = HelperFunctions().getNewPoint(scale, scale);
};

Hill3b16.prototype.update = function(obj, newViewportX, aObj) {
    if (obj.position.x <= 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj, aObj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * ScrollerGlobals.deltaXhill3); //distance traveled * change
    obj.viewportX = newViewportX;
};

Hill3b16.prototype.getNewPosition = function(obj, aObj) {
    obj.position.x = (aObj.position.x + aObj.width);
};