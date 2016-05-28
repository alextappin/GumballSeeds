/**
 * Created by ajt on 4/18/2016.
 */
function GumballsHandler() {
    this.gumballs = []; //array of gumball objects pool
    this.gumballStructure = [];
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
    this.setupStartGumballs(gumballHandler);
    for (var n = 0; n < gumballHandler.gumballs.length; n++) {
        stage.addChild(gumballHandler.gumballs[n]);
    }
};

GumballsHandler.prototype.setupStartGumballs = function(gumballHandler) {
    HelperFunctions().shuffleArray(gumballHandler.gumballs); //shuffle the array of gumball objects...

    gumballHandler.gumballStructure.push( //3 gumballs at a time... maximum
        gumballHandler.gumballs.pop(),
        gumballHandler.gumballs.pop(),
        gumballHandler.gumballs.pop()
    );

    for (var n = 0; n < gumballHandler.gumballStructure.length; n++) {
        gumballHandler.gumballStructure[n].position = HelperFunctions().getNewPoint(0,0);
    }
};

GumballsHandler.prototype.getNewPosition = function(gumballHandler, index, groundObj, recurseAdd) {
    var newGumballX = gumballHandler.gumballStructure[index-1].position.x + this.calculateRandomSpace(),
        groundHeight = groundObj.getHeightAtPositionX(newGumballX, groundObj);

    if (groundHeight) {
        return HelperFunctions().getNewPoint(newGumballX, groundHeight);
    }
    //recursion. If there is a gap, check another X
    return this.getNewPosition(gumballHandler, index, groundObj, MapGlobals.screenWidth / MapGlobals.gumballSpaceConst);
};

GumballsHandler.prototype.calculateRandomSpace = function() {
    //1/10 of the screen width * a random number between 1 and 15. Example (1280/10) * 5 = 640 unit space
    return (MapGlobals.screenWidth / gumballSpaceConst) * (HelperFunctions().getRandomNumber(1, 15))
};

GumballsHandler.prototype.update = function(gumballHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < gumballHandler.gumballStructure.length; n++) {
        gumballHandler.gumballStructure[n].update(gumballHandler.gumballStructure[n]);
    }

    this.handleOffScreen(gumballHandler, groundObj, stage);
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

GumballsHandler.prototype.handleOffScreen = function(gumballHandler, groundObj, stage) {
    if (gumballHandler.gumballStructure[0].position.x < 0 - gumballHandler.gumballStructure[0].width) {
        this.returnPiece(gumballHandler.gumballStructure.shift(), gumballHandler, stage);
        this.addNewGumball(gumballHandler, groundObj, stage);
    }
};

GumballsHandler.prototype.returnPiece = function(piece, gumballHandler, stage) {
    stage.removeChild(piece);
    gumballHandler.gumballs.push(piece);
    HelperFunctions().shuffleArray(gumballHandler.gumballs);
};

GumballsHandler.prototype.addNewGumball = function(gumballHandler, groundObj, stage) {
    gumballHandler.gumballStructure.push(
        gumballHandler.gumballs.pop()
    );

    gumballHandler.gumballStructure[gumballHandler.gumballStructure-1].position = this.getNewPosition(
        gumballHandler,
        gumballHandler.gumballStructure.length-1,
        groundObj
    );

    stage.addChildAt(
        gumballHandler.gumballStructure[gumballHandler.gumballStructure-1],
        MapGlobals.addGumballChildConst
    );
};