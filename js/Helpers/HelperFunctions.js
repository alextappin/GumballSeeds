/**
 * Created by ajt on 4/25/2016.
 */
function HelperFunctions() {
    var functions = {};

    functions.getRandomNumber = function(startRange, endRange) {
        //Will return a random number from startRange to endRange
        return Math.floor((Math.random() * endRange) + startRange);
    };

    functions.getRandomDecimalNumber = function(startRange, endRange) {
        //Will return a random number from startRange to endRange (decimal)
        return (Math.random() * endRange) + startRange;
    };

    functions.getNewPoint = function(x, y) {
        return {x : x, y : y};
    };

    functions.returnZero = function() {
        return 0;
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

    functions.switchToStartAnimation = function() {
        MapGlobals.screenToShow = MapGlobals.startAnimationString;
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
        ScoreGlobals.currescore = 0;
        MapGlobals.loopCounter = 0;
        ScrollerGlobals.groundSpeed = 10;
        PowerUpGlobals.powerBarLevel = 2;
        PowerUpGlobals.powerUpActive = false;
        PowerUpGlobals.powerUpStartingViewport = 0;
    };

    functions.powerUpOn = function() {
        PowerUpGlobals.powerUpActive = true;
    };

    functions.powerUpOff = function() {
        PowerUpGlobals.powerUpActive = false;
        PowerUpGlobals.characterDonePoweringUp = false;
    };

    functions.resetAfterPowerUp = function() {
        functions.powerUpOff();
        PowerUpGlobals.powerUpStartingViewport = 0;
        PowerUpGlobals.characterDonePoweringUp = false;
        PowerUpGlobals.powerBarLevel = PowerUpGlobals.startPowerBarLevel;
        ScrollerGlobals.groundSpeed = ScrollerGlobals.startGroundSpeed;
    };

    functions.powerUpScrollSpeed = function() {
        ScrollerGlobals.currentScrollSpeed *= PowerUpGlobals.powerUpSpeedMultiplier;
        ScrollerGlobals.groundSpeed *= PowerUpGlobals.powerUpSpeedMultiplier;
    };

    functions.handlePowerUpViewport = function() {

    };

    functions.startTitleSound = function() {
        createjs.Sound.play(MapGlobals.titleString, {loop: 10, volume:.2});
    };

    functions.stopTitleSound = function() {
        createjs.Sound.stop(MapGlobals.titleString);
    };

    functions.startGameSound = function() {
        createjs.Sound.play(MapGlobals.gameString, {loop: 10, volume:1});
    };

    functions.getCorrectScaleWidth = function(width) {
        return MapGlobals.screenWidth / width;
    };

    functions.getCorrectScaleHeight = function(height) {
        return MapGlobals.screenHeight / height;
    };

    functions.getHeightGivenConstant = function(constant, height) {
        return (MapGlobals.screenHeight - height)/2 - (MapGlobals.screenHeight) * constant;
    };

    functions.getRatioToScreenGivenConst = function(constant, height, width) {
        return (MapGlobals.screenHeight * MapGlobals.screenWidth * constant) / (height * width);
    };

    functions.getScreenPositionMiddleWidth = function(width) {
        return (MapGlobals.screenWidth - width)/2;
    };

    functions.getScreenPositionMiddleHeight = function(height) {
        return (MapGlobals.screenHeight - height)/2;
    };

    functions.getScreenRatioUsingHeight = function(height, percentage) {
        if (percentage) {
            return (MapGlobals.screenHeight*percentage) / height;
        } else {
            return MapGlobals.screenHeight / height;
        }
    };

    functions.calculateCloudScale = function(posY) {
        return (1-(posY / MapGlobals.screenHeight))/ScrollerGlobals.cloudScaleConst;
    };

    functions.endGame = function() {
        PhysicsGlobals.airborn = true;
        BalanceGlobals.continueGame = false;
        HelperFunctions().switchScreenToggle();
        HelperFunctions().switchToTitle();
    };

    functions.isIntersecting = function(rectangle1, rectangle2) { //rectangular isIntersection method
        return !(rectangle2.position.x > (rectangle1.position.x + rectangle1.width) ||
        (rectangle2.position.x + rectangle2.width) < rectangle1.x ||
        rectangle2.position.y > (rectangle1.position.y + rectangle1.height) ||
        (rectangle2.position.y + rectangle2.height) < rectangle1.position.y);
    };

    functions.shuffleArray = function(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    };

    return functions;
}
