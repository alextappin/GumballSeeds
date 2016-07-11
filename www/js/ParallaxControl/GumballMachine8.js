/**
 * Created by ajt on 5/3/2016.
 */
/*function GumballMachine8() {
    var texture = PIXI.Texture.fromFrame("8 gumballmachine");
    PIXI.extras.TilingSprite.call(this, texture, texture.width, texture.height);

    var scale = MainGlobals.Helpers.getCorrectScaleWidth(this.width);
    this.scale = MainGlobals.Helpers.getNewPoint(scale ,scale);
    this.position = MainGlobals.Helpers.getNewPoint(0,0);
    this.tilePosition = MainGlobals.Helpers.getNewPoint(0,0);
    this.viewportX = 0;
}

GumballMachine8.constructor = GumballMachine8;
GumballMachine8.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

GumballMachine8.prototype.update = function(newViewportX) {
    this.tilePosition.x -= ((newViewportX - this.viewportX) * MainGlobals.Scroller.deltaX8); //distance traveled * change
    this.viewportX = newViewportX;
};*/



function GumballMachine8() {
    PIXI.Container.call(this);
    var texture = PIXI.Texture.fromFrame("8 gumballmachine");
    var sprite = new PIXI.Sprite(texture);
    this.addChild(sprite);
    this.viewportX = 0;
}

GumballMachine8.constructor = GumballMachine8;
GumballMachine8.prototype = Object.create(PIXI.Container.prototype);

GumballMachine8.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width);
    obj.position = MainGlobals.Helpers.getNewPoint(0,0);
    obj.scale = MainGlobals.Helpers.getNewPoint(scale, scale);
};

GumballMachine8.prototype.update = function(obj, newViewportX) {
    if (obj.position.x < 0 - obj.width) { //if its all the way off the left side of the screen, get new position
        this.getNewPosition(obj);
    }
    obj.position.x -= ((newViewportX - obj.viewportX) *  MainGlobals.Scroller.deltaX8); //distance traveled * change
    obj.viewportX = newViewportX;
};

GumballMachine8.prototype.getNewPosition = function(obj) {
    obj.position.x = (MainGlobals.ScreenWidth);
};