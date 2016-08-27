/**
 * Created by ajt on 7/31/2016.
 */
function BlackScreen(stage) {
    this.initializePositions();
    this.constructBlackScreen(stage);
}

BlackScreen.prototype.initializePositions = function() {
    this.loadImage = new LoadImage();
    this.loadImage.alpha = 0;
    this.loadImage.position.x = -200;
};
BlackScreen.prototype.constructBlackScreen = function(stage) {
    stage.addChild(this.loadImage);
};
BlackScreen.prototype.update = function() {
    this.loadImage.update(this.loadImage);
};