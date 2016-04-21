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
        obj.position =  GameVariables.getNewPoint(-100, this.Properties.startingY);
        obj.scale = GameVariables.getNewPoint(.35,.35);
};
Gumball.prototype.initiateGumballSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("gum1Blue"),
        PIXI.Texture.fromFrame("gum3Red"),
        PIXI.Texture.fromFrame("gum2Blue"),
        PIXI.Texture.fromFrame("gum4Red")
    );
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
Gumball.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Gumball.prototype.update = function(gumballObj, groundObj, characterObj) {
    this.updateSprite();
    //this.moveSprite(gumballObj, groundObj, characterObj);
    /*this.updateSprites(gumballObj, groundObj, characterObj);*/
};
Gumball.prototype.updateSprite = function() {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
Gumball.prototype.updateSprites = function(gumballObj, groundObj, characterObj) {
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        if (gumballObj.children[i].position.x < (0-gumballObj.children[i].width)) {
            gumballObj.children[i].position = this.getNewPosition(groundObj, this.Properties.startingX);
            this.updateTexture(gumballObj.children[i]);
        }
        //check if the character and gumball are intersecting
        else if(this.isIntersecting(gumballObj.children[i], characterObj)) {
            ScoreHelper().pickupGumball();
            gumballObj.children[i].position = this.getNewPosition(groundObj, this.Properties.startingX);
            this.updateTexture(gumballObj.children[i]);
        }
        gumballObj.children[i].position.x -= groundObj.Properties.speed;
    }
};
Gumball.prototype.nextSprite = function() {
    if (this.Properties.spriteCount == this.Properties.textures.length-1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
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