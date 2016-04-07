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
    this.TextProperties = new TextProperties(type);
    this.TextProperties.setValues();
    this.initiateTextType();
};
Text.prototype.initiateTextType = function() {
    this.TextProperties.words = new PIXI.Text(this.TextProperties.text);
    this.addChild(this.TextProperties.words);
};
Text.prototype.update = function() {
    this.deleteAndReAddText();
};
Text.prototype.deleteAndReAddText = function() {
    this.TextProperties.setValues();
    this.removeChild(this.TextProperties.words);
    this.TextProperties.words = new PIXI.Text(this.TextProperties.text, this.TextProperties.getStyleProperties());
    this.TextProperties.words.position.x = this.TextProperties.positionX;
    this.TextProperties.words.position.y = this.TextProperties.positionY;
    this.addChild(this.TextProperties.words);

};