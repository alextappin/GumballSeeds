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
    this.Properties.explosionTextures.push(
        PIXI.Texture.fromFrame(this.Properties.color + '2'),
        PIXI.Texture.fromFrame('8 all gb3')
    );
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
    if (gumballObj.Properties.grabbed) {
        this.pickupAnimation(gumballObj);
    }
    gumballObj.alpha = 1;
};

Gumball.prototype.updatePowerUp = function(gumballObj) {
    this.update(gumballObj);
    gumballObj.alpha = 0;
};

Gumball.prototype.pickupAnimation = function(gumballObj) {
    gumballObj.Properties.changeSpriteCounter++;
    if (gumballObj.Properties.changeSpriteCounter >= MainGlobals.Timing.gumballExplosionTime) {
        gumballObj.Properties.changeSpriteCounter = 0;
        if (gumballObj.Properties.spriteCount < 2) {
            gumballObj.children[0].texture = gumballObj.Properties.explosionTextures[gumballObj.Properties.spriteCount];
            gumballObj.Properties.spriteCount++;
        } else {
            gumballObj.Properties.spriteCount = 0;
            gumballObj.children[0].texture = PIXI.Texture.fromFrame(gumballObj.Properties.color);
            gumballObj.Properties.exploded = true;
        }
    }
};