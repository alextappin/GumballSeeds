/**
 * Created by ajt on 5/3/2016.
 */
function Haze11() {
    var texture = PIXI.Texture.fromFrame("11 haze2");
    PIXI.extras.TilingSprite.call(this, texture, texture.width, texture.height);

    var scale = MainGlobals.Helpers.getCorrectScaleWidth(this.width);
    this.scale = MainGlobals.Helpers.getNewPoint(scale ,scale);
    this.position = MainGlobals.Helpers.getNewPoint(0,MainGlobals.Scroller.haze11Y);
    this.tilePosition = MainGlobals.Helpers.getNewPoint(0,0);
    this.viewportX = 0;
}

Haze11.constructor = Haze11;
Haze11.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Haze11.prototype.update = function(newViewportX) {
    this.tilePosition.x -= ((newViewportX - this.viewportX) * MainGlobals.Scroller.deltaX11); //distance traveled * change
    this.viewportX = newViewportX;
};