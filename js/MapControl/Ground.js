/**
 * Created by ajt on 4/10/2016.
 */
function Ground() {
    PIXI.Container.call(this);
    this.constructGround();
}

Ground.constructor = Ground;
Ground.prototype = Object.create(PIXI.Container.prototype);

Ground.prototype.constructGround = function() {
    this.Properties = new GroundProperties();
    this.initiateGroundSprites();
};
Ground.prototype.setPositionAndScale = function(obj) {
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        obj.children[i].position =  HelperFunctions().getNewPoint(obj.children[i].width * i, this.Properties.positionY);
        obj.children[i].scale = HelperFunctions().getNewPoint(1,1);
    }
};
Ground.prototype.initiateGroundSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("fg5New")
    );
    //will have around 4 sprites for the ground. The ground will be moving. In the future, it may be better to have 2...
    for (var i = 0; i < this.Properties.numberStartingSprites; i++) {
        this.createSprite();
    }

};
Ground.prototype.createSprite = function() {
    this.Properties.sprites.push(new PIXI.Sprite(this.Properties.textures[0]));
    this.Properties.numberOfSprites++;
    this.addChild(this.Properties.sprites[this.Properties.numberOfSprites-1]);
};
Ground.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Ground.prototype.update = function(obj) {
    this.updateSprites(obj);
};
Ground.prototype.updatePowerUp = function(obj) {
    this.updateSprites(obj);
};
Ground.prototype.updateSprites = function(obj) {
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
    }
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