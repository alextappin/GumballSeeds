/**
 * Created by t_tappa on 11/30/2015.
 */
function Character() {
    this.spriteNum = "sprite1";
    var texture = PIXI.Texture.fromFrame(this.spriteNum);
    PIXI.extras.TilingSprite.call(this, texture, 149, 135);
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
    this.scale.x = .5;
    this.scale.y = .5;
    //this.scale = 1.5;
    this.position.x = 32;
    this.position.y = 220;
}

Character.constructor = Character;
Character.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

/*
function Character() {
    var sprite = PIXI.Container.fromFrame("");
    PIXI.Sprite.call(this,sprite);
/!*    this.scale.x = .5;
    this.scale.y = .5;
    //this.scale = 1.5;*!/
    /!*this.position.x = 32;
    this.position.y = 220;*!/
}

Character.construction = Character;
Character.prototype = Object.create(PIXI.Container.prototype);*/
