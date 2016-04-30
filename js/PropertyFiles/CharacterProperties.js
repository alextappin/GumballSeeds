/**
 * Created by ajt on 3/10/2016.
 */
function CharacterProperties() {
    var props = {
        sprites : {},
        textures : [],
        spriteCount : 0,
        airborn : true,
        applyFallingGravity : false,
        isMovingLeft : false,
        isMovingRight : false,
        isAttacking : false,
        continueGame : true,
        changeSpriteCounter : 0,
        spriteSpeed : 8,
        powerUpPositionVelocity : -1,
        spaceBar : new KeyboardControl(32),
        ctrlButton : new KeyboardControl(17),
        leftArrow : new KeyboardControl(37),
        rightArrow : new KeyboardControl(39)
    };

    return props;
}

CharacterProperties.constructor = CharacterProperties;