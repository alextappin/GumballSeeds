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
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        obj.children[i].position =  GameVariables.getNewPoint(-100, this.Properties.startingY);
        obj.children[i].scale = GameVariables.getNewPoint(.35,.35);
    }
    //no scale yet...
};
Gumball.prototype.initiateGumballSprites = function() {
    this.Properties.textures.push(
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
Gumball.prototype.update = function(gumballObj, groundObj, characterObj) {
    this.updateSprites(gumballObj, groundObj, characterObj);
};
Gumball.prototype.updateSprites = function(gumballObj, groundObj, characterObj) {
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        if (gumballObj.children[i].position.x < (0-gumballObj.children[i].width) || this.isIntersecting(gumballObj.children[i], characterObj)) {

            gumballObj.children[i].position = this.getNewPosition(groundObj, this.Properties.startingX);
        }
        gumballObj.children[i].position.x -= groundObj.Properties.speed;
    }
};
Gumball.prototype.getNewPosition = function(groundObj, gumballX) {
    var groundHeight = groundObj.getHeightAtPositionX(gumballX);
    if (groundHeight) {
        return GameVariables.getNewPoint(gumballX, groundHeight-this.Properties.yGumballOffsetWithMap);
    }
    //recursion. If there is a gap, check another X
    return this.getNewPosition(groundObj, gumballX + 500);
};
Gumball.prototype.isIntersecting = function(rectangle1, rectangle2) {
    return !(rectangle2.position.x > (rectangle1.position.x + rectangle1.width) ||
    (rectangle2.position.x + rectangle2.width) < rectangle1.x ||
    rectangle2.position.y > (rectangle1.position.y + rectangle1.height) ||
    (rectangle2.position.y + rectangle2.height) < rectangle1.position.y);
};