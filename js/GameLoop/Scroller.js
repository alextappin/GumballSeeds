/**
 * Created by ajt on 11/29/2015.
 */
function Scroller(stage) {
    this.ScrollerProps = new ScrollerProperties();
    this.initializePositionsAndScale();
    this.constructScroller(stage);
    this.getStage = function() {
        return stage;
    };
    createjs.Sound.stop("title");
}
Scroller.prototype.initializePositionsAndScale = function() {
    this.ScrollerProps.character.setPositionAndScale(this.ScrollerProps.character);
};
Scroller.prototype.constructScroller = function(stage) {
    this.addChildrenToStage(stage);
    this.ScrollerProps.mapBuilder = new MapBuilder(this.ScrollerProps.front);
};
Scroller.prototype.addChildrenToStage = function(stage) {
    stage.addChild(this.ScrollerProps.far);
    stage.addChild(this.ScrollerProps.mid);
    stage.addChild(this.ScrollerProps.mid2);
    stage.addChild(this.ScrollerProps.front);
    stage.addChild(this.ScrollerProps.character);
    stage.addChild(this.ScrollerProps.textScore);
    stage.addChild(this.ScrollerProps.textLives);
    this.createEnemies(GameVariables.getEnemies(), stage);
    stage.addChild(this.ScrollerProps.touchJump);
    stage.addChild(this.ScrollerProps.touchAttack);
};
Scroller.prototype.update = function() {
    this.updateViewport();
    this.updateObjects();
    if (this.ScrollerProps.front.slicesAreLow()) {
        //TODO:if slices are low, find which slice types are low and ADD THOSE ONES THAT ARE LOW
        this.ScrollerProps.mapBuilder.addAndBuildRandomSequence();
    }
};
Scroller.prototype.updateViewport = function() {
    GameVariables.getCurrentScrollSpeed() > GameVariables.getMaxScrollSpeed() ? GameVariables.setCurrentScrollSpeed(GameVariables.getMaxScrollSpeed()) : null;
    this.ScrollerProps.viewportX = this.ScrollerProps.viewportX + GameVariables.getCurrentScrollSpeed();
};
Scroller.prototype.updateObjects = function() {
    this.ScrollerProps.far.setViewportX(this.ScrollerProps.viewportX);
    this.ScrollerProps.mid.setViewportX(this.ScrollerProps.viewportX);
    this.ScrollerProps.mid2.setViewportX(this.ScrollerProps.viewportX);
    this.ScrollerProps.front.setViewportX(this.ScrollerProps.viewportX);
    this.ScrollerProps.character.update(this.ScrollerProps.character, this.ScrollerProps.front);
    this.ScrollerProps.textScore.update(this.ScrollerProps.textScore);
    this.ScrollerProps.textLives.update(this.ScrollerProps.textLives);
    this.ScrollerProps.touchJump.update(this.ScrollerProps.touchJump, this.ScrollerProps.character);
    this.ScrollerProps.touchAttack.update(this.ScrollerProps.touchAttack, this.ScrollerProps.character);
    //multiple enemies to be updated
    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        if (this.ScrollerProps.enemies[n]) {
            this.ScrollerProps.enemies[n].update(this.ScrollerProps.enemies[n], this.ScrollerProps.character);
        }
        //if there are not enough enemies, add another
        else {
            this.createEnemies(1, this.getStage());
        }
    }
};
Scroller.prototype.createEnemies = function(number, stage) {
    for (var n = 0, enemy; n < number; n++) {
        enemy = new Enemy();
        enemy.setPositionAndScale(enemy);
        this.ScrollerProps.enemies.push(enemy);
        stage.addChild(enemy);
    }
};