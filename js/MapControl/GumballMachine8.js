/**
 * Created by ajt on 5/3/2016.
 */
function GumballMachine8() {
    var texture = PIXI.Texture.fromFrame("8 gumballmachine");
    PIXI.extras.TilingSprite.call(this, texture, texture.width, texture.height);

    var scale = HelperFunctions().getCorrectScaleWidth(this.width);
    this.scale = HelperFunctions().getNewPoint(scale ,scale);
    this.position = HelperFunctions().getNewPoint(0,0);
    this.tilePosition = HelperFunctions().getNewPoint(0,0);
    this.viewportX = 0;
}

GumballMachine8.constructor = GumballMachine8;
GumballMachine8.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

GumballMachine8.prototype.update = function(newViewportX) {
    this.tilePosition.x -= ((newViewportX - this.viewportX) * ScrollerGlobals.deltaX8); //distance traveled * change
    this.viewportX = newViewportX;
};