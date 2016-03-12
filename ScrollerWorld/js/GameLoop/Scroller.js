/**
 * Created by ajt on 11/29/2015.
 */
function Scroller(stage) {
    this.constructScroller(stage);
    this.getStage = function() {
        return stage;
    }
}
Scroller.prototype.constructScroller = function(stage) {
    this.ScrollerProps = new ScrollerProperties();
    this.addChildrenToStage(stage);
    this.ScrollerProps.mapBuilder = new MapBuilder(this.ScrollerProps.front);
};
Scroller.prototype.addChildrenToStage = function(stage) {
    stage.addChild(this.ScrollerProps.far);
    stage.addChild(this.ScrollerProps.mid);
    stage.addChild(this.ScrollerProps.mid2);
    stage.addChild(this.ScrollerProps.front);
    stage.addChild(this.ScrollerProps.character);
    this.createEnemies(GameVariables.getEnemies(), stage);
};
Scroller.prototype.update = function() {
    this.updateViewport();
    this.updateObjects();
    this.writeScoreAndLives();
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
    //multiple enemies to be updated
    for (var n = 0; n < GameVariables.getEnemies(); n++) {
        if (this.ScrollerProps.enemies[n]) {
            this.ScrollerProps.enemies[n].update(this.ScrollerProps.enemies[n], this.ScrollerProps.character);
        }
        //if there is not enough enemies, add another
        else {
            this.createEnemies(1, this.getStage());
        }
    }
};
Scroller.prototype.createEnemies = function(number, stage) {
    for (var n = 0; n < number; n++) {
        this.enemy = new Enemy();
        this.enemy.position.x = -500;
        this.ScrollerProps.enemies.push(this.enemy);
        stage.addChild(this.enemy);
    }
};
Scroller.prototype.writeScoreAndLives = function() {
    this.getStage().removeChild(this.text);
    this.text = new PIXI.Text("Killed  " + this.ScrollerProps.character.CharacterProperties.enemiesKilled + "       Lives  " + (this.ScrollerProps.character.CharacterProperties.lives + 1) , {font:"25px Arial", fill:"#1144FF"});
    this.getStage().addChild(this.text);
};