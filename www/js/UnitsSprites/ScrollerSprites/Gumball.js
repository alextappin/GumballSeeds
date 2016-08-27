/**
 * Created by ajt on 3/12/2016.
 */
function Gumball(gumballColor) {
    PIXI.Container.call(this);
    this.constructGumball(gumballColor);
}

Gumball.constructor = Gumball;
Gumball.prototype = Object.create(PIXI.Container.prototype);

Gumball.prototype.constructGumball = function(gumballColor) {
    this.Properties = new GumballProperties();
    this.Properties.color = MainGlobals.Map.gumballs[gumballColor];
    this.initiateGumballSprites();
};

Gumball.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.gumballRatio = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.gumballPercentOfScreen);
    obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.gumballRatio, MainGlobals.Scaling.gumballRatio);
    obj.position =  MainGlobals.Helpers.getNewPoint(MainGlobals.ScreenWidth+obj.width, 0);
};

Gumball.prototype.initiateGumballSprites = function() {
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame(this.Properties.color)));
};

Gumball.prototype.update = function(gumballObj) {
    gumballObj.position.x -= MainGlobals.Scroller.groundSpeed;
    gumballObj.visible = true;
};

Gumball.prototype.updatePowerUp = function(gumballObj) {
    gumballObj.visible = false;
};