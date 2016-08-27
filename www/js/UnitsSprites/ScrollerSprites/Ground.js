/**
 * Created by ajt on 4/10/2016.
 */
function Ground(groundType) {
    PIXI.Container.call(this);
    this.constructGround(groundType);
}

Ground.constructor = Ground;
Ground.prototype = Object.create(PIXI.Container.prototype);

Ground.prototype.constructGround = function(groundType) {
    this.Properties = new GroundProperties();
    this.Properties.type = groundType;
    this.initiateGroundSprite();
};

Ground.prototype.setPositionAndScale = function(obj) {
    if (obj.Properties.type != MainGlobals.Map.groundA && obj.Properties.type != MainGlobals.Map.groundB) {
        //end or start pieces. #pragma since this happens more often...
        MainGlobals.Scaling.groundEndStartRatio = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height,MainGlobals.Scaling.groundEndStartPercentOfScreen); //access array and grab correct ratios out of array
        obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.groundEndStartRatio,MainGlobals.Scaling.groundEndStartRatio);
    } else {
        //one of the main ground slices
        MainGlobals.Scaling.groundMainRatio = MainGlobals.Helpers.getScreenRatioUsingHeight(obj.height,MainGlobals.Scaling.groundMainPercentOfScreen); //access array and grab correct ratios out of array
        obj.scale = MainGlobals.Helpers.getNewPoint(MainGlobals.Scaling.groundMainRatio,MainGlobals.Scaling.groundMainRatio);
    }
    obj.position = MainGlobals.Helpers.getNewPoint(0, 0);
};

Ground.prototype.initiateGroundSprite = function() {
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame(this.Properties.type)));
};

Ground.prototype.update = function(obj) {
    obj.position.x -= MainGlobals.Scroller.groundSpeed;
    obj.alpha = 1;
};

Ground.prototype.updatePowerUp = function(obj) {
    obj.position.x -= MainGlobals.Scroller.groundSpeed;
    obj.alpha = 0;
};

