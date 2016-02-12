/**
 * Created by ajt on 11/29/2015.
 */
function Scroller(stage) {
    this.far = new Far();
    stage.addChild(this.far);

    this.mid = new Mid();
    stage.addChild(this.mid);

    this.mid2 = new Mid2();
    stage.addChild(this.mid2);

    this.front = new Walls();
    stage.addChild(this.front);

    this.character = new Character();
    this.character.position.y = 50;
    this.character.position.x = 65;
    this.character.scale.x = .5;
    this.character.scale.y = .5;
    stage.addChild(this.character);

    this.mapBuilder = new MapBuilder(this.front);

    this.viewportX = 0;
}
//

Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.mid2.setViewportX(viewportX);
    this.front.setViewportX(viewportX);
    this.character.updateSprite();
    this.jumpCharacter();
    this.applyFallingGravityToCharacter();
    if (this.front.slicesAreLow()) {
        //TODO:if slices are low, find which slice types are low and ADD THOSE ONES THAT ARE LOW
        this.mapBuilder.addAndBuildRandomSequence();
    }
};

Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};


//TODO put the jump character and apply falling gravity to character in same function. Grab the next and current slices one time. this will helper performance.

Scroller.prototype.jumpCharacter = function() {
    if (this.character.charIsJumping()) {
        this.character.position.y = this.character.moveHeightJumping(this.character.position.y, this.front.getCurrentSliceHeight(), this.front.getNextSliceHeight());
    }
    else {
        this.character.endJumping(this.character.position.y);
    }
};

Scroller.prototype.applyFallingGravityToCharacter = function() {
    this.character.checkIfFalling(this.front.getCurrentSliceHeight(), this.front.getNextSliceHeight());
};