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
        console.log(groundHandler.groundStructure[n].position);
    }
};

GroundHandler.prototype.getNewPosition = function(groundHandler, index) {
    if (index > 0) {
        return groundHandler.groundStructure[index-1].width + groundHandler.groundStructure[index-1].position.x;
    } else {
        return 0;
    }
};

GroundHandler.prototype.update = function(groundHandler, groundObj, characterObj, stage) {

    this.handleOffScreen(groundHandler);
    for (var n = 0; n < groundHandler.groundStructure.length; n++) {
        groundHandler.groundStructure[n].update(groundHandler.groundStructure[n]);
    }

    /*for (var n = 0; n < MapGlobals.groundSlices; n++) {

    }



    for ( n = 0; n < BalanceGlobals.ground; n++) {
        if (GroundHandler.ground[n]) {
            GroundHandler.ground[n].update(GroundHandler.ground[n], groundObj, characterObj);
        } else {
            this.addWall(BalanceGlobals.groundToAdd, stage, GroundHandler); //if there are not enough ground, add another
        }
    }*/
};

GroundHandler.prototype.handleOffScreen = function(groundHandler) {

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