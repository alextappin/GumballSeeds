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
    this.TitleScreenProps = new TitleScreenProperties();
    //Add to stage the units
    stage.addChild(this.TitleScreenProps.titleBoard);
    stage.addChild(this.TitleScreenProps.startButton);
};

TitleScreen.prototype.update = function() {
    //update the position and stuff IN the start button class/title board class
    this.TitleScreenProps.titleBoard.update(this.TitleScreenProps.titleBoard);
    this.TitleScreenProps.startButton.update(this.TitleScreenProps.startButton);
};

/*TitleScreen.prototype.initiateTitleScreenSprites = function() {
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
};*/
/*

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
};*/
