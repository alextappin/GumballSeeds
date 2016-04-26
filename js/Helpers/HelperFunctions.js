/**
 * Created by ajt on 4/25/2016.
 */
var HelperFunctions = (function HelperFunction() {
    var functions = {};

    functions.getRandomNumber = function(startRange, endRange) {
        //Will return a random number from startRange to endRange
        return Math.floor((Math.random() * endRange) + startRange);
    };

    functions.getNewPoint = function(x, y) {
        return {x : x, y : y};
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
        return MapGlobals.screenWidth * .2;
    };

    return functions;
})();