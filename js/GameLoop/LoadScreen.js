/**
 * Created by t_tappa on 4/26/2016.
 */
function LoadScreen(stage) {
    this.Properties = new LoadScreenProperties();
    this.initializePositions();
    this.constructLoadScreen(stage);
    this.getStage = function() {
        return stage;
    };
}

LoadScreen.prototype.initializePositions = function() {
    this.Properties.titleBoard.setPositionAndScale(this.Properties.titleBoard);
    this.Properties.startButton.setPositionAndScale(this.Properties.startButton);
};
LoadScreen.prototype.constructLoadScreen = function(stage) {
    //Add to stage the units
    stage.addChild(this.Properties.far);
    stage.addChild(this.Properties.mid);
    stage.addChild(this.Properties.mid2);
    stage.addChild(this.Properties.titleBoard);
    stage.addChild(this.Properties.startButton);
    stage.addChild(this.Properties.textScore);
};
LoadScreen.prototype.update = function() {
    this.updateViewport();
    this.Properties.far.setViewportX(this.Properties.viewportX);
    this.Properties.mid.setViewportX(this.Properties.viewportX);
    this.Properties.mid2.setViewportX(this.Properties.viewportX);
    this.Properties.titleBoard.update(this.Properties.titleBoard);
    this.Properties.startButton.update(this.Properties.startButton);
    this.Properties.textScore.update(this.Properties.textScore);
};
LoadScreen.prototype.updateViewport = function() {
    if (ScrollerGlobals.currentScrollSpeed > ScrollerGlobals.maxScrollSpeed) {
        ScrollerGlobals.currentScrollSpeed = ScrollerGlobals.maxScrollSpeed;
    }

    this.Properties.viewportX = this.Properties.viewportX + ScrollerGlobals.currentScrollSpeed;
};