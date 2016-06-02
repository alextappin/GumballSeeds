/**
 * Created by ajt on 4/24/2016.
 */
function PowerUpHelper() {
    var powerUpHelper = {};

    powerUpHelper.startPowerUp = function() {
        MainGlobals.Helpers.powerUpOn();
        MainGlobals.Helpers.powerUpScrollSpeed();
        MainGlobals.Helpers.startBassSound();
    };

    powerUpHelper.continuePowerUp = function(viewPort) {
        if (MainGlobals.PowerUp.powerUpStartingViewport == 0) {
            MainGlobals.PowerUp.powerUpStartingViewport = viewPort;
        }
        //if the map has travelled more than the duration, end it
        else if (MainGlobals.PowerUp.powerUpStartingViewport + MainGlobals.PowerUp.powerUpDuration < viewPort) {
            powerUpHelper.endPowerUp();
        }
        else {
            /*console.log("power up ongoing");*/
        }
    };

    powerUpHelper.endPowerUp = function() {
        MainGlobals.Helpers.resetAfterPowerUp();
    };

    powerUpHelper.incrementPowerUp = function() {
        //if powerUp is not active!
        if (!MainGlobals.PowerUp.powerUpActive) {
            if (MainGlobals.PowerUp.powerBarLevel >= MainGlobals.PowerUp.maxPowerBarLevel) {
                powerUpHelper.startPowerUp();
            }
            else {
                MainGlobals.PowerUp.powerBarLevel++;
            }
        }
    };

    powerUpHelper.decrementPowerUp = function() {
        if (MainGlobals.PowerUp.powerBarLevel > 0) {
            MainGlobals.PowerUp.powerBarLevel--;
        }
        //cheats below
        /*if (!MainGlobals.PowerUp.powerUpActive) {
            if (MainGlobals.PowerUp.powerBarLevel >= MainGlobals.PowerUp.maxPowerBarLevel) {
                powerUpHelper.startPowerUp();
            }
            else {
                MainGlobals.PowerUp.powerBarLevel++;
            }
        }*/
    };

    return powerUpHelper;
}