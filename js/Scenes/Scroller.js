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

    HelperFunctions().stopTitleSound();
}
Scroller.prototype.initializePositionsAndScale = function() {
    this.Properties.cloud5.setPositionAndScale(this.Properties.cloud5);
    this.Properties.cloud6.setPositionAndScale(this.Properties.cloud6);
    this.Properties.cloud7.setPositionAndScale(this.Properties.cloud7);
    this.Properties.hill1a9.setPositionAndScale(this.Properties.hill1a9);
    this.Properties.hill1b10.setPositionAndScale(this.Properties.hill1b10);
    this.Properties.hill2a12.setPositionAndScale(this.Properties.hill2a12);
    this.Properties.hill2b13.setPositionAndScale(this.Properties.hill2b13);
    this.Properties.hill3a15.setPositionAndScale(this.Properties.hill3a15);
    this.Properties.hill3b16.setPositionAndScale(this.Properties.hill3b16);
    this.Properties.character.setPositionAndScale(this.Properties.character);
    this.Properties.enemies.setPositionAndScale(this.Properties.enemies);
    this.Properties.ground.setPositionAndScale(this.Properties.ground);
    this.Properties.powerBar.setPositionAndScale(this.Properties.powerBar);
    this.Properties.gumballs.setPositionAndScale(this.Properties.gumballs);
};
Scroller.prototype.constructScroller = function(stage) {
    stage.addChild(this.Properties.bgSky1);
    stage.addChild(this.Properties.haze4);
    stage.addChild(this.Properties.cloud5);
    stage.addChild(this.Properties.cloud6);
    stage.addChild(this.Properties.cloud7);
    stage.addChild(this.Properties.gumballMachine8);
    stage.addChild(this.Properties.hill1a9);
    stage.addChild(this.Properties.hill1b10);
    stage.addChild(this.Properties.haze11);
    stage.addChild(this.Properties.hill2a12);
    stage.addChild(this.Properties.hill2b13);
    stage.addChild(this.Properties.haze14);
    stage.addChild(this.Properties.hill3a15);
    stage.addChild(this.Properties.hill3b16);
    /*;
    stage.addChild(this.Properties.);
    stage.addChild(this.Properties.);
    stage.addChild(this.Properties.);
    stage.addChild(this.Properties.);
    stage.addChild(this.Properties.);
    stage.addChild(this.Properties.);*/

    stage.addChild(this.Properties.ground);
    stage.addChild(this.Properties.character);
    this.Properties.enemies.addEnemiesToStage(this.Properties.enemies, stage);
    this.Properties.gumballs.addGumballsToStage(this.Properties.gumballs, stage);
    stage.addChild(this.Properties.powerBar);
    stage.addChild(this.Properties.textScore);
    stage.addChild(this.Properties.textLives);
    stage.addChild(this.Properties.touchJump);
    stage.addChild(this.Properties.touchAttack);
};
Scroller.prototype.update = function() {
    if (PowerUpGlobals.powerUpActive) {
        this.updateViewportPowerUp();
        this.updateObjectsPowerUp();
    } else {
        this.updateViewport();
        this.updateObjects();
    }
    ScoreHelper().updateScore();
};
Scroller.prototype.updateViewport = function() {
    if (HelperFunctions().doPowerUp()) {
        PowerUpHelper().continuePowerUp(this.Properties.viewportX);
    } else if (HelperFunctions().scrollSpeedIsMaxed()) {
        HelperFunctions().setScrollSpeedToMax();
    }
    this.Properties.viewportX = this.Properties.viewportX + ScrollerGlobals.currentScrollSpeed;
};
Scroller.prototype.updateObjects = function() {
    this.Properties.bgSky1.update(this.Properties.viewportX);
    this.Properties.haze4.update(this.Properties.viewportX);
    this.Properties.cloud5.update(this.Properties.cloud5, this.Properties.viewportX);
    this.Properties.cloud6.update(this.Properties.cloud6, this.Properties.viewportX);
    this.Properties.cloud7.update(this.Properties.cloud7, this.Properties.viewportX);
    this.Properties.gumballMachine8.update(this.Properties.viewportX);
    this.Properties.hill1a9.update(this.Properties.hill1a9, this.Properties.viewportX);
    this.Properties.hill1b10.update(this.Properties.hill1b10, this.Properties.viewportX);
    this.Properties.haze11.update(this.Properties.viewportX);
    this.Properties.hill2a12.update(this.Properties.hill2a12, this.Properties.viewportX);
    this.Properties.hill2b13.update(this.Properties.hill2b13, this.Properties.viewportX);
    this.Properties.haze14.update(this.Properties.viewportX);
    this.Properties.hill3a15.update(this.Properties.hill3a15, this.Properties.viewportX, this.Properties.hill3b16);
    this.Properties.hill3b16.update(this.Properties.hill3b16, this.Properties.viewportX, this.Properties.hill3a15);
    /*

        this.Properties..update(this.Properties.viewportX);
        this.Properties..update(this.Properties.viewportX);
        this.Properties..update(this.Properties.viewportX);
        this.Properties..update(this.Properties.viewportX);
        this.Properties..update(this.Properties.viewportX);
        this.Properties..update(this.Properties.viewportX);
        this.Properties..update(this.Properties.viewportX);*/

    this.Properties.ground.update(this.Properties.ground);
    this.Properties.character.update(this.Properties.character, this.Properties.ground);
    this.Properties.gumballs.update(this.Properties.gumballs, this.Properties.ground, this.Properties.character, this.getStage());
    this.Properties.enemies.update(this.Properties.enemies, this.Properties.character, this.getStage());
    this.Properties.powerBar.update(this.Properties.powerBar);
    this.Properties.textScore.update(this.Properties.textScore);
    this.Properties.textLives.update(this.Properties.textLives);
    this.Properties.touchJump.update(this.Properties.touchJump, this.Properties.character);
    this.Properties.touchAttack.update(this.Properties.touchAttack, this.Properties.character);
};
Scroller.prototype.updateViewportPowerUp = function() {
    PowerUpHelper().continuePowerUp(this.Properties.viewportX);
    this.Properties.viewportX = this.Properties.viewportX + ScrollerGlobals.currentScrollSpeed;
};
Scroller.prototype.updateObjectsPowerUp = function() {
    this.Properties.ground.updatePowerUp(this.Properties.ground);
    this.Properties.character.updatePowerUp(this.Properties.character, this.Properties.ground);
    this.Properties.gumballs.updatePowerUp(this.Properties.gumballs, this.Properties.ground, this.Properties.character, this.getStage());
    this.Properties.enemies.updatePowerUp(this.Properties.enemies, this.Properties.character, this.getStage());
    this.Properties.powerBar.updatePowerUp(this.Properties.powerBar);
    this.Properties.textScore.update(this.Properties.textScore);
    this.Properties.textLives.update(this.Properties.textLives);
    this.Properties.touchJump.update(this.Properties.touchJump, this.Properties.character);
    this.Properties.touchAttack.update(this.Properties.touchAttack, this.Properties.character);
};