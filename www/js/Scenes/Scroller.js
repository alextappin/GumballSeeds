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
    //stage.alpha = 1.5;
    this.flashObj = {
        done : false
    };

    this.blurFilter1 = new PIXI.filters.BlurFilter();
    this.blurFilter2 = new PIXI.filters.BlurFilter();
    stage.filters = [this.blurFilter1,this.blurFilter2];
    this.blurFilter1.blur = 15;
    this.blurFilter2.blur = 150;
    MainGlobals.Helpers.stopTitleSound();
    MainGlobals.Helpers.startGameSound();
    console.log(MainGlobals.Physics);
}
Scroller.prototype.initializePositionsAndScale = function() {
    this.Properties.haze4.setPositionAndScale(this.Properties.haze4);
    this.Properties.cloud5.setPositionAndScale(this.Properties.cloud5);
    this.Properties.cloud7.setPositionAndScale(this.Properties.cloud7);
    this.Properties.gumballMachine8.setPositionAndScale(this.Properties.gumballMachine8);
    this.Properties.hill1a9.setPositionAndScale(this.Properties.hill1a9);
    this.Properties.hill1b10.setPositionAndScale(this.Properties.hill1b10);
    this.Properties.haze11.setPositionAndScale(this.Properties.haze11);
    this.Properties.hill2a12.setPositionAndScale(this.Properties.hill2a12);
    this.Properties.hill2b13.setPositionAndScale(this.Properties.hill2b13);
    this.Properties.haze14.setPositionAndScale(this.Properties.haze14);
    this.Properties.hill3a15.setPositionAndScale(this.Properties.hill3a15);
    this.Properties.hill3b16.setPositionAndScale(this.Properties.hill3b16);
    this.Properties.superBg.setPositionAndScale(this.Properties.superBg);
    this.Properties.character.setPositionAndScale(this.Properties.character);
    this.Properties.enemies.setPositionAndScale(this.Properties.enemies);
    this.Properties.ground.setPositionAndScale(this.Properties.ground);
    this.Properties.powerBar.setPositionAndScale(this.Properties.powerBar);
    this.Properties.lifeBar.setPositionAndScale(this.Properties.lifeBar);
    this.Properties.scoreBar.setPositionAndScale(this.Properties.scoreBar);
    this.Properties.comboLivesBar.setPositionAndScale(this.Properties.comboLivesBar);
    this.Properties.gumballs.setPositionAndScale(this.Properties.gumballs);
    this.Properties.super.setPositionAndScale(this.Properties.super);
};
Scroller.prototype.constructScroller = function(stage) {
    stage.addChild(this.Properties.bgSky1);
    stage.addChild(this.Properties.haze4);
    stage.addChild(this.Properties.cloud5);
    stage.addChild(this.Properties.cloud7);
    stage.addChild(this.Properties.gumballMachine8);
    stage.addChild(this.Properties.hill1a9);
    stage.addChild(this.Properties.hill1b10);
    //stage.addChild(this.Properties.haze11);
    stage.addChild(this.Properties.hill2a12);
    stage.addChild(this.Properties.hill2b13);
    //stage.addChild(this.Properties.haze14);
    stage.addChild(this.Properties.hill3a15);
    stage.addChild(this.Properties.hill3b16);
    stage.addChild(this.Properties.superBg);


    this.Properties.ground.addGroundToStage(this.Properties.ground, stage);
    stage.addChild(this.Properties.super);
    stage.addChild(this.Properties.character);
    this.Properties.enemies.addEnemiesToStage(this.Properties.enemies, stage);
    this.Properties.gumballs.addGumballsToStage(this.Properties.gumballs, stage);
    stage.addChild(this.Properties.powerBar);
    stage.addChild(this.Properties.lifeBar);
    stage.addChild(this.Properties.scoreBar);
    stage.addChild(this.Properties.comboLivesBar);
    stage.addChild(this.Properties.textScore);
    stage.addChild(this.Properties.textCombo);
    stage.addChild(this.Properties.touchJump);
    stage.addChild(this.Properties.touchAttack);
};
Scroller.prototype.update = function() {
    if (!this.flashObj.done) {
        if (this.blurFilter1.blur > 0) {
            this.blurFilter1.blur -= 1;
            this.blurFilter2.blur -= 10;
        } else {
            this.getStage().filters = [];
            this.flashObj.done = true;
        }
    }
    if (MainGlobals.PowerUp.powerUpActive) {
        this.updateViewportPowerUp();
        this.updateObjectsPowerUp();
    } else {
        this.updateViewport();
        this.updateObjects();
    }

    MainGlobals.ScoreHelper.updateScore();
};
Scroller.prototype.updateViewport = function() {
    if (MainGlobals.Helpers.doPowerUp()) {
        MainGlobals.PowerHelper.continuePowerUp(this.Properties.viewportX);
    } else if (MainGlobals.Helpers.scrollSpeedIsMaxed()) {
        MainGlobals.Helpers.setScrollSpeedToMax();
    }

    this.Properties.viewportX = this.Properties.viewportX + MainGlobals.Scroller.currentScrollSpeed;
};
Scroller.prototype.updateObjects = function() {
    /*this.Properties.bgSky1.update(this.Properties.viewportX);*/
    this.Properties.haze4.update(this.Properties.haze4, this.Properties.viewportX);
    this.Properties.cloud5.update(this.Properties.cloud5, this.Properties.viewportX);
    this.Properties.cloud7.update(this.Properties.cloud7, this.Properties.viewportX);
    this.Properties.gumballMachine8.update(this.Properties.gumballMachine8, this.Properties.viewportX);
    this.Properties.hill1a9.update(this.Properties.hill1a9, this.Properties.viewportX);
    this.Properties.hill1b10.update(this.Properties.hill1b10, this.Properties.viewportX);
    //this.Properties.haze11.update(this.Properties.haze11, this.Properties.viewportX);
    this.Properties.hill2a12.update(this.Properties.hill2a12, this.Properties.viewportX, this.Properties.hill2b13);
    this.Properties.hill2b13.update(this.Properties.hill2b13, this.Properties.viewportX, this.Properties.hill2a12);
    //this.Properties.haze14.update(this.Properties.haze14, this.Properties.viewportX);
    this.Properties.hill3a15.update(this.Properties.hill3a15, this.Properties.viewportX, this.Properties.hill3b16);
    this.Properties.hill3b16.update(this.Properties.hill3b16, this.Properties.viewportX, this.Properties.hill3a15);
    this.Properties.superBg.update(this.Properties.superBg);
    this.Properties.ground.update(this.Properties.ground, this.getStage());
    this.Properties.character.update(this.Properties.character, this.Properties.ground);
    this.Properties.super.update(this.Properties.super);
    this.Properties.gumballs.update(this.Properties.gumballs, this.Properties.ground, this.Properties.character, this.getStage());
    this.Properties.enemies.update(this.Properties.enemies, this.Properties.character, this.Properties.ground, this.getStage());
    this.Properties.powerBar.update(this.Properties.powerBar);
    this.Properties.lifeBar.update(this.Properties.lifeBar);
    this.Properties.scoreBar.update(this.Properties.scoreBar);
    this.Properties.comboLivesBar.update(this.Properties.comboLivesBar);
    this.Properties.textScore.update(this.Properties.textScore);
    this.Properties.textCombo.update(this.Properties.textCombo);
    this.Properties.touchJump.update(this.Properties.touchJump, this.Properties.character);
    this.Properties.touchAttack.update(this.Properties.touchAttack, this.Properties.character);
};
Scroller.prototype.updateViewportPowerUp = function() {
    MainGlobals.PowerHelper.continuePowerUp(this.Properties.viewportX);
    this.Properties.viewportX = this.Properties.viewportX + MainGlobals.Scroller.currentScrollSpeed;
};
Scroller.prototype.updateObjectsPowerUp = function() {
        this.Properties.superBg.updatePowerUp(this.Properties.superBg, this.Properties.viewportX);
        this.Properties.ground.updatePowerUp(this.Properties.ground, this.getStage());
        this.Properties.character.updatePowerUp(this.Properties.character, this.Properties.ground);
        this.Properties.gumballs.updatePowerUp(this.Properties.gumballs, this.Properties.ground, this.Properties.character, this.getStage());
        this.Properties.enemies.updatePowerUp(this.Properties.enemies, this.Properties.character, this.Properties.ground, this.getStage());
        this.Properties.powerBar.updatePowerUp(this.Properties.powerBar);
        this.Properties.lifeBar.updatePowerUp(this.Properties.lifeBar);
        this.Properties.scoreBar.updatePowerUp(this.Properties.scoreBar);
        this.Properties.comboLivesBar.updatePowerUp(this.Properties.comboLivesBar);
        this.Properties.textScore.update(this.Properties.textScore);
        this.Properties.textCombo.update(this.Properties.textCombo);
        this.Properties.touchJump.update(this.Properties.touchJump, this.Properties.character);
        this.Properties.touchAttack.update(this.Properties.touchAttack, this.Properties.character);
        this.Properties.super.updatePowerUp(this.Properties.super);
};