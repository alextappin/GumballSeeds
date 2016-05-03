/**
 * Created by ajt on 5/3/2016.
 */
function Hill1b10() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("10 hill1b");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill1b10.constructor = Hill1b10;
Hill1b10.prototype = Object.create(PIXI.Container.prototype);

Hill1b10.prototype.setPositionAndScale = function(obj) {
    var scale = HelperFunctions().getCorrectScaleWidth(obj.width);
    obj.position = HelperFunctions().getNewPoint(MapGlobals.screenWidth, ScrollerGlobals.hill1bY);
    obj.scale = HelperFunctions().getNewPoint(scale, scale);
};

Hill1b10.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * ScrollerGlobals.deltaX10); //distance traveled * change
    obj.viewportX = newViewportX;
};

Hill1b10.prototype.getNewPosition = function(obj) {
    obj.position.x = (MapGlobals.screenWidth);
};