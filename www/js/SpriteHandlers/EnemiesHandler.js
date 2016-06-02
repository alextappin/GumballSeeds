/**
 * Created by ajt on 4/17/2016.
 */

/**
 * Created by ajt on 4/18/2016.
 */
/*
function EnemyHandler() {
    this.enemies = []; //array of gumball objects pool
    this.enemyStructure = [];
    this.constructEnemy();
}

EnemyHandler.constructor = EnemyHandler;

EnemyHandler.prototype.constructEnemy = function() {
    for (var n = 0; n < MainGlobals.Map.enemiesPool; n++) { //there will be 3 of each color in the array...
        this.enemies.push(new Enemy());
    }
};

EnemyHandler.prototype.setPositionAndScale = function(enemyHandler) {
    for (var n = 0; n < enemyHandler.enemies.length; n++) {
        enemyHandler.enemies[n].setPositionAndScale(enemyHandler.enemies[n]);
    }
};

EnemyHandler.prototype.addEnemyToStage = function(enemyHandler, stage) {
    this.setupStartEnemy(enemyHandler);

    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        stage.addChild(enemyHandler.enemyStructure[n]);
    }
};

EnemyHandler.prototype.setupStartEnemy = function(enemyHandler) {
    MainGlobals.Helpers.shuffleArray(enemyHandler.enemies); //shuffle the array of gumball objects...

    enemyHandler.enemyStructure.push( //2 enemies at a time... maximum
        enemyHandler.enemies.pop(),
        enemyHandler.enemies.pop()
    );

    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].position = MainGlobals.Helpers.getNewPoint(
            0-enemyHandler.enemyStructure[n].width,
            0
        );
    }
};

EnemyHandler.prototype.getNewPosition = function(enemyHandler, index, groundObj, recurseAdd) {
    return MainGlobals.Helpers.getNewPoint(
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

EnemyHandler.prototype.calculateRandomSpace = function() {
    //1/x of the screen width * a random number between 1 and 15. Example (1280/x) * 5 =  6400/x unit space
    return (MainGlobals.ScreenWidth / MainGlobals.Map.gumballSpaceConst) * (MainGlobals.Helpers.getRandomNumber(4, 10))
};

EnemyHandler.prototype.update = function(enemyHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]);
    }

    this.handleOffScreen(enemyHandler, groundObj, stage);
    this.characterGrab(enemyHandler, characterObj, groundObj, stage);
};

EnemyHandler.prototype.updatePowerUp = function(enemyHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < enemyHandler.enemyStructure.length; n++) {
        enemyHandler.enemyStructure[n].update(enemyHandler.enemyStructure[n]);
    }

    this.handleOffScreen(enemyHandler, groundObj, stage);
    this.characterGrab(enemyHandler, characterObj, groundObj, stage);
};

EnemyHandler.prototype.handleOffScreen = function(enemyHandler, groundObj, stage) {
    if (enemyHandler.enemyStructure[0].position.x < 0 - enemyHandler.enemyStructure[0].width) {
        this.returnPiece(enemyHandler.enemyStructure.shift(), enemyHandler, stage);
        this.addNewGumball(enemyHandler, groundObj, stage);
    }
};

EnemyHandler.prototype.returnPiece = function(piece, enemyHandler, stage) {
    stage.removeChild(piece);
    enemyHandler.enemies.push(piece);
    MainGlobals.Helpers.shuffleArray(enemyHandler.enemies);
};

EnemyHandler.prototype.addNewGumball = function(enemyHandler, groundObj, stage) {
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
        MainGlobals.Map.addGumballChildConst
    );
};

EnemyHandler.prototype.characterGrab = function(enemyHandler, characterObj, groundObj, stage) {
    if (MainGlobals.Helpers.isIntersecting(enemyHandler.enemyStructure[0], characterObj)) {
        this.characterPickedUp(enemyHandler, groundObj, stage);
    }
};

EnemyHandler.prototype.characterPickedUp = function(enemyHandler, groundObj, stage) {
    MainGlobals.ScoreHelper.pickupGumball(enemyHandler.enemyStructure[0].Properties.color);
    this.returnPiece(enemyHandler.enemyStructure.shift(), enemyHandler, stage);
    this.addNewGumball(enemyHandler, groundObj, stage);
};
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
        this.characterCollide(enemyHandler, characterObj, groundObj, stage);
    } else {
        this.handleOffScreen(enemyHandler, groundObj, stage);
        this.addNewEnemy(enemyHandler, groundObj, stage);
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

    if (enemyHandler.enemyStructure.length < 0) {
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
    if (enemyHandler.enemyStructure.length > 1) {
        return MainGlobals.Helpers.getNewPoint(
            MainGlobals.Helpers.getRandomNumber(
                enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-2].position.x + MainGlobals.ScreenWidth,
                enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-2].position.x + MainGlobals.ScreenWidth
            ),
            MainGlobals.Helpers.getRandomNumber(
                enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1].height,
                groundObj.getHeightAtPositionX(50, groundObj)
            )
        );

    }
    return MainGlobals.Helpers.getNewPoint(
        MainGlobals.ScreenWidth*2,
        MainGlobals.Helpers.getRandomNumber(
            enemyHandler.enemyStructure[enemyHandler.enemyStructure.length-1].height,
            groundObj.getHeightAtPositionX(50, groundObj)
        )

    );
};

EnemiesHandler.prototype.characterCollide = function(enemyHandler, characterObj, groundObj, stage) {
    if (MainGlobals.Helpers.isIntersecting(enemyHandler.enemyStructure[0], characterObj)) { //front enemy
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
    if (enemyHandler.enemies.length > 0) {
        enemyHandler.enemyStructure.push(
            enemyHandler.enemies.pop()
        );

        enemyHandler.enemyStructure[enemyHandler.enemyStructure.length - 1].position = this.getNewPosition(
            enemyHandler,
            groundObj
        );

        stage.addChildAt(
            enemyHandler.enemyStructure[enemyHandler.enemyStructure.length - 1],
            MainGlobals.Map.addEnemyChildConst
        );
    }
};

EnemiesHandler.prototype.returnPiece = function(piece, enemyHandler, stage) {
    stage.removeChild(piece);
    enemyHandler.enemies.push(piece);
    MainGlobals.Helpers.shuffleArray(enemyHandler.enemies);
};
