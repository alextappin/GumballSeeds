/**
 * Created by ajt on 3/11/2016.
 */
function TitleBoardProperties() {
    var props = {
        textures : [],
        spriteCount : 0,
        changeSpriteCounter : 0,
        spriteSpeed : 40,
        numberOfTextures : 1,
        alphaStart : 0.001,
        alphaIncrement :.003
        //move these alpha things in the titleTimingHelper
    };

    return props;
}

TitleBoardProperties.constructor = TitleBoardProperties;