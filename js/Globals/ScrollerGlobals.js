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
    constants.deltaX1 = 0.014;
    constants.deltaX2 = 0.024;
    constants.deltaX3 = 0.034;
    constants.deltaX4 = 0.044;
    constants.deltaX5 = 0.054;
    constants.deltaX6 = 0.064;
    constants.deltaX7 = 0.074;
    constants.deltaX8 = 0.084;
    constants.deltaX9 = 0.094;
    constants.deltaX10 = 0.094;
    constants.deltaX11 = 0.114;
    constants.deltaX12 = 0.124;
    constants.deltaX13 = 0.134;
    constants.deltaX14 = 0.144;
    constants.deltaX15 = 0.154;
    constants.deltaX16 = 0.164;
    constants.deltaX17 = 0.174;
    constants.deltaX18 = 0.184;

    constants.cloudRandomYStart = 1;
    constants.cloudRandomYEnd = MapGlobals.screenHeight/2;
    constants.cloudScaleConst = 6;

    constants.hill1aY = MapGlobals.screenHeight*.55; // 60% down the screen put the hill1
    constants.hill1bY = MapGlobals.screenHeight*.685;
    constants.hill2aY = MapGlobals.screenHeight*.20; // 60% down the screen put the hill1
    constants.hill2bY = MapGlobals.screenHeight*.20;

    constants.haze11Y = MapGlobals.screenHeight*.3;
    constants.mid2DeltaX = 0.29;

    return constants;
})();