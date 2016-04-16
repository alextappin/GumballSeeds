/**
 * Created by ajt on 3/10/2016.
 */
function EnemyProperties() {
    var props = {
        sprites : [],
        textures : [],
        spriteProps : [],
        numberOfSprites : 0,
        numberStartingSprites : 1,
        spriteCount : 0,
        continueGame : true,
        startPosX : -500,
        startPosY : 50,
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
        velocityAccelerate : .05,
        pointsForKill : 5
    };

    return props;
}

EnemyProperties.constructor = EnemyProperties;
