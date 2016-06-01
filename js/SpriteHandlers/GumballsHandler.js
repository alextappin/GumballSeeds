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
    for (var n = 0; n < MainGlobals.Map.gumballsPerColor; n++) { //there will be 3 of each color in the array...
        for (var i = 0; i < MainGlobals.Map.gumballs.length; i++) {
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

    for (var n = 0; n < gumballHandler.gumballStructure.length; n++) {
        stage.addChild(gumballHandler.gumballStructure[n]);
    }
};

GumballsHandler.prototype.setupStartGumballs = function(gumballHandler) {
    MainGlobals.Helpers.shuffleArray(gumballHandler.gumballs); //shuffle the array of gumball objects...

    gumballHandler.gumballStructure.push( //2 gumballs at a time... maximum
        gumballHandler.gumballs.pop(),
        gumballHandler.gumballs.pop()
    );

    for (var n = 0; n < gumballHandler.gumballStructure.length; n++) {
        gumballHandler.gumballStructure[n].position = MainGlobals.Helpers.getNewPoint(
            0-gumballHandler.gumballStructure[n].width,
            0
        );
    }
};

GumballsHandler.prototype.getNewPosition = function(gumballHandler, index, groundObj, recurseAdd) {
    var newGumballX = gumballHandler.gumballStructure[index-1].position.x + this.calculateRandomSpace() + recurseAdd,
        groundHeight = groundObj.getHeightAtPositionX(newGumballX, groundObj) + MainGlobals.Scaling.gumballPercentageY;

    if (groundHeight) {
        return MainGlobals.Helpers.getNewPoint(
            newGumballX,
            groundHeight + (MainGlobals.ScreenHeight * MainGlobals.Map.gumballHeightConst)
        );
    }
    //recursion. If there is a gap, check another X
    if (groundObj.groundStructure[groundObj.groundStructure.length - 1].position.x > newGumballX) {
        return this.getNewPosition(
            gumballHandler,
            index,
            groundObj,
            MainGlobals.ScreenWidth / MainGlobals.Map.gumballSpaceConst
        );
    } else { //the new position is past the last ground...
        return MainGlobals.Helpers.getNewPoint(
            groundObj.groundStructure[groundObj.groundStructure.length - 1].position.x,
            groundObj.groundStructure[groundObj.groundStructure.length - 1].position.y
        );
    }
};

GumballsHandler.prototype.calculateRandomSpace = function() {
    //1/x of the screen width * a random number between 1 and 15. Example (1280/x) * 5 =  6400/x unit space
    return (MainGlobals.ScreenWidth / MainGlobals.Map.gumballSpaceConst) * (MainGlobals.Helpers.getRandomNumber(4, 10))
};

GumballsHandler.prototype.update = function(gumballHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < gumballHandler.gumballStructure.length; n++) {
        gumballHandler.gumballStructure[n].update(gumballHandler.gumballStructure[n]);
    }

    this.handleOffScreen(gumballHandler, groundObj, stage);
    this.characterGrab(gumballHandler, characterObj, groundObj, stage);
};

GumballsHandler.prototype.updatePowerUp = function(gumballHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < gumballHandler.gumballStructure.length; n++) {
        gumballHandler.gumballStructure[n].update(gumballHandler.gumballStructure[n]);
    }

    this.handleOffScreen(gumballHandler, groundObj, stage);
    this.characterGrab(gumballHandler, characterObj, groundObj, stage);
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
    MainGlobals.Helpers.shuffleArray(gumballHandler.gumballs);
};

GumballsHandler.prototype.addNewGumball = function(gumballHandler, groundObj, stage) {
    gumballHandler.gumballStructure.push(
        gumballHandler.gumballs.pop()
    );

    gumballHandler.gumballStructure[gumballHandler.gumballStructure.length-1].position = this.getNewPosition(
        gumballHandler,
        gumballHandler.gumballStructure.length-1,
        groundObj,
        0
    );

    stage.addChildAt(
        gumballHandler.gumballStructure[gumballHandler.gumballStructure.length-1],
        MainGlobals.Map.addGumballChildConst
    );
};

GumballsHandler.prototype.characterGrab = function(gumballHandler, characterObj, groundObj, stage) {
    if (MainGlobals.Helpers.isIntersecting(gumballHandler.gumballStructure[0], characterObj)) {
        this.characterPickedUp(gumballHandler, groundObj, stage);
    }
};

GumballsHandler.prototype.characterPickedUp = function(gumballHandler, groundObj, stage) {
    MainGlobals.ScoreHelper.pickupGumball(gumballHandler.gumballStructure[0].Properties.color);
    this.returnPiece(gumballHandler.gumballStructure.shift(), gumballHandler, stage);
    this.addNewGumball(gumballHandler, groundObj, stage);
};