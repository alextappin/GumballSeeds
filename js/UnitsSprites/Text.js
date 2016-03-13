/**
 * Created by ajt on 3/12/2016.
 */

function Text() {
    PIXI.Container.call(this);
    this.constructText();
}

Text.constructor = Text;
Text.prototype = Object.create(PIXI.Container.prototype);

Text.prototype.constructText = function() {
    this.TextProperties = new TextProperties();
    this.initiateTextSprites();
};

Text.prototype.initiateTextSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("trans");
    //add them to the array
    this.TextProperties.sprites.push(sprite1);
    this.addChild(this.TextProperties.sprites[this.TextProperties.spriteCount]);
};

Text.prototype.update = function(jumpButtonObj, characterObj) {
    this.handleClickEvents(this.TextProperties.sprites[0], characterObj);
    this.updatePosition(jumpButtonObj);
};

Text.prototype.updatePosition = function(obj) {
    obj.position.x = this.TextProperties.positionX;
    obj.position.y = this.TextProperties.positionY;
    obj.width = GameVariables.getWidth()/2;
    obj.height = GameVariables.getHeight();
};