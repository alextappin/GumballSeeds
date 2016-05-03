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

    constants.startButton2Const = .04;
    constants.startButton2Ratio = 0;

    constants.startAnimationConst = 1;
    constants.startAnimationRatio = 0;


    return constants;
})();