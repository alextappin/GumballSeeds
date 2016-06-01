/**
 * Created by ajt on 5/3/2016.
 */
function Hill2a12() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("12 hill2a");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Hill2a12.constructor = Hill2a12;
Hill2a12.prototype = Object.create(PIXI.Container.prototype);

Hill2a12.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width);
    obj.position = MainGlobals.Helpers.getNewPoint(0, MainGlobals.Scroller.hill2aY);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale, scale);
};

Hill2a12.prototype.update = function(obj, newViewportX, bObj) {
    if (obj.position.x <= 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj, bObj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * MainGlobals.Scroller.deltaXhill2); //distance traveled * change
    obj.viewportX = newViewportX;
};

Hill2a12.prototype.getNewPosition = function(obj, bObj) {
    obj.position.x = (bObj.position.x + bObj.width);
};