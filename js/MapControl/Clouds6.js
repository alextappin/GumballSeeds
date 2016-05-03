/**
 * Created by ajt on 5/2/2016.
 */
function Clouds6() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("6 cloud2");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Clouds6.constructor = Clouds6;
Clouds6.prototype = Object.create(PIXI.Container.prototype);

Clouds6.prototype.setPositionAndScale = function(obj) {
    obj.position = HelperFunctions().getNewPoint(MapGlobals.screenWidth/4, HelperFunctions().getRandomNumber(ScrollerGlobals.cloudRandomYStart, ScrollerGlobals.cloudRandomYEnd));
    this.setScale(obj);
};

Clouds6.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPositionsAndScale(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * ScrollerGlobals.deltaX6); //distance traveled * change
    obj.viewportX = newViewportX;
};

Clouds6.prototype.getNewPositionsAndScale = function(obj) {
    var randY = HelperFunctions().getRandomNumber(ScrollerGlobals.cloudRandomYStart, ScrollerGlobals.cloudRandomYEnd);
    obj.position = HelperFunctions().getNewPoint(MapGlobals.screenWidth + obj.width, randY);
    this.setScale(obj);
};

Clouds6.prototype.setScale = function(obj) {
    var scale = HelperFunctions().calculateCloudScale(obj.position.y);
    obj.scale = HelperFunctions().getNewPoint(scale,scale);
};