/**
 * Created by ajt on 4/17/2016.
 */
function EnemiesHandler() {
    //array of enemy objects
    this.enemies = [];
    this.constructEnemies();
}

EnemiesHandler.constructor = EnemiesHandler;

EnemiesHandler.prototype.constructEnemies = function() {
    for (var n = 0; n < BalanceGlobals.enemies; n++) {
        this.enemies.push(new Enemy);
    }
};

EnemiesHandler.prototype.setPositionAndScale = function(enemyHandler) {
    for (var n = 0; n < enemyHandler.enemies.length; n++) {
        enemyHandler.enemies[n].setPositionAndScale(enemyHandler.enemies[n]);
    }
};

EnemiesHandler.prototype.addEnemiesToStage = function(enemyHandler, stage) {
    for (var n = 0; n < enemyHandler.enemies.length; n++) {
        stage.addChild(enemyHandler.enemies[n]);
    }
};

EnemiesHandler.prototype.update = function(enemyHandler, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.enemies; n++) {
        if (enemyHandler.enemies[n]) {
            enemyHandler.enemies[n].update(enemyHandler.enemies[n], characterObj);
        }
        //if there are not enough enemies, add another
        else {
            this.addEnemy(1, stage, enemyHandler);
        }
    }
};
EnemiesHandler.prototype.updatePowerUp = function(enemyHandler, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.enemies; n++) {
        if (enemyHandler.enemies[n]) {
            enemyHandler.enemies[n].updatePowerUp(enemyHandler.enemies[n], characterObj);
        }
        //if there are not enough enemies, add another
        else {
            this.addEnemy(1, stage, enemyHandler);
        }
    }
};

EnemiesHandler.prototype.addEnemy = function(numberToAdd, stage, enemyHandler) {
    for (var n = 0; n < numberToAdd; n++) {
        var enemy = new Enemy();
        enemy.setPositionAndScale(enemy);
        enemyHandler.enemies.push(enemy);
        stage.addChild(enemy);
    }
};

EnemiesHandler.prototype.removeEnemy = function(index, stage) {
    if (this.enemies.length > 0) {
        stage.removeChild(this.enemies[index]);
        this.enemies.splice(index, 1);
    }
};