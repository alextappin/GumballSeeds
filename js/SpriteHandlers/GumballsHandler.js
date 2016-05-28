/**
 * Created by ajt on 4/18/2016.
 */
function GumballsHandler() {
    this.gumballs = []; //array of gumball objects pool
    this.constructGumballs();
}

GumballsHandler.constructor = GumballsHandler;

GumballsHandler.prototype.constructGumballs = function() {
    for (var n = 0; n < BalanceGlobals.gumballsPerColor; n++) { //there will be 3 of each color in the array...
        for (var i = 0; i < MapGlobals.gumballs.length; i++) {
            this.gumballs.push(new Gumball(i));
        }
    }
};

GumballsHandler.prototype.setPositionAndScale = function(gumballHandler) {
    for (var n = 0; n < gumballHandler.gumballs.length; n++) {
        gumballHandler.gumballs[n].setPositionAndScale(gumballHandler.gumballs[n]);
    }
};

GumballsHandler.prototype.addGumballsToStage = function(gumballHandler, stage) {
    for (var n = 0; n < gumballHandler.gumballs.length; n++) {
        stage.addChild(gumballHandler.gumballs[n]);
    }
};

GumballsHandler.prototype.update = function(gumballHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.gumballs; n++) {
        if (gumballHandler.gumballs[n]) {
            gumballHandler.gumballs[n].update(gumballHandler.gumballs[n], groundObj, characterObj);
        } else {
            this.addGumball(BalanceGlobals.gumballsToAdd, stage, gumballHandler); //if there are not enough gumballs, add another
        }
    }
};

GumballsHandler.prototype.updatePowerUp = function(gumballHandler, groundObj, characterObj, stage) {
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

GumballsHandler.prototype.addGumball = function(numberToAdd, stage, gumballHandler) {
    for (var n = 0; n < numberToAdd; n++) {
        var gumball = new Gumball();
        gumball.setPositionAndScale(gumball);
        gumballHandler.gumballs.push(gumball);
        stage.addChild(gumball);
    }
};