/**
 * Created by ajt on 5/1/2016.
 */
var TimingGlobals = (function TimingGlobals() {
    var constants = {};

    constants.titleWordsFadeIn = false;
    constants.startButtonFadeIn = false;

    constants.titleWordsAlphaCue = .7;
    constants.startButtonAlphaCue = .5;

    constants.titleAlphaIncrement = .004;
    constants.titleAlphaStart = 0.0;
    constants.titlePulseMinimumAlpha = .3;

    constants.startButtonPressed = false;

    return constants;
})();