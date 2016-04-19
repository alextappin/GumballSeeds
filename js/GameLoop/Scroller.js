/**
 * Created by ajt on 11/29/2015.
 */
function Scroller(stage) {
    this.Properties = new ScrollerProperties();
    this.initializePositionsAndScale();
    this.constructScroller(stage);
    this.getStage = function() {
        return stage;
    };
    createjs.Sound.stop("title");
}
Scroller.prototype.initializePositionsAndScale = function() {
    this.Properties.character.setPositionAndScale(this.Properties.character);
    this.Properties.enemies.setPositionAndScale(this.Properties.enemies);
    this.Properties.ground.setPositionAndScale(this.Properties.ground);
    this.Properties.powerBar.setPositionAndScale(this.Properties.powerBar);
    this.Properties.gumball.setPositionAndScale(this.Properties.gumball);
};
Scroller.prototype.constructScroller = function(stage) {
    this.addChildrenToStage(stage);
};
Scroller.prototype.addChildrenToStage = function(stage) {
    stage.addChild(this.Properties.far);
    stage.addChild(this.Properties.mid);
    stage.addChild(this.Properties.mid2);
    stage.addChild(this.Properties.ground);
    stage.addChild(this.Properties.character);
    stage.addChild(this.Properties.gumball);
    stage.addChild(this.Properties.powerBar);
    stage.addChild(this.Properties.textScore);
    stage.addChild(this.Properties.textLives);
    this.Properties.enemies.addEnemiesToStage(this.Properties.enemies, stage);
    stage.addChild(this.Properties.touchJump);
    stage.addChild(this.Properties.touchAttack);
};
Scroller.prototype.update = function() {
    this.updateViewport();
    this.updateObjects();
    ScoreHelper().updateScore();
};
Scroller.prototype.updateViewport = function() {
    GameVariables.getCurrentScrollSpeed() > GameVariables.getMaxScrollSpeed() ? GameVariables.setCurrentScrollSpeed(GameVariables.getMaxScrollSpeed()) : null;
    this.Properties.viewportX = this.Properties.viewportX + GameVariables.getCurrentScrollSpeed();
};
Scroller.prototype.updateObjects = function() {
    this.Properties.far.setViewportX(this.Properties.viewportX);
    this.Properties.mid.setViewportX(this.Properties.viewportX);
    this.Properties.mid2.setViewportX(this.Properties.viewportX);
    this.Properties.ground.update(this.Properties.ground);
    this.Properties.character.update(this.Properties.character, this.Properties.ground);
    this.Properties.gumball.update(this.Properties.gumball, this.Properties.ground, this.Properties.character);
    this.Properties.enemies.update(this.Properties.enemies, this.Properties.character, this.getStage());
    this.Properties.powerBar.update(this.Properties.powerBar);
    this.Properties.textScore.update(this.Properties.textScore);
    this.Properties.textLives.update(this.Properties.textLives);
    this.Properties.touchJump.update(this.Properties.touchJump, this.Properties.character);
    this.Properties.touchAttack.update(this.Properties.touchAttack, this.Properties.character);
    //multiple enemies to be updated
    /*for (var n = 0; n < GameVariables.getEnemies(); n++) {
        if (this.Properties.enemies[n]) {
            this.Properties.enemies[n].update(this.Properties.enemies[n], this.Properties.character);
        }
        //if there are not enough enemies, add another
        else {
            this.createEnemies(1, this.getStage());
        }
    }*/
};
Scroller.prototype.createEnemies = function(number, stage) {
    for (var n = 0, enemy; n < number; n++) {
        enemy = new Enemy();
        enemy.setPositionAndScale(enemy);
        this.Properties.enemies.push(enemy);
        stage.addChild(enemy);
    }
};