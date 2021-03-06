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
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width);
    obj.position = MainGlobals.Helpers.getNewPoint(0, MainGlobals.Scroller.hill1aY);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale, scale);
};

Hill1a9.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * MainGlobals.Scroller.deltaXhill1); //distance traveled * change
    obj.viewportX = newViewportX;
};

Hill1a9.prototype.getNewPosition = function(obj) {
    obj.position.x = (MainGlobals.ScreenWidth - 1);
};