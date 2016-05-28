/**
 * Created by ajt on 4/30/2016.
 */
var ScalingGlobals = (function ScalingGlobals() {
    var constants = {};

    constants.characterScaleX = .5;
    constants.characterScaleY = .5;
    constants.characterStartXScale = MapGlobals.screenWidth * .20;
    constants.characterStartYScale = MapGlobals.screenWidth * .20;

    constants.titleScreenScaleX = 0;
    constants.titleScreenScaleY = 0;

    constants.titleWordsScaleX = 0;
    constants.titleWordsScaleY = 0;

    constants.titleStartYOffset = -.035;

    constants.startButton1PercentOfScreen = .04; //4% of screen height
    constants.startButton1Ratio = 0;

    constants.startButtonsPercentOfScreen = [.04,.13,.2,.3]; //array of percentages of screen size
    constants.startButtonRatios = [0,0,0]; //array of ratios for buttons

    constants.startAnimationRatio = 0;

    constants.cloudsPercentOfScreen = [0.05,0.10,0.15];

    constants.groundMainRatio = 0;
    constants.groundEndStartRatio = 0;

    constants.groundMainPercentOfScreen = .15;
    constants.groundEndStartPercentOfScreen = .1;

    constants.characterRatio = 0;
    constants.characterPercentOfScreen = .2;

    constants.gumballRatio = 0;
    constants.gumballPercentOfScreen = .15;

    constants.characterSuperRatio = 0;
    constants.characterSuperPercentOfScreen = 1;

    return constants;
})();