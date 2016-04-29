/**
 * Created by ajt on 3/10/2016.
 */
function TitleScreen(stage) {
    this.Properties = new TitleScreenProperties();
    this.initializePositions();
    this.constructTitleScreen(stage);
    this.getStage = function() {
        return stage;
    };
    HelperFunctions().startTitleSound();
}

TitleScreen.prototype.initializePositions = function() {
    this.Properties.titleBoard.setPositionAndScale(this.Properties.titleBoard);
    this.Properties.startButton.setPositionAndScale(this.Properties.startButton);
};
TitleScreen.prototype.constructTitleScreen = function(stage) {
    //Add to stage the units
    stage.addChild(this.Properties.far);
    stage.addChild(this.Properties.mid);
    stage.addChild(this.Properties.mid2);
    stage.addChild(this.Properties.titleBoard);
    stage.addChild(this.Properties.startButton);
    stage.addChild(this.Properties.textScore);
};
TitleScreen.prototype.update = function() {
    this.updateViewport();
    this.Properties.far.setViewportX(this.Properties.viewportX);
    this.Properties.mid.setViewportX(this.Properties.viewportX);
    this.Properties.mid2.setViewportX(this.Properties.viewportX);
    this.Properties.titleBoard.update(this.Properties.titleBoard);
    this.Properties.startButton.update(this.Properties.startButton);
    this.Properties.textScore.update(this.Properties.textScore);
};
TitleScreen.prototype.updateViewport = function() {
    if (HelperFunctions().doPowerUp()) {
        PowerUpHelper().continuePowerUp(this.Properties.viewportX);
    } else if (HelperFunctions().scrollSpeedIsMaxed()) {
        HelperFunctions().setScrollSpeedToMax();
    }

    this.Properties.viewportX = this.Properties.viewportX + ScrollerGlobals.currentScrollSpeed;
};