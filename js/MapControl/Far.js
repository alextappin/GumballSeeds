/**
 * Created by ajt on 11/29/2015.
 */
function Far() {
    var texture = PIXI.Texture.fromImage("../resources/bg1.png");
    PIXI.extras.TilingSprite.call(this, texture, MapGlobals.screenWidth, MapGlobals.screenHeight);

    this.position = HelperFunctions().getNewPoint(HelperFunctions().returnZero(), HelperFunctions().returnZero());
    this.tilePosition = HelperFunctions().getNewPoint(HelperFunctions().returnZero(), HelperFunctions().returnZero());
    this.viewportX = 0;
}

Far.constructor = Far;
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function(newViewportX) {
    this.viewportX = newViewportX;
    this.tilePosition.x -= ((newViewportX - this.viewportX) * MapGlobals.farDeltaX); //distance traveled * change
};