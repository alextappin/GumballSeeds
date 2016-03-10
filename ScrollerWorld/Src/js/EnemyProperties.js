/**
 * Created by ajt on 3/10/2016.
 */
function EnemyProperties() {
    var props = {
        characterSprites : [],
        spriteCount : 0,
        continueGame : true,
        velocityX : 7,
        velocityY : 2,
        changeVelocityX : 0,
        changeVelocityY : 0,
        slowOrSpeedTrigger : false,
        changeSpriteCounter : 0,
        spriteSpeed : 12
    };

    return props;
}

EnemyProperties.constructor = EnemyProperties;
