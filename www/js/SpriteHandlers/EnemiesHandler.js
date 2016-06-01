/**
 * Created by ajt on 4/17/2016.
 */
function EnemiesHandler() {
    //array of enemy objects
    this.enemies = [];
    this.enemyStructure = [];
    this.constructEnemies();
}

EnemiesHandler.constructor = EnemiesHandler;

EnemiesHandler.prototype.constructEnemies = function() {
    for (var n = 0; n < MainGlobals.Map.enemiesPool; n++) {
        this.enemies.push(new Enemy);
    }
};

EnemiesHandler.prototype.setPositionAndScale = function(enemyHandler) {
    for (var n = 0; n < enemyHandler.enemies.length; n++) {
        enemyHandler.enemies[n].setPositionAndScale(enemyHandler.enemies[n]);
    }
};

EnemiesHandler.prototype.addEnemiesToStage = function(enemyHandler, stage) {
    this.setupEnemyStructure(enemyHandler);

    for (var n = 0; n < enemyHandler.enemies.length; n++) {
        stage.addChild(enemyHandler.enemies[n]);
    }
};

EnemiesHandler.prototype.setupEnemyStructure = function(enemyHandler) {
    MainGlobals.Helpers.shuffleArray(enemyHandler.enemies); //shuffle the enemies. This will prove useful later once enemies are unique

    enemyHandler.enemyStructure.push( //3 enemies in the queue
        enemyHandler.enemies.pop(),
        enemyHandler.enemies.pop(),
        enemyHandler.enemies.pop()
    );

    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) { //start them off the screen so we can move them later.
        enemyHandler.enemyStructure[n].position = MainGlobals.Helpers.getNewPoint(
            0-enemyHandler.enemyStructure[n].width,
            0
        );
    }
};

EnemiesHandler.prototype.update = function(enemyHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]); //will just move them/expload
    }

    this.handleOffScreen(enemyHandler, groundObj, stage);
    this.characterCollide(enemyHandler, groundObj, characterObj);
};
EnemiesHandler.prototype.updatePowerUp = function(enemyHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]); //will just move them/expload
    }

    this.handleOffScreen(enemyHandler, groundObj, stage);
    this.characterCollide(enemyHandler, groundObj, characterObj);
};

EnemiesHandler.prototype.handleOffScreen = function(enemyHandler, groundObj, stage) {

};

EnemiesHandler.prototype.characterCollide = function(enemyHandler, groundObj, stage) {

};

EnemiesHandler.prototype.returnPiece = function(piece, enemyHandler, stage) {

};