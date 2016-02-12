/**
 * Created by ajt on 11/29/2015.
 */
function Far() {
    //var texture = PIXI.Texture.fromImage("../resources/bg-far.png");
    var texture = PIXI.Texture.fromImage("../resources/bg1.png");
    PIXI.extras.TilingSprite.call(this, texture, 1080, 720);

    this.position.x=0;
    this.position.y=0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Far.constructor = Far;
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.DELTA_X = 0.014;

Far.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};