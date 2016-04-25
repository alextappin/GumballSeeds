/**
 * Created by ajt on 3/9/2016.
 */
var GameVariables = (function GameVariables() {
    var constants = {
        loopCounter : 1,
        screenWidth : 1080,
        screenHeight : 720,
        enemies : 2,
        gumballs : 1,
        minScrollSpeed : 5.5,
        maxScrollSpeed : 7,
        scrollAcceleration : 0.005,
        groundSpeed : 10,
        currentScrollSpeed : 20,
        offScreenOffsetX : -200,
        offScreenOffsetY : 200,
        screenToShow : "Title",
        switchScreen : false,
        currentScore : 0,
        highScore : 0,
        lives : 30,
        kills : 0,
        createNewEnemiesCounter : 5,
        loopScoreIncrementTime : 60,
        powerBarScore : 2,
        maxPowerBar : 6,
        powerUpActive : false,
        powerUpStartingViewPort : 0,
        powerUpDuration : 1000
    };

    return {
        //getters
        getWidth : function getWidth() {
            return constants.screenWidth;
        },
        getHeight : function getHeight() {
            return constants.screenHeight;
        },
        getEnemies : function getEnemies() {
            return constants.enemies;
        },
        getGumballs : function getGumballs() {
            return constants.gumballs;
        },
        getMinScrollSpeed : function getMinScrollSpeed() {
            return constants.minScrollSpeed;
        },
        getMaxScrollSpeed : function getMaxScrollSpeed() {
            return constants.maxScrollSpeed;
        },
        getScrollAcceleration : function getScrollAcceleration() {
            return constants.scrollAcceleration;
        },
        getCurrentScrollSpeed : function getCurrentScrollSpeed() {
            return constants.currentScrollSpeed;
        },
        getScreenOffsetX : function getScreenOffsetX() {
            return constants.offScreenOffsetX;
        },
        getScreenOffsetY : function getScreenOffsetY() {
            return constants.offScreenOffsetY;
        },
        getRandomNumber : function getRandomNumber(startRange, endRange) {
            //Will return a random number from startRange to endRange
            return Math.floor((Math.random() * endRange) + startRange);
        },
        getScreenToShow : function getScreenToShow() {
            return constants.screenToShow;
        },
        getSwitchScreen : function getSwitchScreen() {
            return constants.switchScreen;
        },
        getCurrentScore : function getCurrentScore() {
            return constants.currentScore;
        },
        getHighScore : function getHighScore() {
            return constants.highScore;
        },
        getLives : function getLives() {
            return constants.lives;
        },
        getNewPoint : function getNewPoint(x, y) {
            return {
                x : x,
                y : y
            }
        },
        getKills : function getKills() {
            return constants.kills;
        },
        getNewEnemyCounter : function getNewEnemyCounter() {
            return constants.createNewEnemiesCounter;
        },
        getLoopCounter : function getLoopCounter() {
            return constants.loopCounter;
        },
        getLoopScoreIncrement : function getLoopScoreIncrement() {
            return constants.loopScoreIncrementTime;
        },
        getPowerBarScore : function getPowerBarScore() {
            return constants.powerBarScore;
        },
        getCharacterPositionX : function getCharacterPositionX() {
            return constants.screenWidth * .2
        },
        getMaxPowerBar : function getMaxPowerBar() {
            return constants.maxPowerBar;
        },
        getPowerUpActive : function getPowerUpActive() {
            return constants.powerUpActive;
        },
        getPowerUpStartViewPort : function getPowerUpStartViewPort() {
            return constants.powerUpStartingViewPort;
        },
        getPowerUpDuration : function getPowerUpDuration() {
            return constants.powerUpDuration;
        },
        getGroundSpeed : function getGroundSpeed() {
            return constants.groundSpeed;
        },
        //setters
        setEnemies : function setEnemies(value) {
            constants.enemies = value;
        },
        setGumballs : function setGumballs(value) {
            constants.gumballs = value;
        },
        setCurrentScrollSpeed : function setCurrentScrollSpeed(value) {
            constants.currentScrollSpeed = value;
        },
        setScreenTitle : function setScreenTitle() {
            constants.screenToShow = "Title";
        },
        setScreenGame : function SetScreenGame() {
            constants.screenToShow = "Game";
        },
        toggleScreenChange : function toggleScreenChange() {
            constants.switchScreen = !constants.switchScreen;
        },
        setCurrentScore : function setCurrentScore(updatedScore) {
        constants.currentScore = updatedScore;
        },
        setHighScore : function setHighScore(score) {
            constants.highScore = score;
        },
        setLives : function setLives(lives) {
            constants.lives = lives;
        },
        setKills : function setKills(kills) {
            constants.kills = kills;
        },
        incrementLoopCounter : function incrementLoopCounter() {
            constants.loopCounter++;
        },
        resetLoopCounter : function resetLoopCounter() {
            constants.loopCounter = 0;
        },
        setPowerBarScore : function setPowerBarScore(score) {
            constants.powerBarScore = score;
        },
        setPowerUpActive : function setPowerUpActive(bool) {
            constants.powerUpActive = bool;
        },
        setPowerUpStartViewPort : function setPowerUpStartViewPort(viewPort) {
            constants.powerUpStartingViewPort = viewPort;
        },
        setGroundSpeed : function setGroundSpeed(speed) {
            constants.groundSpeed = speed;
        }
    };
})();