/**
 * Created by ajt on 4/18/2016.
 */
function GumballHandler() {
    //array of gumball objects
    this.gumballs = [];
    this.constructGumballs();
}

GumballHandler.constructor = GumballHandler;

GumballHandler.prototype.constructGumballs = function() {
    for (var n = 0; n < GameVariables.getGumballs(); n++) {
        this.gumballs.push(new Gumball);
    }
};

GumballHandler.prototype.setPositionAndScale = function(gumballHandler) {
    for (var n = 0; n < gumballHandler.gumballs.length; n++) {
        gumballHandler.gumballs[n].setPositionAndScale(gumballHandler.gumballs[n]);
    }
};

GumballHandler.prototype.addGumballsToStage = function(gumballHandler, stage) {
    for (var n = 0; n < gumballHandler.gumballs.length; n++) {
        stage.addChild(gumballHandler.gumballs[n]);
    }
};

GumballHandler.prototype.update = function(gumballHandler, characterObj, stage) {
    for (var n = 0; n < GameVariables.getGumballs(); n++) {
        if (gumballHandler.gumballs[n]) {
            gumballHandler.gumballs[n].update(gumballHandler.gumballs[n], characterObj);
        }
        //if there are not enough gumballs, add another
        else {
            this.addGumball(1, stage, gumballHandler);
        }
        gumballHandler.gumballs[n].update(gumballHandler.gumballs[n], characterObj);
    }
};

GumballHandler.prototype.addGumball = function(numberToAdd, stage, gumballHandler) {
    for (var n = 0; n < numberToAdd; n++) {
        var gumball = new Gumball();
        gumball.setPositionAndScale(gumball);
        gumballHandler.gumballs.push(gumball);
        stage.addChild(gumball);
    }
};