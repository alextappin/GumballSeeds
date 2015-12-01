/**
 * Created by t_tappa on 11/30/2015.
 */
function Character() {
    PIXI.Container.call(this);

    this.characterSprites = [];
    this.spriteCount = 0;
    this.positionX = 32;
    this.positionY = 220;
    this.changeSpriteCounter = 0;
    this.spriteSpeed = 8;
    this.initiateCharacterSprites();
    this.spaceBar = new KeyboardControl(32);
    this.listenForJumpTrigger();
}

Character.constructor = Character;
Character.prototype = Object.create(PIXI.Container.prototype);

Character.prototype.initiateCharacterSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("sprite1"),
        sprite2 = PIXI.Sprite.fromFrame("sprite2"),
        sprite3 = PIXI.Sprite.fromFrame("sprite3"),
        sprite4 = PIXI.Sprite.fromFrame("sprite4"),
        sprite5 = PIXI.Sprite.fromFrame("sprite5"),
        sprite6 = PIXI.Sprite.fromFrame("sprite6");
    //scale each one down...
    sprite1.scale.x = .5;
    sprite1.scale.y = .5;

    sprite2.scale.x = .5;
    sprite2.scale.y = .5;

    sprite3.scale.x = .5;
    sprite3.scale.y = .5;

    sprite4.scale.x = .5;
    sprite4.scale.y = .5;

    sprite5.scale.x = .5;
    sprite5.scale.y = .5;

    sprite6.scale.x = .5;
    sprite6.scale.y = .5;

    //initiate the width/height of the first one...
    sprite1.position.x = this.positionX;
    sprite1.position.y = this.positionY;
    //add them to the array
    this.characterSprites.push(sprite1,sprite2,sprite3, sprite4, sprite5, sprite6);
    this.addChild(this.characterSprites[this.spriteCount]);
};

Character.prototype.nextSprite = function() {
    this.removeChild(this.characterSprites[this.spriteCount]);
    if (this.spriteCount == 5) {
        this.spriteCount = 0;
    }
    else {
        this.spriteCount++;
    }
    this.characterSprites[this.spriteCount].position.x = this.positionX;
    this.characterSprites[this.spriteCount].position.y = this.positionY;
    this.addChild(this.characterSprites[this.spriteCount]);
};

Character.prototype.updateSprite = function() {
    if (this.changeSpriteCounter == this.spriteSpeed) {
        this.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.changeSpriteCounter ++;
    }
};

Character.prototype.listenForJumpTrigger = function() {
    this.spaceBar.press = function () {
        console.log('eeeeee');
        //do whatever you want!
    }
};