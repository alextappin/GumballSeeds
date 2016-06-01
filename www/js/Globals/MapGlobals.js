/**
 * Created by ajt on 4/25/2016.
 */
function MapGlobals() {
    var constants = {};

    constants.loopCounter = 1;
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
    constants.gumballsPerColor = 2;
    constants.groundStartA = "17 ground1start";
    constants.groundStartB = "17 ground1start b";
    constants.groundA = "17 ground1a";
    constants.groundB = "17 ground1b";
    constants.groundEndA = "17 ground1end";
    constants.groundEndB = "17 ground1end b";
    constants.groundY = .86; //86% of screen height...
    constants.addGroundChildConst = 16;
    constants.addGumballChildConst = 20;
    constants.addEnemyChildConst = 21;
    constants.gumballHeightConst = .02;
    constants.gumballs = [
        "1 violetgb",
        "2 purplegb",
        "3 bluegb",
        "4 greengb",
        "5 yellowgb",
        "6 orangegb",
        "7 redgb"
    ];
    constants.enemiesPool = 10;
/*    constants.lifebars = [
        "lifebar1",
        "lifebar2",
        "lifebar3",
        "lifebar4",
        "lifebar5",
        "lifebar6",
        "lifebar7",
        "lifebar8",
        "lifebar9",
        "lifebar10",
        "lifebar11",
        "lifebar12",
        "lifebar13",
        "lifebar14",
        "lifebar15",
        "lifebar16",
        "lifebar17",
        "lifebar18",
        "lifebar19",
        "lifebar20"
    ];*/
    constants.gumballSpaceConst = 7;
    return constants;
}