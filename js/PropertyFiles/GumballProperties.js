/**
 * Created by ajt on 3/12/2016.
 */
function GumballProperties() {
    var props = {
        sprite : {},
        textures : [],
        numberOfSprites : 0,
        numberStartingSprites : 1,
        spriteCount : 0,
        changeSpriteCounter : 0,
        spriteSpeed : 0,
        startingX : MapGlobals.screenWidth*1.5,
        startingY : 500,
        yGumballOffsetWithMap : 90
    };

    return props;
}

GumballProperties.constructor = GumballProperties;