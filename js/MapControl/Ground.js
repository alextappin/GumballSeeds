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
        obj.children[i].position =  GameVariables.getNewPoint(obj.children[i].width * i, 400);
        obj.children[i].scale = GameVariables.getNewPoint(1,1);
    }
};
Ground.prototype.initiateGroundSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("fg5New")
    );
    //will have around 4 sprites for the ground. The ground will be moving. In the future, it may be better to have 2...
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        this.Properties.sprites.push(new PIXI.Sprite(this.Properties.textures[0]));
        this.addChild(this.Properties.sprites[i]);
    }

};
Ground.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Ground.prototype.update = function(obj) {
    this.updateSprites(obj);
};
Ground.prototype.updateSprites = function(obj) {
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        if (obj.children[i].position.x < this.Properties.spriteWidth) {
            obj.children[i].position.x = this.calcuateNewPosition(obj, i);
        }
        else {
            obj.children[i].position.x -= this.Properties.speed;
        }
    }
};
Ground.prototype.calcuateNewPosition = function(obj, currentElement) {
    var lastElementChanged = currentElement - 1 < 0 ? obj.children.length-1 : currentElement - 1;
    return (obj.children[lastElementChanged].position.x + obj.children[lastElementChanged].width - this.Properties.speed);
};/*
Ground.prototype.nextSprite = function() {
    if (this.Properties.spriteCount == 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};*/