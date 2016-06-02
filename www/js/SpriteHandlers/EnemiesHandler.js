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
        this.enemies.push(new Enemy());
    }
};

EnemiesHandler.prototype.setPositionAndScale = function(enemyHandler) {
    for (var n = 0; n < enemyHandler.enemies.length; n++) {
        enemyHandler.enemies[n].setPositionAndScale(enemyHandler.enemies[n]);
    }
};

EnemiesHandler.prototype.addEnemiesToStage = function(enemyHandler, stage) {
    this.setupEnemyStructure(enemyHandler);

    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        stage.addChild(enemyHandler.enemyStructure[n]);
    }
};

EnemiesHandler.prototype.setupEnemyStructure = function(enemyHandler) {
    MainGlobals.Helpers.shuffleArray(enemyHandler.enemies); //shuffle the enemies. This will prove useful later once enemies are unique

    enemyHandler.enemyStructure.push( //3 enemies in the queue
        enemyHandler.enemies.pop(),
        enemyHandler.enemies.pop()
    );

    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) { //start them off the screen so we can move them later.
        enemyHandler.enemyStructure[n].position = MainGlobals.Helpers.getNewPoint(
            MainGlobals.ScreenWidth/2 + n*400,
            40
        );
    }
};

EnemiesHandler.prototype.update = function(enemyHandler, characterObj, groundObj, stage) {
    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]);
    }

    for (var i = 0; i < enemyHandler.explodingEnemies.length; i++) {
        enemyHandler.explodingEnemies[i].explode(enemyHandler.explodingEnemies[i]);
    }

    for (n = 0; n < enemyHandler.successEnemies.length; n++) {
        enemyHandler.successEnemies[n].succeed(enemyHandler.successEnemies[n]);
    }

    if (enemyHandler.enemyStructure.length > 0) {
        this.handleOffScreen(enemyHandler, groundObj, stage);
        this.characterCollide(enemyHandler, characterObj, groundObj);
    }
};
EnemiesHandler.prototype.updatePowerUp = function(enemyHandler, characterObj, groundObj, stage) {
    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]); //will just move them/explode
    }

    for (n = 0; n < enemyHandler.explodingEnemies.length; n++) {
        enemyHandler.explodingEnemies[n].explode(enemyHandler.explodingEnemies[n]);
    }

    for (n = 0; n < enemyHandler.successEnemies.length; n++) {
        enemyHandler.successEnemies[n].succeed(enemyHandler.successEnemies[n]);
    }

    if (enemyHandler.enemyStructure.length > 0) {
        this.handleOffScreen(enemyHandler, groundObj, stage);
        this.characterCollide(enemyHandler, characterObj, groundObj);
    }
};

EnemiesHandler.prototype.handleOffScreen = function(enemyHandler, groundObj, stage) {
    if (enemyHandler.enemyStructure.length > 0 && enemyHandler.enemyStructure[0].position.x < (0 - enemyHandler.enemyStructure[0].width)) {
        this.returnPiece(enemyHandler.enemyStructure.shift(), enemyHandler, stage);
        this.addNewEnemy(enemyHandler, groundObj, stage);
    }

    if (enemyHandler.explodingEnemies.length > 0 && enemyHandler.explodingEnemies[0].position.x > MainGlobals.ScreenWidth) {
        this.returnPiece(enemyHandler.explodingEnemies.shift(), enemyHandler, stage);
        this.addNewEnemy(enemyHandler, groundObj, stage);
    }

    if (enemyHandler.successEnemies.length > 0 && enemyHandler.successEnemies[0].position.x < 0 - enemyHandler.successEnemies[0].width) {
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

EnemiesHandler.prototype.characterCollide = function(enemyHandler, characterObj, groundObj) {
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

    MainGlobals.ScoreHelper.getHitByEnemy();
};

EnemiesHandler.prototype.death = function(enemyHandler) {
    enemyHandler.explodingEnemies.push(
        enemyHandler.enemyStructure.shift()
    );

    MainGlobals.ScoreHelper.killEnemy();
};

EnemiesHandler.prototype.addNewEnemy = function(enemyHandler, groundObj, stage) {
    enemyHandler.enemyStructure.push(
        enemyHandler.enemies.pop()
    );

    enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1].position = this.getNewPosition(
        enemyHandler,
        groundObj
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