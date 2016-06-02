function ScoreHelper() {
    var scoreHelpers = {};

    scoreHelpers.killEnemy = function() {
        MainGlobals.Score.currentScore += MainGlobals.Balance.enemyPoints;
        MainGlobals.Score.kills++;
    };

    scoreHelpers.getHitByEnemy = function() {
        MainGlobals.Score.lives -= MainGlobals.Balance.enemyDamage;
    };

    scoreHelpers.runningScore = function() {
        MainGlobals.Score.currentScore = MainGlobals.Score.currentScore + MainGlobals.Balance.runningScore;
    };

    scoreHelpers.createNewEnemy = function() {
        return MainGlobals.Score.kills % MainGlobals.Balance.createNewEnemiesCounter === MainGlobals.Helpers.returnZero();
    };

    scoreHelpers.pickupGumball = function(color) {
        if (color == MainGlobals.Map.gumballs[MainGlobals.PowerUp.powerBarLevel]) {
            MainGlobals.PowerHelper.incrementPowerUp();
            if (MainGlobals.Score.lives < MainGlobals.Balance.maxLives) {
                MainGlobals.Score.lives++;
            }
        } else {
            MainGlobals.PowerHelper.decrementPowerUp();
        }
    };

    scoreHelpers.updateScore = function() {
        MainGlobals.Map.loopCounter++;
        if (MainGlobals.Map.loopCounter % MainGlobals.Balance.loopScoreIncrementTime === 0) {
            scoreHelpers.runningScore();
        }
    };

    return scoreHelpers;
}