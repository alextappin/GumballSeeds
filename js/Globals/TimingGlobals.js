/**
 * Created by ajt on 5/1/2016.
 */
var TimingGlobals = (function TimingGlobals() {
    var constants = {};

    constants.titleWordsFadeIn = false;
    constants.startButtonFadeIn = false;

    constants.titleWordsAlphaCue = .5;
    constants.startButtonAlphaCue = .7;

    constants.titleAlphaIncrement = .004;
    constants.titleBgAlphaIncrement = .004;
    constants.titleWordsAlphaIncrement = .004;
    constants.titleStartAlphaIncrement = .004;
    constants.titleAlphaStart = 0.0;
    constants.titlePulseMinimumAlpha = .3;

    constants.startButtonPressed = false;

    return constants;
})();