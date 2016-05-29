function ScoreHelper() {
    var scoreHelpers = {};

    scoreHelpers.killEnemy = function(enemyPoints) {
        ScoreGlobals.currentScore += enemyPoints;
        ScoreGlobals.kills++;
        PowerUpHelper().incrementPowerUp();
    };

    scoreHelpers.getHitByEnemy = function() {
        PowerUpGlobals.powerBarLevel = (PowerUpGlobals.powerBarLevel > HelperFunctions().returnZero() ? PowerUpGlobals.powerBarLevel - MainGlobals.Balance.enemyDamage : 0);
        ScoreGlobals.lives -= MainGlobals.Balance.enemyDamage;
    };

    scoreHelpers.runningScore = function() {
        ScoreGlobals.currentScore = ScoreGlobals.currentScore + MainGlobals.Balance.runningScore;
    };

    scoreHelpers.createNewEnemy = function() {
        return ScoreGlobals.kills % MainGlobals.Balance.createNewEnemiesCounter === HelperFunctions().returnZero();
    };

    scoreHelpers.pickupGumball = function() {
        ScoreGlobals.currentScore = ScoreGlobals.currentScore + MainGlobals.Balance.pickupGumballScore;
    };

    scoreHelpers.updateScore = function() {
        MainGlobals.Map.loopCounter++;
        if (MainGlobals.Map.loopCounter % MainGlobals.Balance.loopScoreIncrementTime === 0) {
            scoreHelpers.runningScore();
        }
    };

    return scoreHelpers;
}