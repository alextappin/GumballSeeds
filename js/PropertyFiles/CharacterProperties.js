/**
 * Created by ajt on 3/10/2016.
 */
function CharacterProperties() {
    var props = {
        characterSprites : [],
        spriteCount : 0,
        jumping : true,
        startPosY : -100,
        startPosX : 65,
        scaleX: .5,
        scaleY: .5,
        applyFallingGravity : false,
        isMovingLeft : false,
        isMovingRight : false,
        isAttacking : false,
        attackingTime : 0,
        lives : 30,
        enemiesKilled : 0,
        continueGame : true,
        velocityY : 0,
        gravity : .5,
        velocityX : 3,
        changeSpriteCounter : 0,
        spriteSpeed : 8,
        spaceBar : new KeyboardControl(32),
        ctrlButton : new KeyboardControl(17),
        leftArrow : new KeyboardControl(37),
        rightArrow : new KeyboardControl(39)
    };

    return props;
}

CharacterProperties.constructor = CharacterProperties;