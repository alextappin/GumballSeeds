/**
 * Created by t_tappa on 5/6/2016.
 */
function GroundHandler() {
    //array of gumball objects
    this.groundObjects = {
        startA : [],
        startB : [],
        groundA : [],
        groundB : [],
        endA : [],
        endB : []
    };
    this.groundStructure = [];

    this.constructGround();
}

GroundHandler.constructor = GroundHandler;

GroundHandler.prototype.constructGround = function() {
    for (var n = 0; n < MapGlobals.groundSlices; n++) {
        this.groundObjects.startA.push(new Ground(MapGlobals.groundStartA));
        this.groundObjects.startB.push(new Ground(MapGlobals.groundStartB));
        this.groundObjects.groundA.push(new Ground(MapGlobals.groundA));
        this.groundObjects.groundB.push(new Ground(MapGlobals.groundB));
        this.groundObjects.endA.push(new Ground(MapGlobals.groundEndA));
        this.groundObjects.endB.push(new Ground(MapGlobals.groundEndB));
    }
};

GroundHandler.prototype.setPositionAndScale = function(GroundHandler) {
    for (var n = 0; n < MapGlobals.groundSlices; n++) {
        GroundHandler.groundObjects.startA[n].setPositionAndScale(GroundHandler.groundObjects.startA[n]);
        GroundHandler.groundObjects.startB[n].setPositionAndScale(GroundHandler.groundObjects.startB[n]);
        GroundHandler.groundObjects.groundA[n].setPositionAndScale(GroundHandler.groundObjects.groundA[n]);
        GroundHandler.groundObjects.groundB[n].setPositionAndScale(GroundHandler.groundObjects.groundB[n]);
        GroundHandler.groundObjects.endA[n].setPositionAndScale(GroundHandler.groundObjects.endA[n]);
        GroundHandler.groundObjects.endB[n].setPositionAndScale(GroundHandler.groundObjects.endB[n]);
    }
};

GroundHandler.prototype.addGroundToStage = function(groundHandler, stage) {
    this.setupStartGround(groundHandler);

    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        stage.addChild(groundHandler.groundStructure[n]);
    }

};

GroundHandler.prototype.setupStartGround = function(groundHandler) {
    //starting groundStructure will just be A B A B
    groundHandler.groundStructure.push(
        groundHandler.groundObjects.groundA.pop(),
        groundHandler.groundObjects.groundB.pop(),
        groundHandler.groundObjects.groundA.pop(),
        groundHandler.groundObjects.groundB.pop()
    );
    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        groundHandler.groundStructure[n].position = HelperFunctions().getNewPoint(
            this.getNewPosition(groundHandler, n),
            MapGlobals.groundY * MapGlobals.screenHeight
        );
    }
};

GroundHandler.prototype.getNewPosition = function(groundHandler, index) {
    if (index > 0) {
        return groundHandler.groundStructure[index-1].width + groundHandler.groundStructure[index-1].position.x;
    } else {
        return 0;
    }
};

GroundHandler.prototype.update = function(groundHandler, stage) {
    this.handleOffScreen(groundHandler, stage);
    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        groundHandler.groundStructure[n].update(groundHandler.groundStructure[n]);
    }
};

GroundHandler.prototype.handleOffScreen = function(groundHandler, stage) {
    if (groundHandler.groundStructure[0].position.x < 0 - groundHandler.groundStructure[0].width) {
        this.returnPiece(groundHandler.groundStructure.shift(), groundHandler, stage);
        this.addNewGround(groundHandler, stage)
    }
};

GroundHandler.prototype.addNewGround = function(groundHandler, stage) {
    groundHandler.groundStructure.push(this.getNextPieceType(groundHandler));
    groundHandler.groundStructure[groundHandler.groundStructure.length - 1].position =
        HelperFunctions().getNewPoint(
            this.getNewPosition(
                groundHandler,
                groundHandler.groundStructure.length - 1
            ),
            MapGlobals.groundY * MapGlobals.screenHeight
        );
    stage.addChild(groundHandler.groundStructure[groundHandler.groundStructure.length - 1]);
};

GroundHandler.prototype.getNextPieceType = function(groundHandler) {
    if (groundHandler.groundObjects.groundA.length >= groundHandler.groundObjects.groundB.length) {
        return groundHandler.groundObjects.groundA.pop();
    } else {
        return groundHandler.groundObjects.groundB.pop();
    }
};

GroundHandler.prototype.returnPiece = function(piece, groundHandler, stage) {
    //pushed the piece to the correct pooooool
    stage.removeChild(piece);
    switch(piece.Properties.type) {
        case MapGlobals.groundA: groundHandler.groundObjects.groundA.push(piece);
            break;
        case MapGlobals.groundB: groundHandler.groundObjects.groundB.push(piece);
            break;
        case MapGlobals.groundStartA: groundHandler.groundObjects.startA.push(piece);
            break;
        case MapGlobals.groundStartB: groundHandler.groundObjects.startB.push(piece);
            break;
        case MapGlobals.groundEndA: groundHandler.groundObjects.endA.push(piece);
            break;
        case MapGlobals.groundEndB: groundHandler.groundObjects.endB.push(piece);
            break;
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