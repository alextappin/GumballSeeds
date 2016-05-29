/**
 * Created by ajt on 4/25/2016.
 */
var PowerUpGlobals = (function PowerUpGlobals() {
    var constants = {};

    constants.startPowerBarLevel = 4;
    constants.powerBarLevel = 6;
    constants.maxPowerBarLevel = 6;
    constants.powerUpActive = false;
    constants.characterDonePoweringUp = false;
    constants.powerUpStartingViewport = 0;
    constants.powerUpDuration = 30000;
    constants.powerUpSpeedMultiplier = 2;
    constants.characterSpriteToJumpTime = 4;

    return constants;
})();