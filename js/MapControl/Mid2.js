/**
 * Created by ajt on 11/29/2015.
 */
function Mid2() {
    var texture = PIXI.Texture.fromImage("../resources/bg3.png");
    PIXI.extras.TilingSprite.call(this, texture, MapGlobals.screenWidth, MapGlobals.screenHeight);

    this.position = HelperFunctions().getNewPoint(0,0);
    this.tilePosition = HelperFunctions().getNewPoint(0,0);
    this.viewportX = 0;
}

Mid2.constructor = Mid2;
Mid2.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid2.prototype.update = function(newViewportX) {
    this.tilePosition.x -= ((newViewportX - this.viewportX) * ScrollerGlobals.mid2DeltaX); //distance traveled * change
    this.viewportX = newViewportX;
};