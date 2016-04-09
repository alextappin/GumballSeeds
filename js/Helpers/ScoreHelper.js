function ScoreHelper() {
    var scoreHelpers = {};
    scoreHelpers.killEnemy = function(enemyPoints) {
        GameVariables.setCurrentScore(GameVariables.getCurrentScore() + enemyPoints);
        GameVariables.setKills(GameVariables.getKills() + 1);
        GameVariables.setPowerBarScore(GameVariables.getPowerBarScore() < 6 ? GameVariables.getPowerBarScore() + 1 : 6);
    };
    scoreHelpers.getHitByEnemy = function(enemyDamage) {
        GameVariables.setPowerBarScore(GameVariables.getPowerBarScore() > 0 ? GameVariables.getPowerBarScore() - 1 : 0);
    };
    scoreHelpers.runningScore = function() {
        GameVariables.setCurrentScore(GameVariables.getCurrentScore() + 1);
    };
    scoreHelpers.createNewEnemy = function() {
        return GameVariables.getKills() % GameVariables.getNewEnemyCounter() === 0;
    };
    scoreHelpers.pickupGumball = function() {
        GameVariables.setCurrentScore(GameVariables.getCurrentScore() + 1);
    };
    scoreHelpers.updateScore = function() {
        GameVariables.incrementLoopCounter();
        if (GameVariables.getLoopCounter() % GameVariables.getLoopScoreIncrement() === 0) {
            scoreHelpers.runningScore();
        }
    };
    return scoreHelpers;
}