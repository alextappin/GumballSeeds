/**
 * Created by ajt on 5/3/2016.
 */
function Hill2b13() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("13 hill2b");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill2b13.constructor = Hill2b13;
Hill2b13.prototype = Object.create(PIXI.Container.prototype);

Hill2b13.prototype.setPositionAndScale = function(obj) {
    var scale = HelperFunctions().getCorrectScaleWidth(obj.width);
    obj.position = HelperFunctions().getNewPoint(MapGlobals.screenWidth, ScrollerGlobals.hill2bY);
    obj.scale = HelperFunctions().getNewPoint(scale, scale);
};

Hill2b13.prototype.update = function(obj, newViewportX, aObj) {
    if (obj.position.x <= 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj, aObj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * ScrollerGlobals.deltaXhill2); //distance traveled * change
    obj.viewportX = newViewportX;
};

Hill2b13.prototype.getNewPosition = function(obj, aObj) {
    obj.position.x = (aObj.position.x + aObj.width);
};