/**
 * Created by ajt on 5/3/2016.
 */
function Hill1a9() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("9 hill1a");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill1a9.constructor = Hill1a9;
Hill1a9.prototype = Object.create(PIXI.Container.prototype);

Hill1a9.prototype.setPositionAndScale = function(obj) {
    var scale = HelperFunctions().getCorrectScaleWidth(obj.width);
    obj.position = HelperFunctions().getNewPoint(0, ScrollerGlobals.hill1aY);
    obj.scale = HelperFunctions().getNewPoint(scale, scale);
};

Hill1a9.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * ScrollerGlobals.deltaXhill1); //distance traveled * change
    obj.viewportX = newViewportX;
};

Hill1a9.prototype.getNewPosition = function(obj) {
    obj.position.x = (MapGlobals.screenWidth - 1);
};