/**
 * Created by ajt on 4/25/2016.
 */
var MapGlobals = (function MapGlobals() {
    var constants = {};

    constants.loopCounter = 1;
    constants.screenWidth = 1080;
    constants.screenHeight = 720;
    constants.screenToShow = "Load";
    constants.switchScreen = false;
    constants.characterOffsetX = .2;
    constants.soundLoaded = false;
    constants.gameString = "Game";
    constants.loadString = "Load";
    constants.titleString = "Title";
    constants.farDeltaX = 0.014;
    constants.midDeltaX = 0.12;
    constants.mid2DeltaX = 0.29;

    return constants;
})();