function ScoreHelper() {
    var scoreHelpers = {};
    scoreHelpers.killEnemy = function(enemyPoints) {
        GameVariables.setCurrentScore(GameVariables.getCurrentScore() + enemyPoints);
        GameVariables.setKills(GameVariables.getKills() + 1);
    };
    scoreHelpers.runningScore = function() {
        GameVariables.setCurrentScore(GameVariables.getCurrentScore() + 1);
    };
    scoreHelpers.createNewEnemy = function() {
        return GameVariables.getKills() % GameVariables.getNewEnemyCounter() === 0;
    };
    scoreHelpers.updateScore = function() {
        GameVariables.incrementLoopCounter();
        if (GameVariables.getLoopCounter() % GameVariables.getLoopScoreIncrement() === 0) {
            GameVariables.setCurrentScore(GameVariables.getCurrentScore() + 1);
        }
    };
    return scoreHelpers;
}