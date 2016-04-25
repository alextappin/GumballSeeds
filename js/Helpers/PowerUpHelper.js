/**
 * Created by ajt on 4/24/2016.
 */
function PowerUpHelper() {
    var powerUpHelper = {};

    powerUpHelper.startPowerUp = function() {

    };
    powerUpHelper.checkForPowerUp = function() {
        if (GameVariables.getPowerBarScore() == GameVariables.getMaxPowerBar()) {
            powerUpHelper.startPowerUp();
        }
        else {

        }
    };
    return powerUpHelper;
}