/**
 * Created by ajt on 3/10/2016.
 */
function TitleScreen(stage) {
    this.TitleScreenProps = new TitleScreenProperties();
    this.initializePositions();
    this.constructTitleScreen(stage);
    this.getStage = function() {
        return stage;
    };
    createjs.Sound.play("title", {loop: 10, volume:.2});
}

TitleScreen.prototype.initializePositions = function() {
    this.TitleScreenProps.titleBoard.position = this.TitleScreenProps.titleBoard.getStartPosition(this.TitleScreenProps.titleBoard);
    this.TitleScreenProps.startButton.position = this.TitleScreenProps.startButton.getStartPosition(this.TitleScreenProps.startButton);
};
TitleScreen.prototype.constructTitleScreen = function(stage) {
    //Add to stage the units
    stage.addChild(this.TitleScreenProps.far);
    stage.addChild(this.TitleScreenProps.mid);
    stage.addChild(this.TitleScreenProps.mid2);
    stage.addChild(this.TitleScreenProps.titleBoard);
    stage.addChild(this.TitleScreenProps.startButton);
    stage.addChild(this.TitleScreenProps.textScore);
};
TitleScreen.prototype.update = function() {
    this.updateViewport();
    this.TitleScreenProps.far.setViewportX(this.TitleScreenProps.viewportX);
    this.TitleScreenProps.mid.setViewportX(this.TitleScreenProps.viewportX);
    this.TitleScreenProps.mid2.setViewportX(this.TitleScreenProps.viewportX);
    this.TitleScreenProps.titleBoard.update(this.TitleScreenProps.titleBoard);
    this.TitleScreenProps.startButton.update(this.TitleScreenProps.startButton);
    this.TitleScreenProps.textScore.update(this.TitleScreenProps.textScore);
};
TitleScreen.prototype.updateViewport = function() {
    GameVariables.getCurrentScrollSpeed() > GameVariables.getMaxScrollSpeed() ? GameVariables.setCurrentScrollSpeed(GameVariables.getMaxScrollSpeed()) : null;
    this.TitleScreenProps.viewportX = this.TitleScreenProps.viewportX + GameVariables.getCurrentScrollSpeed();
};