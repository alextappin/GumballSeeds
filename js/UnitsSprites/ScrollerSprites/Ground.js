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
        ScalingGlobals.groundEndStartRatio = HelperFunctions().getScreenRatioUsingHeight(obj.height,ScalingGlobals.groundEndStartPercentOfScreen); //access array and grab correct ratios out of array
        obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.groundEndStartRatio,ScalingGlobals.groundEndStartRatio);
    } else {
        //one of the main ground slices
        ScalingGlobals.groundMainRatio = HelperFunctions().getScreenRatioUsingHeight(obj.height,ScalingGlobals.groundMainPercentOfScreen); //access array and grab correct ratios out of array
        obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.groundMainRatio,ScalingGlobals.groundMainRatio);
    }
    obj.position = HelperFunctions().getNewPoint(0, 0);
};

Ground.prototype.initiateGroundSprite = function() {
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame(this.Properties.type)));
};

Ground.prototype.update = function(obj) {
    obj.position.x -= ScrollerGlobals.groundSpeed;
};

Ground.prototype.updatePowerUp = function(obj) {
    obj.position.x -= ScrollerGlobals.groundSpeed;
};

