/**
 * Created by ajt on 11/29/2015.
 */
function Scroller(stage) {
    this.far = new Far();
    stage.addChild(this.far);

    this.mid = new Mid();
    stage.addChild(this.mid);

    this.front = new Walls();
    stage.addChild(this.front);

    this.character = new Character();
    stage.addChild(this.character);
    this.mapBuilder = new MapBuilder(this.front);

    this.viewportX = 0;
}

Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.front.setViewportX(viewportX);
    this.character.position.y += .15;
    if (this.front.slicesAreLow()) {
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