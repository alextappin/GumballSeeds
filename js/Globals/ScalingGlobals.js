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

    return constants;
})();