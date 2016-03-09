/**
 * Created by ajt on 11/29/2015.
 */

CONST = 2;
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
    this.createEnemies(CONST);
    for (var n = 0; n < CONST; n++)
        stage.addChild(this.enemies[n]);

    this.mapBuilder = new MapBuilder(this.front);

    this.viewportX = 0;
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
    this.moveEnemies();
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
        this.character.position.y = this.character.moveHeightJumping(this.character.position.y, this.front.getCurrentSliceHeight(), this.front.getNextSliceHeight());
    }
    else {
        this.character.endJumping(this.character.position.y);
    }
};

Scroller.prototype.applyFallingGravityToCharacter = function() {
    this.character.checkIfFalling(this.front.getCurrentSliceHeight(), this.front.getNextSliceHeight());
};

Scroller.prototype.createEnemies = function(enemies) {
    for (var n = 0; n < enemies; n++) {
        this.enemy = new Enemy();
        var obj = this.enemy.getUpdatedPositionVariables(-100, 800);
        this.enemy.position.y = obj.y;
        this.enemy.position.x = obj.x;
        this.enemy.scale.x = .3;
        this.enemy.scale.y = .3;
        this.enemies.push(this.enemy);
    }
};
Scroller.prototype.moveEnemies = function() {
    for (var n = 0; n < CONST; n++) {
        var obj = this.enemies[n].getUpdatedPositionVariables(this.enemies[n].position.x, this.enemies[n].position.y);
        this.enemies[n].position.x = obj.x;
        this.enemies[n].position.y = obj.y;
    }
};
Scroller.prototype.updateSprites = function() {
    this.character.updateSprite();
    for (var n = 0; n < CONST; n++) {
        this.enemies[n].updateSprite();
    }
};