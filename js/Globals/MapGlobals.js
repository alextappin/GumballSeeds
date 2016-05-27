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
    constants.startAnimationString = "StartAnimation";
    constants.startAnimationSprites = 2;
    constants.groundSlices = 3;
    constants.groundStartA = "17 ground1start";
    constants.groundStartB = "17 ground1start b";
    constants.groundA = "17 ground1a";
    constants.groundB = "17 ground1b";
    constants.groundEndA = "17 ground1end";
    constants.groundEndB = "17 ground1end b";
    constants.groundY = .86; //10% of screen height...
    constants.addGroundChildConst = 16;
    return constants;
})();