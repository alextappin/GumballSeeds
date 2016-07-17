/**
 * Created by ajt on 5/3/2016.
 */
function Haze11() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("11 haze2");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Haze11.constructor = Haze11;
Haze11.prototype = Object.create(PIXI.Container.prototype);

Haze11.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width/2);
    obj.position = MainGlobals.Helpers.getNewPoint(0,0);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale, scale);
};

Haze11.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width/2) { //if its all the way off the left side of the screen, get new position
        obj.position.x = 0;
    }
    obj.position.x -= ((newViewportX - this.viewportX) * MainGlobals.Scroller.deltaX11); //distance traveled * change
    obj.viewportX = newViewportX;
};