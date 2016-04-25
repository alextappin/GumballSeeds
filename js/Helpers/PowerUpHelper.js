/**
 * Created by ajt on 4/24/2016.
 */
function PowerUpHelper() {
    var powerUpHelper = {};

    powerUpHelper.startPowerUp = function() {
        console.log("startPowerUp");
        PowerUpGlobals.powerUpActive = true;
        ScrollerGlobals.currentScrollSpeed *= PowerUpGlobals.powerUpSpeedMultiplier;
        ScrollerGlobals.groundSpeed *= PowerUpGlobals.powerUpSpeedMultiplier;
    };
    powerUpHelper.continuePowerUp = function(viewPort) {
        if (GameVariables.getPowerUpStartViewPort() == 0) {
            GameVariables.setPowerUpStartViewPort(viewPort)
        }
        else if (GameVariables.getPowerUpStartViewPort() + GameVariables.getPowerUpDuration() < viewPort) {
            powerUpHelper.endPowerUp();
        }
        else {
            console.log("power up ongoing");
        }
    };
    powerUpHelper.endPowerUp = function() {
        PowerUpGlobals.powerUpActive = false;
        GameVariables.setPowerUpStartViewPort(0);
        GameVariables.setPowerBarScore(2);
        GameVariables.setGroundSpeed(10);
        console.log("end Power Up");
    };
    powerUpHelper.incrementPowerUp = function() {
        //if powerUp is not active!
        if (!GameVariables.getPowerUpActive()) {
            if (GameVariables.getPowerBarScore() >= GameVariables.getMaxPowerBar()) {
                powerUpHelper.startPowerUp();
            }
            else {
                GameVariables.setPowerBarScore(GameVariables.getPowerBarScore() + 1);
            }
        }
    };
    return powerUpHelper;
}