/**
 * Created by ajt on 4/30/2016.
 */
function ScalingGlobals() {
    var constants = {};

    constants.titleScreenScale = 0;
    constants.titleScreenPercent = 1;
    constants.titleWordsScale = 0;
    constants.titleWordsPercent = 1;
    constants.startButtonScale = 0;
    constants.startButtonPercent = 0;
    constants.startAnimationScale = 0;
    constants.startAnimationPercent = 0;

    constants.characterScaleX = .5;
    constants.characterScaleY = .5;
    constants.characterStartXScale = MainGlobals.ScreenWidth * .18;
    constants.characterStartYScale = MainGlobals.ScreenWidth * .18;

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
    constants.characterSuperPercentOfScreen = .3125;
    constants.characterSuperPosition = {};

    constants.rainbowSuperRatio = 1;
    constants.rainbowSuperPercentOfScreen = 1;

    constants.characterObjSuperScale = 0;
    constants.characterObjSuperPercentOfScreen = 1;

    constants.superRatio = 0;
    constants.superPercentOfScreen = 1;

    constants.characterSuperPosition = .40;

    return constants;
}