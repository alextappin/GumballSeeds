function ScoreHelper() {
    var scoreHelpers = {};

    scoreHelpers.killEnemy = function() {
        MainGlobals.Score.currentScore += (MainGlobals.Balance.enemyPoints*(MainGlobals.Score.combo+1));
        MainGlobals.Score.combo++;
        MainGlobals.Score.kills++;
    };

    scoreHelpers.getHitByEnemy = function() {
        //MainGlobals.Score.lives -= MainGlobals.Helpers.getRandomNumber(1,5);
        MainGlobals.Score.combo = 0;
        MainGlobals.Helpers.playSound("CharacterHit",.4);
    };

    scoreHelpers.runningScore = function() {
        if (MainGlobals.PowerUp.powerUpActive) {
            MainGlobals.Score.currentScore = MainGlobals.Score.currentScore + (MainGlobals.Balance.superScore * MainGlobals.Score.combo+1);
            MainGlobals.Balance.loopScoreIncrementTime = 3;
        } else {
            MainGlobals.Score.currentScore = MainGlobals.Score.currentScore + MainGlobals.Balance.runningScore;
            MainGlobals.Balance.loopScoreIncrementTime = 20;
        }
    };

    scoreHelpers.createNewEnemy = function() {
        return MainGlobals.Score.kills % MainGlobals.Balance.createNewEnemiesCounter === MainGlobals.Helpers.returnZero();
    };

    scoreHelpers.pickupGumball = function(color) {
        if (color == MainGlobals.Map.gumballs[MainGlobals.PowerUp.powerBarLevel]) {
            MainGlobals.PowerHelper.incrementPowerUp();
            MainGlobals.Helpers.playSound("AddPower",.5);
            MainGlobals.Score.combo++;
            MainGlobals.Score.currescore+=(MainGlobals.Balance.pickupGumballScore * MainGlobals.Score.combo+1);
        } else {
            if (!MainGlobals.PowerUp.powerUpActive) {
                MainGlobals.PowerHelper.decrementPowerUp();
                MainGlobals.Score.combo = 0;
            }
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