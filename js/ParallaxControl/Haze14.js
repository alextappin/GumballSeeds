/**
 * Created by ajt on 5/3/2016.
 */
function Haze14() {
    var texture = PIXI.Texture.fromFrame("14 haze3");
    PIXI.extras.TilingSprite.call(this, texture, texture.width, texture.height);

    var scale = MainGlobals.Helpers.getCorrectScaleWidth(this.width);
    this.scale = MainGlobals.Helpers.getNewPoint(scale ,scale);
    this.position = MainGlobals.Helpers.getNewPoint(0,MainGlobals.Scroller.haze14Y);
    this.tilePosition = MainGlobals.Helpers.getNewPoint(0,0);
    this.viewportX = 0;
}

Haze14.constructor = Haze14;
Haze14.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Haze14.prototype.update = function(newViewportX) {
    this.tilePosition.x -= ((newViewportX - this.viewportX) * MainGlobals.Scroller.deltaX14Haze); //distance traveled * change
    this.viewportX = newViewportX;
};