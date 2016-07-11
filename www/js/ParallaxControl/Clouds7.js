/**
 * Created by ajt on 5/2/2016.
 */
function Clouds7() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("7 cloud3");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Clouds7.constructor = Clouds7;
Clouds7.prototype = Object.create(PIXI.Container.prototype);

Clouds7.prototype.setPositionAndScale = function(obj) {
    this.getNewPositionsAndScale(obj);
};

Clouds7.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPositionsAndScale(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * MainGlobals.Scroller.deltaX7); //distance traveled * change
    obj.viewportX = newViewportX;
};

Clouds7.prototype.getNewPositionsAndScale = function(obj) {
    var randY = MainGlobals.Helpers.getRandomNumber(MainGlobals.Scroller.cloudRandomYStart, MainGlobals.Scroller.cloudRandomYEnd);
    obj.position = MainGlobals.Helpers.getNewPoint(MainGlobals.ScreenWidth + obj.width, randY);
    this.setScale(obj);
};

Clouds7.prototype.setScale = function(obj) {
    var scale = MainGlobals.Helpers.calculateCloudScale(obj.position.y);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale,scale);
};