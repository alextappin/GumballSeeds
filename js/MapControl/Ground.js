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
    obj.position =  GameVariables.getNewPoint((GameVariables.getWidth() - obj.width)/2, (GameVariables.getHeight() - obj.height)/2);
    //no scale yet...
};
Ground.prototype.initiateGroundSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("Title1"),
        PIXI.Texture.fromFrame("Title2")
    );
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
Ground.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Ground.prototype.update = function(titleBoardObj) {
    this.updateSprites();
};
Ground.prototype.updateSprites = function() {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
Ground.prototype.nextSprite = function() {
    if (this.Properties.spriteCount == 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};