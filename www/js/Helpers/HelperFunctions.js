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
        MainGlobals.Scroller.currentScrollSpeed = MainGlobals.Scroller.minScrollSpeed;
    };

    functions.setScrollSpeedToMax = function() {
        MainGlobals.Scroller.currentScrollSpeed = MainGlobals.Scroller.maxScrollSpeed;
    };

    functions.scrollSpeedIsMaxed = function() {
        return MainGlobals.Scroller.currentScrollSpeed > MainGlobals.Scroller.maxScrollSpeed;
    };

    functions.doSwitchScreen = function() {
        return MainGlobals.Map.switchScreen;
    };

    functions.doPowerUp = function() {
        return MainGlobals.PowerUp.powerUpActive;
    };

    functions.switchScreenToggle = function() {
        MainGlobals.Map.switchScreen = !MainGlobals.Map.switchScreen;
    };

    functions.screenIsGame  = function() {
        return MainGlobals.Map.screenToShow === MainGlobals.Map.gameString;
    };

    functions.screenIsTitle  = function() {
        return MainGlobals.Map.screenToShow === MainGlobals.Map.titleString;
    };

    functions.screenIsLoad  = function() {
        return MainGlobals.Map.screenToShow === MainGlobals.Map.loadString;
    };

    functions.switchToGame = function() {
        MainGlobals.Map.screenToShow = MainGlobals.Map.gameString;
    };

    functions.switchToTitle = function() {
        MainGlobals.Map.screenToShow = MainGlobals.Map.titleString;
    };

    functions.switchToStartAnimation = function() {
        MainGlobals.Map.screenToShow = MainGlobals.Map.startAnimationString;
    };

    functions.switchToLoad = function() {
        MainGlobals.Map.screenToShow = MainGlobals.Map.loadString;
    };

    functions.resetGlobals = function() {
        if (MainGlobals.Score.currentScore > MainGlobals.Score.highScore) {
            MainGlobals.Score.highScore = MainGlobals.Score.currentScore;
        }

        MainGlobals.Balance.enemies = 2;
        MainGlobals.Balance.gumballs = 1;
        MainGlobals.Score.lives = MainGlobals.Balance.maxLives;
        MainGlobals.Score.kills = 0;
        MainGlobals.Score.currescore = 0;
        MainGlobals.Map.loopCounter = 0;
        MainGlobals.Scroller.groundSpeed = MainGlobals.ScreenHeight/50;//10;
        MainGlobals.PowerUp.powerBarLevel = MainGlobals.PowerUp.startPowerBarLevel;
        MainGlobals.PowerUp.powerUpActive = false;
        MainGlobals.PowerUp.powerUpStartingViewport = 0;
    };

    functions.powerUpOn = function() {
        MainGlobals.PowerUp.powerUpActive = true;
    };

    functions.powerUpOff = function() {
        MainGlobals.PowerUp.powerUpActive = false;
        MainGlobals.PowerUp.characterDonePoweringUp = false;
    };

    functions.resetAfterPowerUp = function() {
        functions.powerUpOff();
        MainGlobals.PowerUp.powerUpStartingViewport = 0;
        MainGlobals.PowerUp.characterDonePoweringUp = false;
        MainGlobals.PowerUp.characterBolt = false;
        MainGlobals.PowerUp.characterRise = false;
        MainGlobals.PowerUp.powerBarLevel = MainGlobals.PowerUp.startPowerBarLevel;
        MainGlobals.Scroller.groundSpeed = MainGlobals.Scroller.startGroundSpeed;
        MainGlobals.Score.lives = MainGlobals.Balance.maxLives;
    };

    functions.powerUpScrollSpeed = function() {
        MainGlobals.Scroller.currentScrollSpeed *= MainGlobals.PowerUp.powerUpSpeedMultiplier;
        MainGlobals.Scroller.groundSpeed *= MainGlobals.PowerUp.powerUpSpeedMultiplier;
    };

    functions.handlePowerUpViewport = function() {

    };

    functions.startTitleSound = function() {
        createjs.Sound.play(MainGlobals.Map.titleString, {loop: 10, volume:.2});
    };

    functions.stopTitleSound = function() {
        createjs.Sound.stop(MainGlobals.Map.titleString);
    };

    functions.startGameSound = function() {
        createjs.Sound.play(MainGlobals.Map.gameString, {loop: 10, volume:.5});
    };

    functions.startBassSound = function() {
        createjs.Sound.play("Bass", {loop: 0, volume:1, duration: 10000});
    };

    functions.stopGameSound = function() {
        createjs.Sound.stop(MainGlobals.Map.gameString);
    };

    functions.getCorrectScaleWidth = function(width) {
        return MainGlobals.ScreenWidth / width;
    };

    functions.getCorrectScaleHeight = function(height) {
        return MainGlobals.ScreenHeight / height;
    };

    functions.getHeightGivenConstant = function(constant, height) {
        return (MainGlobals.ScreenHeight - height)/2 - (MainGlobals.ScreenHeight) * constant;
    };

    functions.getRatioToScreenGivenConst = function(constant, height, width) {
        return (MainGlobals.ScreenHeight * MainGlobals.ScreenWidth * constant) / (height * width);
    };

    functions.getScreenPositionMiddleWidth = function(width) {
        return (MainGlobals.ScreenWidth - width)/2;
    };

    functions.getScreenPositionMiddleHeight = function(height) {
        return (MainGlobals.ScreenHeight - height)/2;
    };

    functions.getScreenRatioUsingHeight = function(height, percentage) {
        if (percentage) {
            return (MainGlobals.ScreenHeight*percentage) / height;
        } else {
            return MainGlobals.ScreenHeight / height;
        }
    };

    functions.calculateCloudScale = function(posY) {
        return (1-(posY / MainGlobals.ScreenHeight))/MainGlobals.Scroller.cloudScaleConst;
    };

    functions.endGame = function() {
        MainGlobals.Physics.airborn = true;
        MainGlobals.Balance.continueGame = false;
        MainGlobals.Score.lives = MainGlobals.Score.maxLives;
        MainGlobals.Balance.isAttacking = false;
        MainGlobals.Physics.applyFallingGravity = false;
        MainGlobals.Physics.characterHighJumping = false;
        MainGlobals.PowerUp.powerUpActive = false;
        MainGlobals.PowerUp.characterDonePoweringUp = false;
        MainGlobals.PowerUp.characterRise = false;
        MainGlobals.PowerUp.characterBolt = false;
        MainGlobals.Score.currentScore = 0;
        MainGlobals.Score.kills = 0;
        MainGlobals.Timing.startButtonPressed = false;
        MainGlobals.titleWordsFadeIn = false;
        MainGlobals.startButtonFadeIn = false;
        MainGlobals.Helpers.switchScreenToggle();
        MainGlobals.Helpers.switchToTitle();
        MainGlobals.Helpers.stopGameSound();

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
