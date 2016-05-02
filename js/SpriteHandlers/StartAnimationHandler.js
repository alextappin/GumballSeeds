/**
 * Created by ajt on 5/2/2016.
 */
function StartAnimationHandler() {
    //array of gumball objects
    this.animationSprites = [];
    this.constructSprites();
}

StartAnimationHandler.constructor = StartAnimationHandler;

StartAnimationHandler.prototype.constructSprites = function() {
    for (var n = 0; n < MapGlobals.startAnimationSprites; n++) {
        this.animationSprites.push(new StartAnimation);
    }
};

StartAnimationHandler.prototype.setPositionAndScale = function(StartAnimationHandler) {
    for (var n = 0; n < 1; n++) {
        StartAnimationHandler.animationSprites[n].setPositionAndScale(StartAnimationHandler.animationSprites[n]);
    }
};

StartAnimationHandler.prototype.addSpritesToStage = function(StartAnimationHandler, stage) {
    for (var n = 0; n < StartAnimationHandler.animationSprites.length; n++) {
        stage.addChild(StartAnimationHandler.animationSprites[n]);
    }
};

StartAnimationHandler.prototype.update = function(StartAnimationHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.animationSprites; n++) {
        if (StartAnimationHandler.animationSprites[n]) {
            StartAnimationHandler.animationSprites[n].update(StartAnimationHandler.animationSprites[n], groundObj, characterObj);
        } else {
            this.addGumball(BalanceGlobals.animationSpritesToAdd, stage, StartAnimationHandler); //if there are not enough animationSprites, add another
        }
    }
};

StartAnimationHandler.prototype.updatePowerUp = function(StartAnimationHandler, groundObj, characterObj, stage) {
    for (var n = 0; n < BalanceGlobals.animationSprites; n++) {
        if (StartAnimationHandler.animationSprites[n]) {
            StartAnimationHandler.animationSprites[n].updatePowerUp(StartAnimationHandler.animationSprites[n], groundObj, characterObj);
        }
        //if there are not enough animationSprites, add another
        else {
            this.addGumball(BalanceGlobals.animationSpritesToAdd, stage, StartAnimationHandler);
        }
    }
};

StartAnimationHandler.prototype.addGumball = function(numberToAdd, stage, StartAnimationHandler) {
    for (var n = 0; n < numberToAdd; n++) {
        var gumball = new Gumball();
        gumball.setPositionAndScale(gumball);
        StartAnimationHandler.animationSprites.push(gumball);
        stage.addChild(gumball);
    }
};