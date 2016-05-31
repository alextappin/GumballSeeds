function ScoreHelper() {
    var scoreHelpers = {};

    scoreHelpers.killEnemy = function(enemyPoints) {
        MainGlobals.Score.currentScore += enemyPoints;
        MainGlobals.Score.kills++;
        PowerUpHelper().incrementPowerUp();
    };

    scoreHelpers.getHitByEnemy = function() {
        MainGlobals.PowerUp.powerBarLevel = (MainGlobals.PowerUp.powerBarLevel > HelperFunctions().returnZero() ? MainGlobals.PowerUp.powerBarLevel - MainGlobals.Balance.enemyDamage : 0);
        MainGlobals.Score.lives -= MainGlobals.Balance.enemyDamage;
    };

    scoreHelpers.runningScore = function() {
        MainGlobals.Score.currentScore = MainGlobals.Score.currentScore + MainGlobals.Balance.runningScore;
    };

    scoreHelpers.createNewEnemy = function() {
        return MainGlobals.Score.kills % MainGlobals.Balance.createNewEnemiesCounter === HelperFunctions().returnZero();
    };

    scoreHelpers.pickupGumball = function(color) {
        console.log(color);
        console.log(MainGlobals.Map.gumballs[MainGlobals.PowerUp.powerBarLevel]);
        if (color == MainGlobals.Map.gumballs[MainGlobals.PowerUp.powerBarLevel]) {
            PowerUpHelper().incrementPowerUp();
        } else {
            PowerUpHelper().decrementPowerUp();
        }

        //PowerUpHelper().decrementPowerUp();
        //MainGlobals.Score.currentScore = MainGlobals.Score.currentScore + MainGlobals.Balance.pickupGumballScore;
    };

    scoreHelpers.updateScore = function() {
        MainGlobals.Map.loopCounter++;
        if (MainGlobals.Map.loopCounter % MainGlobals.Balance.loopScoreIncrementTime === 0) {
            scoreHelpers.runningScore();
        }
    };

    return scoreHelpers;
}