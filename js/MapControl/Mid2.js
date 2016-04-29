/**
 * Created by ajt on 11/29/2015.
 */
function Mid2() {
    var texture = PIXI.Texture.fromImage("../resources/bg3.png");
    PIXI.extras.TilingSprite.call(this, texture, 1080, 720);

    this.position = HelperFunctions().getNewPoint(HelperFunctions().returnZero(), HelperFunctions().returnZero());
    this.tilePosition = HelperFunctions().getNewPoint(HelperFunctions().returnZero(), HelperFunctions().returnZero());
    this.viewportX = 0;
}

Mid2.constructor = Mid2;
Mid2.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid2.prototype.update = function(newViewportX) {
    this.viewportX = newViewportX;
    this.tilePosition.x -= ((newViewportX - this.viewportX) * MapGlobals.mid2DeltaX); //distance traveled * change
};