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
    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        this.enemies.push(new Enemy);
    }
};

EnemiesHandler.prototype.setPositionAndScale = function() {
    for (var n = 0; n < this.enemies.length; n++) {
        this.enemies[n].setPositionAndScale(this.enemies[n]);
    }
};

EnemiesHandler.prototype.addEnemiesToStage = function(stage) {
    for (var n = 0; n < this.enemies.length; n++) {
        stage.addChild(this.enemies[n]);
    }
};

EnemiesHandler.prototype.update = function(enemyHandler, characterObj, stage) {
    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        if (enemyHandler.enemies[n]) {
            enemyHandler.enemies[n].update(enemyHandler.enemies[n], characterObj);
        }
        //if there are not enough enemies, add another
        else {
            this.addEnemy(1, stage);
        }
        enemyHandler.enemies[n].update(enemyHandler.enemies[n], characterObj);
    }
};

EnemiesHandler.prototype.addEnemy = function(numberToAdd, stage) {
    for (var n = 0; n < numberToAdd; n++) {
        this.enemies.push(new Enemy);
        stage.addChild(this.enemies[this.enemies.length - 1]);
    }
};

EnemiesHandler.prototype.removeEnemy = function(index, stage) {
    if (this.enemies.length > 0) {
        stage.removeChild(this.enemies[index]);
        this.enemies.splice(index, 1);
    }
};