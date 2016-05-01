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
    this.Properties.titleWords.setPositionAndScale(this.Properties.titleWords);
    this.Properties.startButton.setPositionAndScale(this.Properties.startButton);
};

TitleScreen.prototype.constructTitleScreen = function(stage) {
    stage.addChild(this.Properties.titleBoard);
    //stage.addChild(this.Properties.titleWords);
    //stage.addChild(this.Properties.startButton);
};

TitleScreen.prototype.update = function() {
    TitleTimingHelper().updateTitleObjects(this.Properties.titleBoard, this.Properties.titleWords, this.Properties.startButton);
    /*this.Properties.titleBoard.update(this.Properties.titleBoard);
    this.Properties.startButton.update(this.Properties.startButton);*/
};