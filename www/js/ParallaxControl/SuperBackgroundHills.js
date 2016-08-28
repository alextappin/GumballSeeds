/**
 * Created by ajt on 8/27/2016.
 */
/**
 * Created by ajt on 5/3/2016.
 */
function SuperBg() {
    PIXI.Container.call(this);
    this.textures = [
        PIXI.Texture.fromFrame("rainbowband BG1"),
        PIXI.Texture.fromFrame("rainbowband BG2")
    ];
    this.currentTexture = 0;
    this.spriteCounter = 0;
    var sprite = new PIXI.Sprite(this.textures[this.currentTexture]);
    this.addChild(sprite);
}

SuperBg.constructor = SuperBg;
SuperBg.prototype = Object.create(PIXI.Container.prototype);

SuperBg.prototype.setPositionAndScale = function(obj) {
    var scale = MainGlobals.Helpers.getCorrectScaleWidth(obj.width);
    this.scale = MainGlobals.Helpers.getNewPoint(scale ,scale);
    this.position = MainGlobals.Helpers.getNewPoint(0,0);
};
SuperBg.prototype.update = function(obj) {
    obj.visible = false;
};
SuperBg.prototype.updatePowerUp = function(obj, newViewportX) {
    obj.visible = true;
    this.spriteCounter++;
    if (this.spriteCounter > MainGlobals.Timing.superBgTime) {
        this.spriteCounter = 0;
        if (this.currentTexture > 0) {
            this.currentTexture = 0;
        } else {
            this.currentTexture = 1;
        }
        obj.children[0].texture = this.textures[this.currentTexture];
    }
};