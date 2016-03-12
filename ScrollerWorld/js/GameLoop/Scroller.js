/**
 * Created by ajt on 11/29/2015.
 */
function Scroller(stage) {
    this.constructScroller(stage);
    this.getStage = function() {
        return stage;
    }
}
//TODO have the character and ememies each hold THEIR own position.x.

Scroller.prototype.constructScroller = function(stage) {
    this.ScrollerProps = new ScrollerProperties();
    //Add to stage
    stage.addChild(this.ScrollerProps.far);
    stage.addChild(this.ScrollerProps.mid);
    stage.addChild(this.ScrollerProps.mid2);
    stage.addChild(this.ScrollerProps.front);
    //Add location props to character/enemies
    this.createCharacter(stage);
    this.createEnemies(GameVariables.getEnemies(), stage);
    //Start Building the Map
    this.ScrollerProps.mapBuilder = new MapBuilder(this.ScrollerProps.front);
};

Scroller.prototype.setViewportX = function(viewportX) {
    this.ScrollerProps.viewportX = viewportX;
    this.ScrollerProps.far.setViewportX(viewportX);
    this.ScrollerProps.mid.setViewportX(viewportX);
    this.ScrollerProps.mid2.setViewportX(viewportX);
    this.ScrollerProps.front.setViewportX(viewportX);
    this.updateSprites();
    this.jumpCharacter();
    this.attackCharacter();
    this.moveCharacterX();
    this.moveEnemies();
    this.writeScoreAndLives();
    this.applyFallingGravityToCharacter();
    if (this.ScrollerProps.front.slicesAreLow()) {
        //TODO:if slices are low, find which slice types are low and ADD THOSE ONES THAT ARE LOW
        this.ScrollerProps.mapBuilder.addAndBuildRandomSequence();
    }
};

Scroller.prototype.getViewportX = function() {
    return this.ScrollerProps.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
    this.setViewportX(this.ScrollerProps.viewportX + units);
};

Scroller.prototype.update = function() {
    this.updateViewport();
    this.ScrollerProps.far.setViewportX(this.ScrollerProps.viewportX);
    this.ScrollerProps.mid.setViewportX(this.ScrollerProps.viewportX);
    this.ScrollerProps.mid2.setViewportX(this.ScrollerProps.viewportX);
    this.ScrollerProps.front.setViewportX(this.ScrollerProps.viewportX);
    this.updateSprites();
    this.jumpCharacter();
    this.attackCharacter();
    this.moveCharacterX();
    this.moveEnemies();
    this.writeScoreAndLives();
    this.applyFallingGravityToCharacter();
    if (this.ScrollerProps.front.slicesAreLow()) {
        //TODO:if slices are low, find which slice types are low and ADD THOSE ONES THAT ARE LOW
        this.ScrollerProps.mapBuilder.addAndBuildRandomSequence();
    }
};

Scroller.prototype.updateViewport = function() {
    GameVariables.getCurrentScrollSpeed() > GameVariables.getMaxScrollSpeed() ? GameVariables.setCurrentScrollSpeed(GameVariables.getMaxScrollSpeed()) : null;
    this.ScrollerProps.viewportX = this.ScrollerProps.viewportX + GameVariables.getCurrentScrollSpeed();
};


//TODO put the jump character and apply falling gravity to character in same function. Grab the next and current slices one time. this will helper performance.

Scroller.prototype.jumpCharacter = function() {
    if (this.ScrollerProps.character.charIsJumping()) {
        this.ScrollerProps.character.position.y = this.ScrollerProps.character.moveHeightJumping(this.ScrollerProps.character.position.y, this.ScrollerProps.front.getCurrentSliceHeight(this.ScrollerProps.character.position.x), this.ScrollerProps.front.getNextSliceHeight(this.ScrollerProps.character.position.x));
    }
    else {
        this.ScrollerProps.character.endJumping(this.ScrollerProps.character.position.y);
    }
};

Scroller.prototype.applyFallingGravityToCharacter = function() {
    this.ScrollerProps.character.checkIfFalling(this.ScrollerProps.front.getCurrentSliceHeight(), this.ScrollerProps.front.getNextSliceHeight());
};

Scroller.prototype.attackCharacter = function() {
    if (this.ScrollerProps.character.CharacterProperties.isAttacking) {
        this.ScrollerProps.character.CharacterProperties.attackingTime -= 1;
    }
    if (this.ScrollerProps.character.CharacterProperties.attackingTime == 0) {
        this.ScrollerProps.character.stopAttacking();
    }
};

Scroller.prototype.moveCharacterX = function() {
    if (this.ScrollerProps.character.CharacterProperties.isMovingLeft) {
        this.ScrollerProps.character.position.x -= 3;
    }
    if (this.ScrollerProps.character.CharacterProperties.isMovingRight) {
        this.ScrollerProps.character.position.x += 5;
    }/*
    this.ScrollerProps.character.position.x -= 2;*/
};

Scroller.prototype.createCharacter = function(stage) {
    this.ScrollerProps.character.position.y = 50;
    this.ScrollerProps.character.position.x = 65;
    this.ScrollerProps.character.scale.x = .5;
    this.ScrollerProps.character.scale.y = .5;
    stage.addChild(this.ScrollerProps.character);
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
        this.ScrollerProps.enemies.push(this.enemy);
        stage.addChild(this.enemy);
    }
};

Scroller.prototype.moveEnemies = function() {
    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        var obj = this.ScrollerProps.enemies[n].getUpdatedPositionVariables(this.ScrollerProps.enemies[n].position.x, this.ScrollerProps.enemies[n].position.y);
        this.ScrollerProps.enemies[n].position.x = obj.x;
        this.ScrollerProps.enemies[n].position.y = obj.y;
        if (this.ScrollerProps.enemies[n].isIntersecting(this.ScrollerProps.character, this.ScrollerProps.enemies[n])) {
            if (this.ScrollerProps.character.CharacterProperties.isAttacking) {
                //give more points
                //make more enemies
                this.ScrollerProps.character.CharacterProperties.enemiesKilled += 1;
                if (this.ScrollerProps.character.CharacterProperties.enemiesKilled%15 == 0) {
                    this.createEnemies(1, this.getStage());
                    GameVariables.setEnemies(GameVariables.getEnemies()+1);
                }
            }
            else {
                this.ScrollerProps.character.CharacterProperties.lives -= 1;
                if (this.ScrollerProps.character.CharacterProperties.lives < 0) {
                    this.ScrollerProps.character.CharacterProperties.continueGame = false;
                    this.ScrollerProps.character.CharacterProperties.jumping = true;
                }
            }

            this.ScrollerProps.enemies[n].updateVelocity();
            var newObj = this.ScrollerProps.enemies[n].getNewPositions();
            this.ScrollerProps.enemies[n].position.x = newObj.x;
            this.ScrollerProps.enemies[n].position.y = newObj.y;
        }
    }
};
Scroller.prototype.updateSprites = function() {
    this.ScrollerProps.character.updateSprite();
    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        this.ScrollerProps.enemies[n].updateSprite();
    }
};

Scroller.prototype.writeScoreAndLives = function() {
    this.getStage().removeChild(this.text);
    this.text = new PIXI.Text("Killed  " + this.ScrollerProps.character.CharacterProperties.enemiesKilled + "       Lives  " + (this.ScrollerProps.character.CharacterProperties.lives + 1) , {font:"25px Arial", fill:"#1144FF"});
    this.getStage().addChild(this.text);
};