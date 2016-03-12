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
    this.initiateCharacterSprites();
};

TitleBoard.prototype.initiateCharacterSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("BadGuy2Tran"),
        sprite2 = PIXI.Sprite.fromFrame("BadGuy1Tran");
    //add them to the array
    this.TitleBoardProperties.characterSprites.push(sprite1,sprite2);
    this.addChild(this.TitleBoardProperties.characterSprites[this.TitleBoardProperties.spriteCount]);
};

TitleBoard.prototype.nextSprite = function() {
    this.removeChild(this.TitleBoardProperties.characterSprites[this.TitleBoardProperties.spriteCount]);
    if (this.TitleBoardProperties.spriteCount == 1) {
        this.TitleBoardProperties.spriteCount = 0;
    }
    else {
        this.TitleBoardProperties.spriteCount++;
    }
    this.addChild(this.TitleBoardProperties.characterSprites[this.TitleBoardProperties.spriteCount]);
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

TitleBoard.prototype.updateVelocity = function() {
    this.TitleBoardProperties.velocityX = GameVariables.getRandomNumber(4,10);
    this.TitleBoardProperties.velocityY =  GameVariables.getRandomNumber(1,3);
    this.speedOrSlow();
};

TitleBoard.prototype.getUpdatedPositionVariables = function(posX, posY) {
    if (posX < GameVariables.getScreenOffsetX() || posY > GameVariables.getHeight() + GameVariables.getScreenOffsetY()) {
        this.updateVelocity();
        return this.getNewPositions();
    }
    else {
        this.TitleBoardProperties.velocityX += this.TitleBoardProperties.velocityX < 1 ? this.TitleBoardProperties.changeVelocityX : 0;
        this.TitleBoardProperties.velocityY += this.TitleBoardProperties.velocityY > 1 ? this.TitleBoardProperties.changeVelocityY : 0;

        return {
            x : posX - this.TitleBoardProperties.velocityX,
            y : posY + this.TitleBoardProperties.velocityY
        };
    }

};

TitleBoard.prototype.getNewPositions = function() {
    return {
        x : GameVariables.getWidth()+100,
        y :  GameVariables.getRandomNumber(0, 400)
    };
};

TitleBoard.prototype.speedOrSlow = function() {
    this.TitleBoardProperties.changeVelocityX = GameVariables.getRandomNumber(1,2) == 1 ? this.TitleBoardProperties.velocityDecelerate : this.TitleBoardProperties.velocityAccelerate;
    this.TitleBoardProperties.changeVelocityY = GameVariables.getRandomNumber(1,2) == 1 ? this.TitleBoardProperties.velocityDecelerate : this.TitleBoardProperties.velocityAccelerate;
};

TitleBoard.prototype.isIntersecting = function(rectangle1, rectangle2) {
    return !(rectangle2.position.x > (rectangle1.position.x + rectangle1.width) ||
    (rectangle2.position.x + rectangle2.width) < rectangle1.x ||
    rectangle2.position.y > (rectangle1.position.y + rectangle1.height) ||
    (rectangle2.position.y + rectangle2.height) < rectangle1.position.y);

};