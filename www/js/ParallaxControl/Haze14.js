/**
 * Created by ajt on 5/3/2016.
 */
function Haze14() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("14 haze3");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Haze14.constructor = Haze14;
Haze14.prototype = Object.create(PIXI.Container.prototype);

Haze14.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width/2);
    this.scale = MainGlobals.Helpers.getNewPoint(scale ,scale);
    this.position = MainGlobals.Helpers.getNewPoint(0,MainGlobals.Scroller.haze14Y);
};

Haze14.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width/2) {
        obj.position.x = 0;
    }
    obj.position.x -= ((newViewportX - this.viewportX) * MainGlobals.Scroller.deltaX14Haze); //distance traveled * change
    obj.viewportX = newViewportX;
};