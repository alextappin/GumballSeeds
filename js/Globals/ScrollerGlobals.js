/**
 * Created by ajt on 4/25/2016.
 */
function ScrollerGlobals() {
    var constants = {};

    constants.minScrollSpeed = MapGlobals.screenHeight/130.9;//5.5;
    constants.maxScrollSpeed = MapGlobals.screenHeight/102.8;//7;
    constants.currentScrollSpeed = MapGlobals.screenHeight/36;//20;
    constants.scrollAcceleration = MapGlobals.screenHeight/144000;//0.005;
    constants.startGroundSpeed = MapGlobals.screenHeight/72;//10;
    constants.groundSpeed = MapGlobals.screenHeight/72;//10;
    constants.offScreenOffsetX = -200;
    constants.offScreenOffsetY = 200;
    constants.deltaX1 = 0.0;
    constants.deltaX2 = MapGlobals.screenHeight/51428;//0.014;
    constants.deltaX3 = MapGlobals.screenHeight/30000;//0.024;
    constants.deltaX4 = MapGlobals.screenHeight/144000;//0.005;
    constants.deltaX5 = MapGlobals.screenHeight/51428;//0.014;
    constants.deltaX6 = MapGlobals.screenHeight/30000;//0.024;
    constants.deltaX7 = MapGlobals.screenHeight/21176;//0.034;
    constants.deltaX8 = MapGlobals.screenHeight/6315;//0.114;
    constants.deltaXhill1 = MapGlobals.screenHeight/5806;//0.124;
    constants.deltaX11 = MapGlobals.screenHeight/5400;//0.134;
    constants.deltaXhill2 = MapGlobals.screenHeight/5000;//0.144;
    constants.deltaX14Haze = MapGlobals.screenHeight/1050;//0.684;
    constants.deltaXhill3 = MapGlobals.screenHeight/3529;//0.204;

    constants.cloudRandomYStart = 1;
    constants.cloudRandomYEnd = MapGlobals.screenHeight/2;
    constants.cloudScaleConst = 6;

    constants.hill1aY = MapGlobals.screenHeight*.52; // 60% down the screen put the hill1
    constants.hill1bY = MapGlobals.screenHeight*.655;
    constants.hill2aY = MapGlobals.screenHeight*.32; // 60% down the screen put the hill1
    constants.hill2bY = MapGlobals.screenHeight*.505;
    constants.hill3aY = MapGlobals.screenHeight*.65;
    constants.hill3bY = MapGlobals.screenHeight*.65;

    constants.haze11Y = MapGlobals.screenHeight*.3;
    constants.haze14Y = MapGlobals.screenHeight*.55;
    constants.mid2DeltaX = 0.29;

    return constants;
}