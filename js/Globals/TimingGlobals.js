/**
 * Created by ajt on 5/1/2016.
 */
var TimingGlobals = (function TimingGlobals() {
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

    constants.characterRunTime = 7;
    constants.characterJumpTime = 7;
    constants.characterAttackTime = 8;
    constants.characterJumpAttackTime = 9;
    constants.characterHitTime = 10;
    constants.characterDieTime = 10;
    constants.characterSuperTime = 5;
    constants.characterPowerUpTime = 7;

    constants.rainbowChargeTime = 7;
    constants.rainbowTime = 10;

    return constants;
})();