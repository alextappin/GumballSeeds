/**
 * Created by ajt on 4/24/2016.
 */
function PowerUpHelper() {
    var powerUpHelper = {};

    powerUpHelper.startPowerUp = function() {
        console.log("startPowerUp");
    };
    powerUpHelper.incrementPowerUp = function() {
        if (GameVariables.getPowerBarScore() >= GameVariables.getMaxPowerBar()) {
            powerUpHelper.startPowerUp();
        }
        else {
            GameVariables.setPowerBarScore(GameVariables.getPowerBarScore() + 1);
        }
    };
    return powerUpHelper;
}