/**
 * Created by ajt on 4/24/2016.
 */
function PowerUpHelper() {
    var powerUpHelper = {};

    powerUpHelper.startPowerUp = function() {
        HelperFunctions().powerUpOn();
        HelperFunctions().powerUpScrollSpeed();
    };
    powerUpHelper.continuePowerUp = function(viewPort) {
        if (PowerUpGlobals.powerUpStartingViewport == 0) {
            PowerUpGlobals.powerUpStartingViewport = viewPort;
        }
        //if the map has travelled more than the duration, end it
        else if (PowerUpGlobals.powerUpStartingViewport + PowerUpGlobals.powerUpDuration < viewPort) {
            powerUpHelper.endPowerUp();
        }
        else {
            console.log("power up ongoing");
        }
    };
    powerUpHelper.endPowerUp = function() {
        HelperFunctions().resetAfterPowerUp();
        console.log("end Power Up");
    };
    powerUpHelper.incrementPowerUp = function() {
        //if powerUp is not active!
        if (!PowerUpGlobals.powerUpActive) {
            if (PowerUpGlobals.powerBarLevel >= PowerUpGlobals.maxPowerBarLevel) {
                powerUpHelper.startPowerUp();
            }
            else {
                PowerUpGlobals.powerBarLevel += 1;
            }
        }
    };
    return powerUpHelper;
}