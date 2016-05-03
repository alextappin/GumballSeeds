/**
 * Created by ajt on 5/2/2016.
 */
function StartAnimationProperties() {
    var props = {
        textures : [],
        whiteSprite : 2,
        coloredSpritesMax : 1,
        spriteCount : 0,
        changeSpriteCounter : 0,
        spriteSpeed : 5,
        numberOfTextures : 1,
        moveSpeed : MapGlobals.screenWidth *.05, //5 percent of screen every frame,
        xPositionConstant : 1.5
    };

    return props;
}

StartAnimationProperties.constructor = StartAnimationProperties;