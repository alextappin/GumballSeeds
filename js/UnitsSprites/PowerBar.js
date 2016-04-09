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
    obj.position =  GameVariables.getNewPoint((GameVariables.getWidth() - obj.width)/2, obj.height + obj.height * .2);
    //no scale yet...
};
PowerBar.prototype.initiatePowerBarSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("Title1"),
        PIXI.Texture.fromFrame("Title2"),
        PIXI.Texture.fromFrame("Title3"),
        PIXI.Texture.fromFrame("Title4"),
        PIXI.Texture.fromFrame("Title5"),
        PIXI.Texture.fromFrame("Title6"),
        PIXI.Texture.fromFrame("Title7")
    );
    this.Properties.sprite = new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]);
    this.addChild(this.Properties.sprite);
};
PowerBar.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
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