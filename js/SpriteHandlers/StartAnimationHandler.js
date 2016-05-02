/**
 * Created by ajt on 5/2/2016.
 */
function StartAnimationHandler() {
    //array of gumball objects
    this.gumballs = [];
    this.constructGumballs();
}

StartAnimationHandler.constructor = StartAnimationHandler;

StartAnimationHandler.prototype.constructGumballs = function() {
    for (var n = 0; n < BalanceGlobals.gumballs; n++) {
        this.gumballs.push(new Gumball);
    }
};

StartAnimationHandler.prototype.setPositionAndScale = function(gumballHandler) {
    for (var n = 0; n < gumballHandler.gumballs.length; n++) {
        gumballHandler.gumballs[n].setPositionAndScale(gumballHandler.gumballs[n]);
    }
};

StartAnimationHandler.prototype.addGumballsToStage = function(gumballHandler, stage) {
    for (var n = 0; n < gumballHandler.gumballs.length; n++) {
        stage.addChild(gumballHandler.gumballs[n]);
    }
};

StartAnimationHandler.prototype.update = function(gumballHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.gumballs; n++) {
        if (gumballHandler.gumballs[n]) {
            gumballHandler.gumballs[n].update(gumballHandler.gumballs[n], groundObj, characterObj);
        } else {
            this.addGumball(BalanceGlobals.gumballsToAdd, stage, gumballHandler); //if there are not enough gumballs, add another
        }
    }
};

StartAnimationHandler.prototype.updatePowerUp = function(gumballHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.gumballs; n++) {
        if (gumballHandler.gumballs[n]) {
            gumballHandler.gumballs[n].updatePowerUp(gumballHandler.gumballs[n], groundObj, characterObj);
        }
        //if there are not enough gumballs, add another
        else {
            this.addGumball(BalanceGlobals.gumballsToAdd, stage, gumballHandler);
        }
    }
};

StartAnimationHandler.prototype.addGumball = function(numberToAdd, stage, gumballHandler) {
    for (var n = 0; n < numberToAdd; n++) {
        var gumball = new Gumball();
        gumball.setPositionAndScale(gumball);
        gumballHandler.gumballs.push(gumball);
        stage.addChild(gumball);
    }
};