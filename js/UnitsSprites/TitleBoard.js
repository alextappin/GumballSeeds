/**
 * Created by ajt on 3/11/2016.
 */
function TitleBoard() {
    PIXI.Container.call(this);
    this.constructTitleBoard();
}

TitleBoard.constructor = TitleBoard;
TitleBoard.prototype = Object.create(PIXI.Container.prototype);

TitleBoard.prototype.constructTitleBoard = function() {
    this.TitleBoardProperties = new TitleBoardProperties();
    this.initiateTitleBoardSprites();
};
TitleBoard.prototype.setPositionAndScale = function(obj) {
    obj.position =  GameVariables.getNewPoint((GameVariables.getWidth() - obj.width)/2, (GameVariables.getHeight() - obj.height)/2);
    //no scale yet...
};
TitleBoard.prototype.initiateTitleBoardSprites = function() {
    this.TitleBoardProperties.textures.push(
        PIXI.Texture.fromFrame("Title1"),
        PIXI.Texture.fromFrame("Title2")
    );
    this.TitleBoardProperties.sprite = new PIXI.Sprite(this.TitleBoardProperties.textures[this.TitleBoardProperties.spriteCount]);
    //add them to the array
    //this.TitleBoardProperties.boardSprites.push(sprite1,sprite2);
    this.addChild(this.TitleBoardProperties.sprite);
};
TitleBoard.prototype.setSpriteToCurrentTexture = function() {
    this.TitleBoardProperties.sprite.texture = this.TitleBoardProperties.textures[this.TitleBoardProperties.spriteCount];
};
TitleBoard.prototype.update = function(titleBoardObj) {
    this.updateSprites();
};
TitleBoard.prototype.updateSprites = function() {
    if (this.TitleBoardProperties.changeSpriteCounter == this.TitleBoardProperties.spriteSpeed) {
        this.TitleBoardProperties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.TitleBoardProperties.changeSpriteCounter++;
    }
};
TitleBoard.prototype.nextSprite = function() {
    if (this.TitleBoardProperties.spriteCount == 1) {
        this.TitleBoardProperties.spriteCount = 0;
    }
    else {
        this.TitleBoardProperties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};