/**
 * Created by ajt on 11/29/2015.
 */

CONST = 1;
function Scroller(stage) {
    this.far = new Far();
    stage.addChild(this.far);

    this.mid = new Mid();
    stage.addChild(this.mid);

    this.mid2 = new Mid2();
    stage.addChild(this.mid2);

    this.front = new Walls();
    stage.addChild(this.front);

    this.character = new Character();
    this.character.position.y = 50;
    this.character.position.x = 65;
    this.character.scale.x = .5;
    this.character.scale.y = .5;
    stage.addChild(this.character);

    this.enemies = [];
    this.createEnemies(CONST, stage);

    this.mapBuilder = new MapBuilder(this.front);

    this.viewportX = 0;
    this.getStage = function() {
        return stage;
    }
}
//

Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.mid2.setViewportX(viewportX);
    this.front.setViewportX(viewportX);
    this.updateSprites();
    this.jumpCharacter();
    this.attackCharacter();
    this.moveCharacterX();
    this.moveEnemies();
    this.writeScoreAndLives();
    this.applyFallingGravityToCharacter();
    if (this.front.slicesAreLow()) {
        //TODO:if slices are low, find which slice types are low and ADD THOSE ONES THAT ARE LOW
        this.mapBuilder.addAndBuildRandomSequence();
    }
};

Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};


//TODO put the jump character and apply falling gravity to character in same function. Grab the next and current slices one time. this will helper performance.

Scroller.prototype.jumpCharacter = function() {
    if (this.character.charIsJumping()) {
        this.character.position.y = this.character.moveHeightJumping(this.character.position.y, this.front.getCurrentSliceHeight(this.character.position.x), this.front.getNextSliceHeight(this.character.position.x));
    }
    else {
        this.character.endJumping(this.character.position.y);
    }
};

Scroller.prototype.applyFallingGravityToCharacter = function() {
    this.character.checkIfFalling(this.front.getCurrentSliceHeight(), this.front.getNextSliceHeight());
};

Scroller.prototype.attackCharacter = function() {
    if (this.character.isAttacking) {
        this.character.attackingTime -= 1;
    }
    if (this.character.attackingTime == 0) {
        this.character.stopAttacking();
    }
};

Scroller.prototype.moveCharacterX = function() {
    if (this.character.isMovingLeft) {
        this.character.position.x -= 3;
    }
    if (this.character.isMovingRight) {
        this.character.position.x += 5;
    }/*
    this.character.position.x -= 2;*/
};

//TODO make a random global function where I pass the bounds and return the random number...
Scroller.prototype.createEnemies = function(enemies, stage) {
    for (var n = 0; n < enemies; n++) {
        this.enemy = new Enemy();
        var obj = this.enemy.getUpdatedPositionVariables(-100, 800);
        this.enemy.position.y = obj.y;
        this.enemy.position.x = obj.x;
        var rand = Math.floor((Math.random() * 5) + 3);

        this.enemy.scale.x = rand/10;
        this.enemy.scale.y = rand/10;
        this.enemies.push(this.enemy);
        stage.addChild(this.enemy);
    }
};

Scroller.prototype.moveEnemies = function() {
    for (var n = 0; n < CONST; n++) {
        var obj = this.enemies[n].getUpdatedPositionVariables(this.enemies[n].position.x, this.enemies[n].position.y);
        this.enemies[n].position.x = obj.x;
        this.enemies[n].position.y = obj.y;
        if (this.enemies[n].isIntersecting(this.character, this.enemies[n])) {
            if (this.character.isAttacking) {
                //give more points
                //make more enemies
                this.character.enemiesKilled += 1;
                if (this.character.enemiesKilled%15 == 0) {
                    this.createEnemies(1, this.getStage());
                    CONST += 1;
                }
            }
            else {
                this.character.lives -= 1;
                if (this.character.lives < 0) {
                    this.character.continueGame = false;
                    this.character.jumping = true;
                }
            }

            this.enemies[n].updateVelocity();
            var newObj = this.enemies[n].getNewPositions();
            this.enemies[n].position.x = newObj.x;
            this.enemies[n].position.y = newObj.y;
        }
    }
};
Scroller.prototype.updateSprites = function() {
    this.character.updateSprite();
    for (var n = 0; n < CONST; n++) {
        this.enemies[n].updateSprite();
    }
};

Scroller.prototype.writeScoreAndLives = function() {
    this.getStage().removeChild(this.text);
    this.text = new PIXI.Text("Killed  " + this.character.enemiesKilled + "       Lives  " + (this.character.lives + 1) , {font:"25px Arial", fill:"#1144FF"});
    this.getStage().addChild(this.text);
};