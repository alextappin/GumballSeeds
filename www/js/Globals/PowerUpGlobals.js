/**
 * Created by ajt on 4/25/2016.
 */
function PowerUpGlobals() {
    var constants = {};

    constants.startPowerBarLevel = 0;
    constants.powerBarLevel = 6;
    constants.maxPowerBarLevel = 6;
    constants.powerUpActive = false;
    constants.characterDonePoweringUp = false;
    constants.characterRise = false;
    constants.characterBolt = false;
    constants.powerUpStartingViewport = 0;
    constants.powerUpDuration = MainGlobals.ScreenHeight/.126;//5000;
    constants.powerUpSpeedMultiplier = 2;
    constants.characterSpriteToJumpTime = 4;

    constants.superRiseSpriteNum = 19;
    constants.superBoltSpriteNum = 21;

    return constants;
}