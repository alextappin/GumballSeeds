/**
 * Created by ajt on 4/9/2016.
 */
function PowerBar() {
    PIXI.Container.call(this);
    this.constructPowerBar();
}

PowerBar.constructor = PowerBar;
PowerBar.prototype = Object.create(PIXI.Container.prototype);

PowerBar.prototype.constructPowerBar = function() {
    this.Properties = new PowerBarProperties();
    this.initiatePowerBarSprites();
};
PowerBar.prototype.setPositionAndScale = function(obj) {
    obj.scale = HelperFunctions().getNewPoint(.4,.4);
    obj.position =  HelperFunctions().getNewPoint((MapGlobals.screenWidth - obj.width) /2, 0);
};
PowerBar.prototype.initiatePowerBarSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("life1"),
        PIXI.Texture.fromFrame("life2"),
        PIXI.Texture.fromFrame("life3"),
        PIXI.Texture.fromFrame("life4"),
        PIXI.Texture.fromFrame("life5"),
        PIXI.Texture.fromFrame("life6"),
        PIXI.Texture.fromFrame("life7")
    );
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
PowerBar.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
PowerBar.prototype.update = function(obj) {
    this.checkForUpdate();
};
PowerBar.prototype.updatePowerUp = function(obj) {
    this.checkForUpdate();
};
PowerBar.prototype.checkForUpdate = function() {
    if (PowerUpGlobals.powerBarLevel != this.Properties.spriteCount) {
        this.Properties.spriteCount = PowerUpGlobals.powerBarLevel;
        this.setSpriteToCurrentTexture();
    }
};
PowerBar.prototype.addBar = function() {
    if (this.Properties.spriteCount !== this.Properties.textures.length) {
        this.Properties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};
PowerBar.prototype.removeBar = function() {
    if (this.Properties.spriteCount !== 0) {
        this.Properties.spriteCount--;
    }
    this.setSpriteToCurrentTexture();
};