/**
 * Created by ajt on 4/25/2016.
 */
function PowerUpGlobals() {
    var constants = {};

    constants.startPowerBarLevel = 5;
    constants.powerBarLevel = 6;
    constants.maxPowerBarLevel = 6;
    constants.powerUpActive = false;
    constants.characterDonePoweringUp = false;
    constants.characterRise = false;
    constants.characterBolt = false;
    constants.powerUpStartingViewport = 0;
    constants.powerUpDuration = MainGlobals.ScreenHeight/.156;//5000;
    constants.powerUpSpeedMultiplier = 2;
    constants.characterSpriteToJumpTime = 4;

    constants.superRiseSpriteIndex = 3;
    constants.superBoltSpriteIndex = 9;

    return constants;
}