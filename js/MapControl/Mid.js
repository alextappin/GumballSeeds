/**
 * Created by ajt on 11/29/2015.
 */
function Mid() {
    var texture = PIXI.Texture.fromImage("../resources/test2.png");
    PIXI.extras.TilingSprite.call(this, texture, MapGlobals.screenWidth, MapGlobals.screenHeight);

    this.position = HelperFunctions().getNewPoint(HelperFunctions().returnZero(), HelperFunctions().returnZero());
    this.tilePosition = HelperFunctions().getNewPoint(HelperFunctions().returnZero(), HelperFunctions().returnZero());
    this.viewportX = 0;
}

Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function(newViewportX) {
    this.viewportX = newViewportX;
    this.tilePosition.x -= ((newViewportX - this.viewportX) * ScrollerGlobals.midDeltaX); //distance traveled * change
};