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
    constants.titleAlphaStart = 0.9;
    constants.titlePulseMinimumAlpha = .5;

    constants.startButtonPressed = false;

    return constants;
})();