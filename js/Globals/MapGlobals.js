/**
 * Created by ajt on 4/25/2016.
 */
var MapGlobals = (function MapGlobals() {
    var constants = {};

    constants.loopCounter = 1;
    constants.screenWidth = 1280;
    constants.screenHeight = 720;
    constants.screenToShow = "Load";
    constants.switchScreen = false;
    constants.characterOffsetX = .2;
    constants.soundLoaded = false;
    constants.gameString = "Game";
    constants.loadString = "Load";
    constants.titleString = "Title";

    return constants;
})();