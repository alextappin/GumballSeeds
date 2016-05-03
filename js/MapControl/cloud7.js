/**
 * Created by ajt on 5/2/2016.
 */
function Cloud7() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("7 cloud3");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

Cloud7.constructor = Cloud7;
Cloud7.prototype = Object.create(PIXI.Container.prototype);

Cloud7.prototype.setPositionAndScale = function(obj) {
    var scale = HelperFunctions().getScreenRatioUsingHeight(obj.height,ScalingGlobals.cloudsPercentOfScreen[2]); //access array and grab correct ratios out of array
    obj.scale = HelperFunctions().getNewPoint(scale ,scale);
    obj.position = HelperFunctions().getNewPoint(MapGlobals.screenWidth, HelperFunctions().getRandomNumber(ScrollerGlobals.cloudRandomYStart, ScrollerGlobals.cloudRandomYEnd));
};

Cloud7.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPositionsAndScale(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) * ScrollerGlobals.deltaX7); //distance traveled * change
    obj.viewportX = newViewportX;
};

Cloud7.prototype.getNewPositionsAndScale = function(obj) {
    var randY = HelperFunctions().getRandomNumber(ScrollerGlobals.cloudRandomYStart, ScrollerGlobals.cloudRandomYEnd);
    var randScale = HelperFunctions().getRandomDecimalNumber(ScrollerGlobals.cloudScaleStart, ScrollerGlobals.cloudScaleEnd);
    obj.position = HelperFunctions().getNewPoint(MapGlobals.screenWidth + obj.width, randY);
    obj.scale = HelperFunctions().getNewPoint(randScale ,randScale);
};