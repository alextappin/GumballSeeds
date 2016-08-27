/**
 * Created by ajt on 8/27/2016.
 */
/**
 * Created by ajt on 4/9/2016.
 */
function ScoreBar() {
    PIXI.Container.call(this);
    this.constructScoreBar();
}

ScoreBar.constructor = ScoreBar;
ScoreBar.prototype = Object.create(PIXI.Container.prototype);

ScoreBar.prototype.constructScoreBar = function() {
    this.initiateScoreBarSprites();
};

ScoreBar.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.scoreScale = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.scorePercent);
    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.scoreScale,MainGlobals.Scaling.scoreScale);
    obj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.ScreenWidth - obj.width, MainGlobals.Scaling.scorePositionY);
};

ScoreBar.prototype.initiateScoreBarSprites = function() {
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("score")));
};

ScoreBar.prototype.update = function(scoreObj) {
    scoreObj.visible = true;
};

ScoreBar.prototype.updatePowerUp = function(scoreObj) {
    if (scoreObj.visible) {
        scoreObj.visible = true;
    }
};