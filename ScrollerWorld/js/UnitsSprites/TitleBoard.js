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

TitleBoard.prototype.initiateTitleBoardSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("Title1"),
        sprite2 = PIXI.Sprite.fromFrame("Title2");
    //add them to the array
    this.TitleBoardProperties.boardSprites.push(sprite1,sprite2);
    this.addChild(this.TitleBoardProperties.boardSprites[this.TitleBoardProperties.spriteCount]);
};

TitleBoard.prototype.nextSprite = function() {
    this.removeChild(this.TitleBoardProperties.boardSprites[this.TitleBoardProperties.spriteCount]);
    if (this.TitleBoardProperties.spriteCount == 1) {
        this.TitleBoardProperties.spriteCount = 0;
    }
    else {
        this.TitleBoardProperties.spriteCount++;
    }
    this.addChild(this.TitleBoardProperties.boardSprites[this.TitleBoardProperties.spriteCount]);
};

TitleBoard.prototype.updateSprite = function() {
    if (this.TitleBoardProperties.changeSpriteCounter == this.TitleBoardProperties.spriteSpeed) {
        this.TitleBoardProperties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.TitleBoardProperties.changeSpriteCounter++;
    }
};