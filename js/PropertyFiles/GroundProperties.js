/**
 * Created by ajt on 4/10/2016.
 */
function GroundProperties() {
    var props = {
        sprites : [],
        textures : [],
        //4 sprites for the ground. The textures of each will be changing
        numberOfSprites : 4,
        spriteCount : 0,
        changeSpriteCounter : 0,
        speed : 10,
        spriteWidth : -800,
        positionY : 550,
        posForCharacter : 550
    };

    return props;
}

GroundProperties.constructor = GroundProperties;