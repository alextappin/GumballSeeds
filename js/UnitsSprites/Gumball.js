/**
 * Created by ajt on 3/12/2016.
 */
function Gumball() {
    PIXI.Container.call(this);
    this.constructGumball();
}

Gumball.constructor = Gumball;
Gumball.prototype = Object.create(PIXI.Container.prototype);

Gumball.prototype.constructGumball = function() {
    this.Properties = new GumballProperties();
    this.initiateGumballSprites();
};
Gumball.prototype.setPositionAndScale = function(obj) {
    obj.position =  GameVariables.getNewPoint(this.Properties.startingX,this.Properties.startingY);
    obj.scale = GameVariables.getNewPoint(.2,.2);
    //no scale yet...
};
Gumball.prototype.initiateGumballSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("Gumballs"),
        PIXI.Texture.fromFrame("Gumballs")
    );
    for (var i = 0; i < this.Properties.numberStartingSprites; i++) {
        this.createSprite();
    }
};
Gumball.prototype.createSprite = function() {
    this.Properties.sprites.push(new PIXI.Sprite(this.Properties.textures[0]));
    this.Properties.numberOfSprites++;
    this.addChild(this.Properties.sprites[this.Properties.numberOfSprites-1]);
};
Gumball.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Gumball.prototype.update = function(gumballObj) {
    this.updateSprites();
};
Gumball.prototype.updateSprites = function() {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
Gumball.prototype.nextSprite = function() {
    if (this.Properties.spriteCount == 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};