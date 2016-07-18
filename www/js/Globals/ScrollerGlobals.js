/**
 * Created by ajt on 4/25/2016.
 */
function ScrollerGlobals() {
    var constants = {};

    constants.minScrollSpeed = MainGlobals.ScreenHeight/80;//5.5;
    constants.maxScrollSpeed = MainGlobals.ScreenHeight/70;//7;
    constants.currentScrollSpeed = MainGlobals.ScreenHeight/36;//20;
    constants.scrollAcceleration = MainGlobals.ScreenHeight/144000;//0.005;
    constants.startGroundSpeed = MainGlobals.ScreenHeight/50;
    constants.groundSpeed = MainGlobals.ScreenHeight/72;//10;
    constants.offScreenOffsetX = -200;
    constants.offScreenOffsetY = 200;
    constants.deltaX1 = 0.0;
    constants.deltaX2 = MainGlobals.ScreenHeight/51428;//0.014;
    constants.deltaX3 = MainGlobals.ScreenHeight/30000;//0.024;
    constants.deltaX4 = MainGlobals.ScreenHeight/144000;//0.005;
    constants.deltaX5 = MainGlobals.ScreenHeight/51428;//0.014;
    constants.deltaX6 = MainGlobals.ScreenHeight/30000;//0.024;
    constants.deltaX7 = MainGlobals.ScreenHeight/21176;//0.034;
    constants.deltaX8 = MainGlobals.ScreenHeight/6315;//0.114;
    constants.deltaXhill1 = MainGlobals.ScreenHeight/5806;//0.124;
    constants.deltaX11 = MainGlobals.ScreenHeight/5400;//0.134;
    constants.deltaXhill2 = MainGlobals.ScreenHeight/5000;//0.144;
    constants.deltaX14Haze = MainGlobals.ScreenHeight/1050;//0.684;
    constants.deltaXhill3 = MainGlobals.ScreenHeight/3529;//0.204;

    constants.cloudRandomYStart = 1;
    constants.cloudRandomYEnd = MainGlobals.ScreenHeight/2;
    constants.cloudScaleConst = 6;

    constants.hill1aY = MainGlobals.ScreenHeight*.52; // 60% down the screen put the hill1
    constants.hill1bY = MainGlobals.ScreenHeight*.655;
    constants.hill2aY = MainGlobals.ScreenHeight*.32; // 60% down the screen put the hill1
    constants.hill2bY = MainGlobals.ScreenHeight*.32;
    constants.hill3aY = MainGlobals.ScreenHeight*.19;
    constants.hill3bY = MainGlobals.ScreenHeight*.25;

    constants.haze11Y = MainGlobals.ScreenHeight*.3;
    constants.haze14Y = MainGlobals.ScreenHeight*.55;
    constants.mid2DeltaX = 0.29;

    return constants;
}