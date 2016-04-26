function ScoreHelper() {
    var scoreHelpers = {};
    scoreHelpers.killEnemy = function(enemyPoints) {
        ScoreGlobals.currentScore = ScoreGlobals.currentScore + enemyPoints;
        ScoreGlobals.kills++;
        PowerUpHelper().incrementPowerUp();
    };
    scoreHelpers.getHitByEnemy = function(enemyDamage) {
        PowerUpGlobals.powerBarLevel = (PowerUpGlobals.powerBarLevel > 0 ? PowerUpGlobals.powerBarLevel - 1 : 0);
        ScoreGlobals.lives -= 1;

    };
    scoreHelpers.runningScore = function() {
        ScoreGlobals.currentScore = ScoreGlobals.currentScore + ScoreGlobals.runningScore;
    };
    scoreHelpers.createNewEnemy = function() {
        return ScoreGlobals.kills % BalanceGlobals.createNewEnemiesCounter === 0;
    };
    scoreHelpers.pickupGumball = function() {
        ScoreGlobals.currentScore = ScoreGlobals.currentScore + ScoreGlobals.pickupGumballScore;
    };
    scoreHelpers.updateScore = function() {
        MapGlobals.loopCounter++;
        if (MapGlobals.loopCounter % BalanceGlobals.loopScoreIncrementTime === 0) {
            scoreHelpers.runningScore();
        }
    };
    return scoreHelpers;
}