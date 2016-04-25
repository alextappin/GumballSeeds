/**
 * Created by ajt on 4/24/2016.
 */
function PowerUpHelper() {
    var powerUpHelper = {};

    powerUpHelper.startPowerUp = function() {
        console.log("startPowerUp");
        GameVariables.setCurrentScrollSpeed(GameVariables.getCurrentScrollSpeed()*2);
    };
    powerUpHelper.continuePowerUp = function() {
        console.log("power up ongoing");
    };
    powerUpHelper.endPowerUp = function() {
        console.log("end Power Up");
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