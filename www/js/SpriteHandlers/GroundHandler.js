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
    for (var n = 0; n < MainGlobals.Map.groundSlices; n++) {
        this.groundObjects.startA.push(new Ground(MainGlobals.Map.groundStartA));
        this.groundObjects.startB.push(new Ground(MainGlobals.Map.groundStartB));
        this.groundObjects.groundA.push(new Ground(MainGlobals.Map.groundA));
        this.groundObjects.groundB.push(new Ground(MainGlobals.Map.groundB));
        this.groundObjects.endA.push(new Ground(MainGlobals.Map.groundEndA));
        this.groundObjects.endB.push(new Ground(MainGlobals.Map.groundEndB));
    }
};

GroundHandler.prototype.setPositionAndScale = function(GroundHandler) {
    for (var n = 0; n < MainGlobals.Map.groundSlices; n++) {
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
        groundHandler.groundObjects.groundB.pop(),
        groundHandler.groundObjects.groundA.pop(),
        groundHandler.groundObjects.groundB.pop()
    );

    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        groundHandler.groundStructure[n].position = MainGlobals.Helpers.getNewPoint(
            this.getNewPosition(groundHandler, n),
            MainGlobals.Map.groundY
        );
    }
};

GroundHandler.prototype.getNewPosition = function(groundHandler, index) {
    if (index > 0) {
        return groundHandler.groundStructure[index-1].width + groundHandler.groundStructure[index-1].position.x - MainGlobals.Scroller.groundSpeed;
    } else {
        return 0;
    }
};

GroundHandler.prototype.update = function(groundHandler, stage) {
    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        groundHandler.groundStructure[n].update(groundHandler.groundStructure[n]);
    }

    this.handleOffScreen(groundHandler, stage);
};

GroundHandler.prototype.updatePowerUp = function(groundHandler, stage) {
    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        groundHandler.groundStructure[n].updatePowerUp(groundHandler.groundStructure[n]);
    }

    this.handleOffScreen(groundHandler, stage);
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
        MainGlobals.Helpers.getNewPoint(
            this.getNewPosition(
                groundHandler,
                groundHandler.groundStructure.length - 1
            ),
            MainGlobals.Map.groundY
        );
    stage.addChildAt(groundHandler.groundStructure[groundHandler.groundStructure.length - 1], MainGlobals.Map.addGroundChildConst);
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
        case MainGlobals.Map.groundA: groundHandler.groundObjects.groundA.push(piece);
            break;
        case MainGlobals.Map.groundB: groundHandler.groundObjects.groundB.push(piece);
            break;
        case MainGlobals.Map.groundStartA: groundHandler.groundObjects.startA.push(piece);
            break;
        case MainGlobals.Map.groundStartB: groundHandler.groundObjects.startB.push(piece);
            break;
        case MainGlobals.Map.groundEndA: groundHandler.groundObjects.endA.push(piece);
            break;
        case MainGlobals.Map.groundEndB: groundHandler.groundObjects.endB.push(piece);
            break;
    }
};

GroundHandler.prototype.getHeightAtPositionX = function(posX, groundHandler) {
    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        if (groundHandler.groundStructure[n].position.x + groundHandler.groundStructure[n].width > posX) {
            return groundHandler.groundStructure[n].position.y - groundHandler.groundStructure[n].height;// TODO: this1.5 is placeholder...
        }
    }
    return 0;
};