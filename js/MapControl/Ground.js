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
    obj.position.y =  300;
    //no scale yet...
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
        this.Properties.sprites[i].position.x -= 10;
        if (this.Properties.sprites[i].position.x + this.Properties.spriteWidth < 0) {
            this.Properties.sprites[i].position.x = this.Properties.spriteWidth * this.Properties.spriteCount;
        }
    }
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