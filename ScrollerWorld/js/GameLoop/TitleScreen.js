/**
 * Created by ajt on 3/10/2016.
 */
function TitleScreen(stage) {
    this.constructTitleScreen(stage);
    this.getStage = function() {
        return stage;
    }
}

TitleScreen.prototype.constructTitleScreen = function(stage) {
    //Add to stage
    this.titleSprites = [];
    this.spriteCount = 0;
    this.changeSpriteCounter = 0;
    this.spriteSpeed = 100;
    this.initiateTitleScreenSprites();
    stage.addChild(this.initiateTitleScreenSprites());
    //Add location props to character/enemies
};

TitleScreen.prototype.update = function() {
    this.updateSprite();
};

TitleScreen.prototype.initiateTitleScreenSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("Title1"),
        sprite2 = PIXI.Sprite.fromFrame("Title2");
    sprite1.interactive = true;
    var spriteTimeout;
    function onButtonDown() {
        // Change the texture to gooseHurt
        GameVariables.toggleScreenChange();
        GameVariables.setScreenGame();

        // Clears the timeout
        clearTimeout(spriteTimeout);
    }
    sprite1
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown);
    //add them to the array
    this.titleSprites.push(sprite1,sprite2);
    return this.titleSprites[this.spriteCount];
};

TitleScreen.prototype.nextSprite = function() {
    this.getStage().removeChild(this.titleSprites[this.spriteCount]);
    if (this.spriteCount == 1) {
        this.spriteCount = 0;
    }
    else {
        this.spriteCount++;
    }
    this.getStage().addChild(this.titleSprites[this.spriteCount]);
};

TitleScreen.prototype.updateSprite = function() {
    if (this.changeSpriteCounter == this.spriteSpeed) {
        this.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.changeSpriteCounter ++;
    }
};