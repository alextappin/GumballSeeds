/**
 * Created by ajt on 8/27/2016.
 */
function ComboLivesBar() {
    PIXI.Container.call(this);
    this.constructComboLivesBar();
}

ComboLivesBar.constructor = ComboLivesBar;
ComboLivesBar.prototype = Object.create(PIXI.Container.prototype);

ComboLivesBar.prototype.constructComboLivesBar = function() {
    this.initiateComboLivesBarSprites();
};

ComboLivesBar.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.comboLivesScale = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.comboLivesPercent);
    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.comboLivesScale,MainGlobals.Scaling.comboLivesScale);
    obj.position =  MainGlobals.Helpers.getNewPoint(0, MainGlobals.Scaling.comboLivesPositionY);
};

ComboLivesBar.prototype.initiateComboLivesBarSprites = function() {
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("lives")));
};

ComboLivesBar.prototype.update = function(comboLivesObj) {
    comboLivesObj.visible = true;
};

ComboLivesBar.prototype.updatePowerUp = function(comboLivesObj) {
    if (comboLivesObj.visible) {
        comboLivesObj.visible = true;
    }
};