/**
 * Created by ajt on 5/2/2016.
 */
function Haze4() {
    var texture = PIXI.Texture.fromFrame("4 haze1");
    PIXI.extras.TilingSprite.call(this, texture, texture.width, texture.height);

    var scale = HelperFunctions().getCorrectScaleWidth(this.width);
    this.scale = HelperFunctions().getNewPoint(scale ,scale);
    this.position = HelperFunctions().getNewPoint(0,0);
    this.tilePosition = HelperFunctions().getNewPoint(0,0);
    this.viewportX = 0;
}

Haze4.constructor = Haze4;
Haze4.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Haze4.prototype.update = function(newViewportX) {
    this.tilePosition.x -= ((newViewportX - this.viewportX) * ScrollerGlobals.deltaX4); //distance traveled * change
    this.viewportX = newViewportX;
};