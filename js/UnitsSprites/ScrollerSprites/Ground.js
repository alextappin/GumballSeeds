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
    if (obj.Properties.type != MapGlobals.groundA && obj.Properties.type != MapGlobals.groundB) {
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
    this.updateSprites(obj);
};

Ground.prototype.updatePowerUp = function(obj) {
    this.updateSprites(obj);
};

Ground.prototype.updateSprites = function(obj) {
    obj.position.x -= ScrollerGlobals.groundSpeed;/*
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        if (obj.children[i].position.x < (0-obj.children[i].width)) {
            if (this.doGapAndHeight()) {
                obj.children[i].position.x = this.calcuateNewPosition(obj, i) + this.getRandomSpace();
                obj.children[i].position.y = this.getRandomHeight();
            }
            else {
                obj.children[i].position.x = this.calcuateNewPosition(obj, i);
                //get the height of the part currently on the end so the heights match up and dont look weird without gap.
                obj.children[i].position.y = obj.children[i - 1 < 0 ? obj.children.length-1 : i - 1].position.y
            }

        }
        else {
            obj.children[i].position.x -= ScrollerGlobals.groundSpeed;
        }
    }*/
};
Ground.prototype.calcuateNewPosition = function(obj, currentElement) {
    var lastElementChanged = currentElement - 1 < 0 ? obj.children.length-1 : currentElement - 1;
    return (obj.children[lastElementChanged].position.x + obj.children[lastElementChanged].width - ScrollerGlobals.groundSpeed-1);
};
Ground.prototype.getHeightAtPositionX = function(positionX) {
    for (var i = 0; i < this.Properties.sprites.length; i++) {
        if (this.Properties.sprites[i].position.x < positionX
            && this.Properties.sprites[i].width + this.Properties.sprites[i].position.x > positionX) {
            return this.Properties.sprites[i].position.y;
        }
    }
    //if nothing is returned... it is a gap. No wall.
    return undefined;
};
Ground.prototype.doGapAndHeight = function() {
    //random true or false. If there is a height change, there is also a gap.
    return Math.round(Math.random()) == 1;
};
Ground.prototype.getRandomHeight = function() {
    return Math.floor((Math.random() * (this.Properties.yPositionMax-this.Properties.yPositionMin)) + this.Properties.yPositionMin);
};
Ground.prototype.getRandomSpace = function() {
    return Math.floor((Math.random() * (this.Properties.largeGapConst-this.Properties.smallGapConst)) + this.Properties.smallGapConst);
};