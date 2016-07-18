/**
 * Created by ajt on 5/2/2016.
 */
function Haze4() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("4 haze1");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Haze4.constructor = Haze4;
Haze4.prototype = Object.create(PIXI.Container.prototype);

Haze4.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width/2); //make it twice as long
    obj.position = MainGlobals.Helpers.getNewPoint(0,0);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale, scale);
};

Haze4.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width/2) { //set the position back. Does basicall ythe same as tiling sprites wrap around...
        obj.position.x = 0;
    }
    obj.position.x -= ((newViewportX - this.viewportX) * MainGlobals.Scroller.deltaX4); //distance traveled * change
    obj.viewportX = newViewportX;
};