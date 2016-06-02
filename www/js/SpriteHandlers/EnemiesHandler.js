/**
 * Created by ajt on 4/17/2016.
 */
function EnemiesHandler() {
    //array of enemy objects
    this.enemies = [];
    this.enemyStructure = [];
    this.explodingEnemies = [];
    this.successEnemies = [];
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
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]); //will just move them/explode
    }

    for (n = 0; n < enemyHandler.explodingEnemies.length; n++) {
        enemyHandler.explodingEnemies[n].explode(enemyHandler.explodingEnemies[n]);
    }

    for (n = 0; n < enemyHandler.successEnemies.length; n++) {
        enemyHandler.explodingEnemies[n].(enemyHandler.explodingEnemies[n]);
    }

    this.handleOffScreen(enemyHandler, groundObj, stage);
    this.characterCollide(enemyHandler, groundObj, characterObj);
};
EnemiesHandler.prototype.updatePowerUp = function(enemyHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]); //will just move them/explode
    }

    for (n = 0; n < enemyHandler.explodingEnemies.length; n++) {
        enemyHandler.explodingEnemies[n].explode(enemyHandler.explodingEnemies[n]);
    }

    for (n = 0; n < enemyHandler.successEnemies.length; n++) {
        enemyHandler.explodingEnemies[n].success(enemyHandler.explodingEnemies[n]);
    }

    this.handleOffScreen(enemyHandler, groundObj, stage);
    this.characterCollide(enemyHandler, groundObj, characterObj);
};

EnemiesHandler.prototype.handleOffScreen = function(enemyHandler, groundObj, stage) {
    if (enemyHandler.enemyStructure[0].position.x < 0 - enemyHandler.enemyStructure[0].width) {
        this.returnPiece(enemyHandler.enemyStructure.shift(), enemyHandler, stage);
        this.addNewEnemy(enemyHandler, groundObj, stage);
    }

    if (enemyHandler.explodingEnemies[0].position.x > MainGlobals.ScreenWidth) {
        this.returnPiece(enemyHandler.explodingEnemies.shift(), enemyHandler, stage);
        this.addNewEnemy(enemyHandler, groundObj, stage);
    }

    if (enemyHandler.successEnemies[0].position.x < 0 - enemyHandler.successEnemies[0].width) {
        this.returnPiece(enemyHandler.successEnemies.shift(), enemyHandler, stage);
        this.addNewEnemy(enemyHandler, groundObj, stage);
    }
};

EnemiesHandler.prototype.getNewPosition = function(enemyHandler, groundObj) { //use the ground height eventually
    enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1].position = MainGlobals.Helpers.getNewPoint(
        MainGlobals.Helpers.getRandomNumber(
            enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-2].position.x,
            enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-2].position.x*MainGlobals.Balance.enemiesPositionChance
        ),
        MainGlobals.Helpers.getRandomNumber(
            enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1].height,
            MainGlobals.Map.groundY - enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1].height
        )
    );
};

EnemiesHandler.prototype.characterCollide = function(enemyHandler, groundObj, characterObj) {
    if (MainGlobals.Helpers.isIntersecting(enemyHandler.enemyStructure[0], characterObj)) {
        if (MainGlobals.Balance.isAttacking) {
            this.death(enemyHandler, stage);
        } else {
            this.hurtCharacter(enemyHandler);
        }
    }
};

EnemiesHandler.prototype.hurtCharacter = function(enemyHandler) {
    enemyHandler.successEnemies.push(
        enemyHandler.enemyStructure.shift()
    );

    MainGlobals.Score.getHitByEnemy();
};

EnemiesHandler.prototype.death = function(enemyHandler, characterObj) {
    enemyHandler.explodingEnemies.push(
        enemyHandler.enemyStructure.shift()
    );

    MainGlobals.Score.killEnemy();
};

EnemiesHandler.prototype.addNewEnemy = function(enemyHandler, groundObj, stage) {
    enemyHandler.enemyStructure.push(
        enemyHandler.enemies.pop()
    );

    enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1].position = this.getNewPosition(
        enemyHandler,
        enemyHandler.enemyStructure.length-1,
        groundObj,
        0
    );

    stage.addChildAt(
        enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1],
        MainGlobals.Map.addEnemyChildConst
    );
};

EnemiesHandler.prototype.returnPiece = function(piece, enemyHandler, stage) {
    stage.removeChild(piece);
    enemyHandler.enemies.push(piece);
    MainGlobals.Helpers.shuffleArray(enemyHandler.enemies);
};