/**
 * Created by t_tappa on 5/6/2016.
 */
function GroundHandler() {
    //array of gumball objects
    this.ground = [];
    this.constructGround();
}

GroundHandler.constructor = GroundHandler;

GroundHandler.prototype.constructGround = function() {
    for (var n = 0; n < BalanceGlobals.ground; n++) {
        this.ground.push(new Ground());
    }
};

GroundHandler.prototype.setPositionAndScale = function(GroundHandler) {
    for (var n = 0; n < GroundHandler.ground.length; n++) {
        GroundHandler.ground[n].setPositionAndScale(GroundHandler.ground[n]);
    }
};

GroundHandler.prototype.addWallsToStage = function(GroundHandler, stage) {
    for (var n = 0; n < GroundHandler.ground.length; n++) {
        stage.addChild(GroundHandler.ground[n]);
    }
};

GroundHandler.prototype.update = function(GroundHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.ground; n++) {
        if (GroundHandler.ground[n]) {
            GroundHandler.ground[n].update(GroundHandler.ground[n], groundObj, characterObj);
        } else {
            this.addWall(BalanceGlobals.groundToAdd, stage, GroundHandler); //if there are not enough ground, add another
        }
    }
};

GroundHandler.prototype.updatePowerUp = function(GroundHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.ground; n++) {
        if (GroundHandler.ground[n]) {
            GroundHandler.ground[n].updatePowerUp(GroundHandler.ground[n], groundObj, characterObj);
        }
        //if there are not enough ground, add another
        else {
            this.addWall(BalanceGlobals.groundToAdd, stage, GroundHandler);
        }
    }
};

GroundHandler.prototype.addWall = function(numberToAdd, stage, GroundHandler) {
    for (var n = 0; n < numberToAdd; n++) {
        var ground = new Ground();
        ground.setPositionAndScale(ground);
        GroundHandler.ground.push(ground);
        stage.addChild(ground);
    }
};