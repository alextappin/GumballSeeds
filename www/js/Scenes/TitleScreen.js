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

    MainGlobals.Helpers.startTitleSound();
}

TitleScreen.prototype.initializePositions = function() {
    this.Properties.titleBoard.setPositionAndScale(this.Properties.titleBoard);
    this.Properties.titleWords.setPositionAndScale(this.Properties.titleWords);
    this.Properties.startButton.setPositionAndScale(this.Properties.startButton);
    this.Properties.startAnimation.setPositionAndScale(this.Properties.startAnimation);
};

TitleScreen.prototype.constructTitleScreen = function(stage) {
    stage.addChild(this.Properties.titleBoard);
    stage.addChild(this.Properties.titleWords);
    stage.addChild(this.Properties.startButton);
    stage.addChild(this.Properties.startAnimation);
    //this.Properties.startAnimation.addSpritesToStage(this.Properties.startAnimation, stage);
};

TitleScreen.prototype.update = function() {
    MainGlobals.TitleTime.updateTitleObjects(this.Properties.titleBoard, this.Properties.titleWords, this.Properties.startButton, this.Properties.startAnimation);
};