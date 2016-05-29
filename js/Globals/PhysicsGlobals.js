/**
 * Created by ajt on 4/30/2016.
 */
var PhysicsGlobals = (function PhysicsGlobals() {
    var constants = {};

    constants.attackingTime = 0;
    constants.characterGravity = MapGlobals.screenWidth/2509; // .51;
    constants.characterJumpVelocity = MapGlobals.screenWidth/-80;//-16;
    constants.characterJumpHighVelocity = MapGlobals.screenWidth/-64; //-20;
    constants.characterJumpAttackVelocity = MapGlobals.screenWidth/-91.4; //-14;
    constants.characterVelocityY = MapGlobals.screenWidth/256; //5;
    constants.applyFallingGravity = false;
    constants.characterAirborn = true;
    constants.characterHighJumping = false;

    constants.characterRiseSpeed = MapGlobals.screenWidth * .012;
    constants.characterBoltSpeed = MapGlobals.screenWidth * .04;
    constants.characterEndSuperVelocity = MapGlobals.screenWidth/-51.2; //-25;

    return constants;
})();