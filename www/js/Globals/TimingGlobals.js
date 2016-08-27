/**
 * Created by ajt on 5/1/2016.
 */
function TimingGlobals() {
    var constants = {};

    constants.titleWordsFadeIn = false;
    constants.startButtonFadeIn = false;
    constants.titleWordsAlphaCue = .5;
    constants.startButtonAlphaCue = .25;
    constants.titleAlphaIncrement = .004;
    constants.titleBgAlphaIncrement = .004;
    constants.titleWordsAlphaIncrement = .003;
    constants.titleStartAlphaIncrement = .0045;
    constants.titleAlphaStart = 0.00001;
    constants.titlePulseMinimumAlpha = .5;
    constants.startButtonPressed = false;

    constants.mapWaterfallTime1 = 9;
    constants.mapWaterfallTime2 = 9;
    constants.characterRunTime = 7;
    constants.characterJumpTime = 6;
    constants.characterAttackTime = 6;
    constants.characterJumpAttackTime = 6;
    constants.characterHitTime = 10;
    constants.characterDieTime = 10;
    constants.characterSuperTime = 15;
    constants.characterPowerUpTime = 10;

    constants.enemyFlyTime = 6;
    constants.enemyDieTime = 5;

    constants.rainbowChargeTime = 3;
    constants.rainbowTime = 3;

    constants.superbarTime = 1;//2 or 3??!?

    constants.superBgTime = 3;

    return constants;
}