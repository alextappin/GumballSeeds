/**
 * Created by ajt on 4/25/2016.
 */
var ScrollerGlobals = (function ScrollerGlobals() {
    var constants = {};

    constants.minScrollSpeed = 5.5;
    constants.maxScrollSpeed = 7;
    constants.currentScrollSpeed = 20;
    constants.scrollAcceleration = 0.005;
    constants.startGroundSpeed = 10;
    constants.groundSpeed = 10;
    constants.offScreenOffsetX = -200;
    constants.offScreenOffsetY = 200;
    constants.farDeltaX = 0.014;
    constants.midDeltaX = 0.12;
    constants.mid2DeltaX = 0.29;

    return constants;
})();