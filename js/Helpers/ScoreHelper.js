function ScoreHelper() {
    var scoreHelpers = {};

    scoreHelpers.killEnemy = function(enemyPoints) {
        ScoreGlobals.currentScore += enemyPoints;
        ScoreGlobals.kills++;
        PowerUpHelper().incrementPowerUp();
    };

    scoreHelpers.getHitByEnemy = function() {
        PowerUpGlobals.powerBarLevel = (PowerUpGlobals.powerBarLevel > HelperFunctions().returnZero() ? PowerUpGlobals.powerBarLevel - BalanceGlobals.enemyDamage : 0);
        ScoreGlobals.lives -= BalanceGlobals.enemyDamage;
    };

    scoreHelpers.runningScore = function() {
        ScoreGlobals.currentScore = ScoreGlobals.currentScore + BalanceGlobals.runningScore;
    };

    scoreHelpers.createNewEnemy = function() {
        return ScoreGlobals.kills % BalanceGlobals.createNewEnemiesCounter === HelperFunctions().returnZero();
    };

    scoreHelpers.pickupGumball = function() {
        ScoreGlobals.currentScore = ScoreGlobals.currentScore + BalanceGlobals.pickupGumballScore;
    };

    scoreHelpers.updateScore = function() {
        MapGlobals.loopCounter++;
        if (MapGlobals.loopCounter % BalanceGlobals.loopScoreIncrementTime === 0) {
            scoreHelpers.runningScore();
        }
    };

    return scoreHelpers;
}