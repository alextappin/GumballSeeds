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
    this.Properties.loadImage.setPositionAndScale(this.Properties.loadImage);
};
LoadScreen.prototype.constructLoadScreen = function(stage) {
    stage.addChild(this.Properties.loadImage);
};
LoadScreen.prototype.update = function() {
    this.Properties.loadImage.update(this.Properties.loadImage);
    //this.Properties.textInstructions.update(this.Properties.textInstructions);
    //this.Properties.textInfo.update(this.Properties.textInfo);
};