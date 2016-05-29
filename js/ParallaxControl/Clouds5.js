/**
 * Created by ajt on 5/2/2016.
 */
function Clouds5() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("6 cloud2");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Clouds5.constructor = Clouds5;
Clouds5.prototype = Object.create(PIXI.Container.prototype);

Clouds5.prototype.setPositionAndScale = function(obj) {
    obj.position = HelperFunctions().getNewPoint(MainGlobals.ScreenWidth/2, HelperFunctions().getRandomNumber(MainGlobals.Scroller.cloudRandomYStart, MainGlobals.Scroller.cloudRandomYEnd));
    this.setScale(obj);
};

Clouds5.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPositionsAndScale(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * MainGlobals.Scroller.deltaX5); //distance traveled * change
    obj.viewportX = newViewportX;
};

Clouds5.prototype.getNewPositionsAndScale = function(obj) {
    var randY = HelperFunctions().getRandomNumber(MainGlobals.Scroller.cloudRandomYStart, MainGlobals.Scroller.cloudRandomYEnd);
    obj.position = HelperFunctions().getNewPoint(MainGlobals.ScreenWidth + obj.width, randY);
    this.setScale(obj);
};

Clouds5.prototype.setScale = function(obj) {
    var scale = HelperFunctions().calculateCloudScale(obj.position.y);
    obj.scale = HelperFunctions().getNewPoint(scale,scale);
};