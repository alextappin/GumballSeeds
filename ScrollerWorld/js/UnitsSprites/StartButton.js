/**
 * Created by ajt on 3/11/2016.
 */
function StartButton() {
    PIXI.Container.call(this);
    this.constructStartButton();
}

StartButton.constructor = StartButton;
StartButton.prototype = Object.create(PIXI.Container.prototype);

StartButton.prototype.constructStartButton = function() {
    this.StartButtonProperties = new StartButtonProperties();
    this.initiateStartButtonSprites();
};

StartButton.prototype.initiateStartButtonSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("Start1"),
        sprite2 = PIXI.Sprite.fromFrame("Start2");
    //add them to the array
    this.StartButtonProperties.sprites.push(sprite1,sprite2);
    this.addChild(this.StartButtonProperties.sprites[this.StartButtonProperties.spriteCount]);
};

StartButton.prototype.update = function(startButtonObj) {
    this.updateSprites();
    this.updatePosition(startButtonObj);
};

StartButton.prototype.updateSprites = function() {
    if (this.StartButtonProperties.changeSpriteCounter == this.StartButtonProperties.spriteSpeed) {
        this.StartButtonProperties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.StartButtonProperties.changeSpriteCounter++;
    }
};

StartButton.prototype.nextSprite = function() {
    this.removeChild(this.StartButtonProperties.sprites[this.StartButtonProperties.spriteCount]);
    if (this.StartButtonProperties.spriteCount == 1) {
        this.StartButtonProperties.spriteCount = 0;
    }
    else {
        this.StartButtonProperties.spriteCount++;
    }
    this.addChild(this.StartButtonProperties.sprites[this.StartButtonProperties.spriteCount]);
};

StartButton.prototype.updatePosition = function(obj) {
    this.StartButtonProperties.locationX += 1;
    obj.position.x = this.StartButtonProperties.locationX;
    obj.position.y = this.StartButtonProperties.locationY;
};