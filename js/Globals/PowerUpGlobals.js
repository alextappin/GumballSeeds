/**
 * Created by ajt on 4/25/2016.
 */
var PowerUpGlobals = (function PowerUpGlobals() {
    var constants = {};

    constants.startPowerBarLevel = 2;
    constants.powerBarLevel = 2;
    constants.maxPowerBarLevel = 6;
    constants.powerUpActive = false;
    constants.powerUpStartingViewport = 0;
    constants.powerUpDuration = 3000;
    constants.powerUpSpeedMultiplier = 2;

    return constants;
})();