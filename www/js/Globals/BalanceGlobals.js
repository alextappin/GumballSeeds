/**
 * Created by ajt on 4/25/2016.
 */
function BalanceGlobals() {
    var constants = {};

    constants.enemies = 2;
    constants.enemiesPositionChance = 2;
    constants.gumballs = 1;
    constants.createNewEnemiesCounter = 50;
    constants.loopScoreIncrementTime = 10;
    constants.enemyPoints = 200;
    constants.runningScore = 1;
    constants.superScore = 28;
    constants.pickupGumballScore = 500;
    constants.enemyDamage = 2;
    constants.enemiesToAdd = 1;
    constants.gumballsToAdd = 1;
    constants.continueGame = true;

    constants.maxLives = 22;

    //Character Specific
    constants.isAttacking = false;
    constants.isComboAttacking = false;
    constants.attackTime = 21;
    constants.jumpAttackTime = 39;

    //Enemy Specific
    constants.enemySpeed = MainGlobals.ScreenHeight/60;
    constants.enemyExplode = MainGlobals.ScreenHeight/100;

    return constants;
}