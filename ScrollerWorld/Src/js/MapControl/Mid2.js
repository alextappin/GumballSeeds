/**
 * Created by ajt on 11/29/2015.
 */
function Mid2() {
    var texture = PIXI.Texture.fromImage("../resources/bg3.png");
    PIXI.extras.TilingSprite.call(this, texture, 1080, 720);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Mid2.constructor = Mid2;
Mid2.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid2.DELTA_X = 0.29;

Mid2.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid2.DELTA_X);
};