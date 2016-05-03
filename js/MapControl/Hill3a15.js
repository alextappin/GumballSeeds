/**
 * Created by ajt on 5/3/2016.
 */
function Hill3a15() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("15 hill3a");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill3a15.constructor = Hill3a15;
Hill3a15.prototype = Object.create(PIXI.Container.prototype);

Hill3a15.prototype.setPositionAndScale = function(obj) {
    var scale = HelperFunctions().getCorrectScaleWidth(obj.width);
    obj.position = HelperFunctions().getNewPoint(0, ScrollerGlobals.hill3aY);
    obj.scale = HelperFunctions().getNewPoint(scale, scale);
};

Hill3a15.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * ScrollerGlobals.deltaX15); //distance traveled * change
    obj.viewportX = newViewportX;
};

Hill3a15.prototype.getNewPosition = function(obj) {
    obj.position.x = (MapGlobals.screenWidth - 2);
};