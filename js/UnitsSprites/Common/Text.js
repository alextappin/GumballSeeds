/**
 * Created by ajt on 3/12/2016.
 */
function Text(type) {
    PIXI.Container.call(this);
    this.constructText(type);
}
Text.constructor = Text;
Text.prototype = Object.create(PIXI.Container.prototype);
Text.prototype.constructText = function(type) {
    this.Properties = new TextProperties(type);
    this.Properties.setValues();
    this.initiateTextType();
};
Text.prototype.initiateTextType = function() {
    this.Properties.words = new PIXI.Text(this.Properties.text, this.Properties.getStyleProperties);
    this.addChild(this.Properties.words);
};
Text.prototype.update = function() {
    this.updateText();
};
Text.prototype.updateText = function() {
    this.Properties.setValues();
    this.Properties.words.text = this.Properties.text;
    this.Properties.words.style = this.Properties.getStyleProperties();
    this.Properties.words.position.x = this.Properties.positionX;
    this.Properties.words.position.y = this.Properties.positionY;
};