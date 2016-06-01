/**
 * Created by ajt on 5/2/2016.
 */
function BgSky1() {
    var texture = PIXI.Texture.fromFrame("1 BGsky");
    PIXI.extras.TilingSprite.call(this, texture, texture.width, texture.height);

    var scale = MainGlobals.Helpers.getCorrectScaleWidth(this.width);
    this.scale = MainGlobals.Helpers.getNewPoint(scale ,scale);
    this.position = MainGlobals.Helpers.getNewPoint(0,0);
    this.tilePosition = MainGlobals.Helpers.getNewPoint(0,0);
    this.viewportX = 0;
}

BgSky1.constructor = BgSky1;
BgSky1.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

BgSky1.prototype.update = function(newViewportX) {
    this.tilePosition.x -= ((newViewportX - this.viewportX) * MainGlobals.Scroller.deltaX1); //distance traveled * change
    this.viewportX = newViewportX;
};