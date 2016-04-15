/**
 * Created by ajt on 3/12/2016.
 */
function TitleBoard() {
    PIXI.Container.call(this);
    this.constructTitleBoard();
}

TitleBoard.constructor = TitleBoard;
TitleBoard.prototype = Object.create(PIXI.Container.prototype);

TitleBoard.prototype.constructTitleBoard = function() {
    this.Properties = new TitleBoardProperties();
    this.initiateTitleBoardSprites();
};
TitleBoard.prototype.setPositionAndScale = function(obj) {
    obj.position =  GameVariables.getNewPoint((GameVariables.getWidth() - obj.width)/2, (GameVariables.getHeight() - obj.height)/2);
    //no scale yet...
};
TitleBoard.prototype.initiateTitleBoardSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("Title1"),
        PIXI.Texture.fromFrame("Title2")
    );
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
TitleBoard.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
TitleBoard.prototype.update = function(titleBoardObj) {
    this.updateSprites();
};
TitleBoard.prototype.updateSprites = function() {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};
TitleBoard.prototype.nextSprite = function() {
    if (this.Properties.spriteCount == 1) {
        this.Properties.spriteCount = 0;
    }
    else {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};