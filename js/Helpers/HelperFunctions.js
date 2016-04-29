/**
 * Created by ajt on 4/25/2016.
 */
function HelperFunctions() {
    var functions = {};

    functions.getRandomNumber = function(startRange, endRange) {
        //Will return a random number from startRange to endRange
        return Math.floor((Math.random() * endRange) + startRange);
    };

    functions.getNewPoint = function(x, y) {
        return {x : x, y : y};
    };

    functions.setScrollSpeedToMin = function (){
        ScrollerGlobals.currentScrollSpeed = ScrollerGlobals.minScrollSpeed;
    };

    functions.setScrollSpeedToMax = function() {
        ScrollerGlobals.currentScrollSpeed = ScrollerGlobals.maxScrollSpeed;
    };

    functions.scrollSpeedIsMaxed = function() {
        return ScrollerGlobals.currentScrollSpeed > ScrollerGlobals.maxScrollSpeed;
    };

    functions.doSwitchScreen = function() {
        return MapGlobals.switchScreen;
    };

    functions.doPowerUp = function() {
        return PowerUpGlobals.powerUpActive;
    };

    functions.switchScreenToggle = function() {
        MapGlobals.switchScreen = !MapGlobals.switchScreen;
    };

    functions.screenIsGame  = function() {
        return MapGlobals.screenToShow === MapGlobals.gameString;
    };

    functions.screenIsTitle  = function() {
        return MapGlobals.screenToShow === MapGlobals.titleString;
    };

    functions.screenIsLoad  = function() {
        return MapGlobals.screenToShow === MapGlobals.loadString;
    };

    functions.switchToGame = function() {
        MapGlobals.screenToShow = MapGlobals.gameString;
    };

    functions.switchToTitle = function() {
        MapGlobals.screenToShow = MapGlobals.titleString;
    };

    functions.switchToLoad = function() {
        MapGlobals.screenToShow = MapGlobals.loadString;
    };

    functions.resetGlobals = function() {
        if (ScoreGlobals.currentScore > ScoreGlobals.highScore) {
            ScoreGlobals.highScore = ScoreGlobals.currentScore;
        }

        BalanceGlobals.enemies = 2;
        BalanceGlobals.gumballs = 1;
        ScoreGlobals.lives = 20;
        ScoreGlobals.kills = 0;
        ScoreGlobals.score = 0;
        MapGlobals.loopCounter = 0;
        ScrollerGlobals.groundSpeed = 10;
        PowerUpGlobals.powerBarLevel = 2;
        PowerUpGlobals.powerUpActive = false;
        PowerUpGlobals.powerUpStartingViewport = 0;
    };

    functions.getCharacterPositionX = function() {
        return MapGlobals.screenWidth * MapGlobals.characterOffsetX;
    };

    functions.startTitleSound = function() {
        createjs.Sound.play(MapGlobals.titleString, {loop: 10, volume:.2});
    };

    functions.stopTitleSound = function() {
        createjs.Sound.stop(MapGlobals.titleString);
    };

    return functions;
}
