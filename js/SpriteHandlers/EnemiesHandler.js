/**
 * Created by ajt on 4/17/2016.
 */
function EnemiesHandler() {
    this.enemies = [];
    this.constructEnemies();
}

EnemiesHandler.constructor = EnemiesHandler;

EnemiesHandler.prototype.update = function(enemyHandler, characterObj) {
/*    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        if (this.Properties.enemies[n]) {
            this.Properties.enemies[n].update(this.Properties.enemies[n], this.Properties.character);
        }
        //if there are not enough enemies, add another
        else {
            this.createEnemies(1, this.getStage());
        }
    }*/



    for (var n = 0; n < this.enemies.length; n++) {
        this.enemies[n].update(this.enemies[n], characterObj);
    }
};

EnemiesHandler.prototype.constructEnemies = function() {
    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        this.enemies.push(new Enemy);
    }
};

EnemiesHandler.prototype.setPositionAndScale = function() {
    for (var n = 0; n < this.enemies.length; n++) {
        this.enemies[n].setPositionAndScale();
    }
};

EnemiesHandler.prototype.addEnemy = function(stage) {
    this.enemies.push(new Enemy);
    stage.addChild(this.enemies[this.enemies.length - 1]);
    GameVariables.setEnemies(GameVariables.getEnemies() + 1);
};

EnemiesHandler.prototype.removeEnemy = function(index, stage) {
    if (this.enemies.length > 0) {
        stage.removeChild(this.enemies[index]);
        this.enemies.splice(index, 1);
    }

    GameVariables.setEnemies(GameVariables.getEnemies() + 1);
};

EnemiesHandler.prototype.addEnemiesToStage = function(stage) {
    for (var n = 0; n < this.enemies.length; n++) {
        stage.addChild(this.enemies[n]);
    }
};