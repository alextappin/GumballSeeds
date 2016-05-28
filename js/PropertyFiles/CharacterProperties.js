/**
 * Created by ajt on 3/10/2016.
 * this file will have the sprite filtering and specifics
 */
function CharacterProperties() {
    var props = {
        sprites : {},
        textures : [],
        runTextures : [],
        jumpTextures : [],
        jumpHighTextures : [],
        attackTextures : [],
        jumpAttackTextures : [],
        superStartTextures : [],
        rainbowSuperTextures : [],
        stopJumpAnimation : false,
        spriteCount : 0,
        superSpriteCount : 0,
        jumpSpriteCount : 0,
        changeSpriteCounter : 0,
        superChangeSpriteCounter : 0,
        spriteSpeed : 7,
        superSpriteSpeed : 7,
        currentTextures : [],
        currentSuperTextures : [],
        attackCounter : 0,
        powerUpPositionVelocity : -1,
        spaceBar : new KeyboardControl(32),
        ctrlButton : new KeyboardControl(17),
        leftArrow : new KeyboardControl(37),
        rightArrow : new KeyboardControl(39)
    };

    return props;
}

CharacterProperties.constructor = CharacterProperties;