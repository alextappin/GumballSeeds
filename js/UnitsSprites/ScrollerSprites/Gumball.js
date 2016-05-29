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
    ScalingGlobals.gumballRatio = HelperFunctions().getScreenRatioUsingHeight(obj.height, ScalingGlobals.gumballPercentOfScreen);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.gumballRatio, ScalingGlobals.gumballRatio);
    obj.position =  HelperFunctions().getNewPoint(MainGlobals.ScreenWidth+obj.width, 0);
};

Gumball.prototype.initiateGumballSprites = function() {
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame(this.Properties.color)));
};

Gumball.prototype.update = function(gumballObj) {
    gumballObj.position.x -= ScrollerGlobals.groundSpeed;
};

Gumball.prototype.updatePowerUp = function(gumballObj) {
    gumballObj.position.x -= ScrollerGlobals.groundSpeed;
};