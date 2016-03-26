/**
 * Created by ajt on 3/10/2016.
 */
function EnemyProperties() {
    var props = {
        characterSprites : [],
        spriteCount : 0,
        continueGame : true,
        positionX : 1200,
        positionY : 800,
        scaleX :.5,
        scaleY :.5,
        velocityX : 7,
        velocityY : 2,
        changeVelocityX : 0,
        changeVelocityY : 0,
        slowOrSpeedTrigger : false,
        changeSpriteCounter : 0,
        spriteSpeed : 12,
        velocityDecelerate : -.1,
        velocityAccelerate : .05
    };

    return props;
}

EnemyProperties.constructor = EnemyProperties;