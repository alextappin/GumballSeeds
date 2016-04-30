/**
 * Created by ajt on 4/10/2016.
 */
function GroundProperties() {
    var props = {
        sprites : [],
        textures : [],
        //4 sprites for the ground. The textures of each will be changing
        numberOfSprites : 0,
        numberStartingSprites : 4,
        spriteCount : 0,
        changeSpriteCounter : 0,
        spriteWidth : -800,
        positionY : 550,
        yPositionMin : 530,
        yPositionMax : 630,
        smallGapConst : 100,
        largeGapConst : 250
    };

    return props;
}

GroundProperties.constructor = GroundProperties;