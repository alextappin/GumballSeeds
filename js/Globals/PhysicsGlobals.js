/**
 * Created by ajt on 4/30/2016.
 */
var PhysicsGlobals = (function PhysicsGlobals() {
    var constants = {};

    constants.attackingTime = 0;
    constants.characterGravity = MapGlobals.screenHeight/1411; // .51;
    constants.characterJumpVelocity = MapGlobals.screenHeight/-45;//-16;
    constants.characterJumpHighVelocity = MapGlobals.screenHeight/-36; //-20;
    constants.characterJumpAttackVelocity = MapGlobals.screenHeight/-51.4; //-14;
    constants.characterVelocityY = MapGlobals.screenHeight/144; //5;
    constants.applyFallingGravity = false;
    constants.characterAirborn = true;
    constants.characterHighJumping = false;

    constants.characterRiseSpeed = MapGlobals.screenHeight * .016;//.012; with width
    constants.characterBoltSpeed = MapGlobals.screenHeight * .06;//.04; with width..
    constants.characterEndSuperVelocity = MapGlobals.screenHeight/-28.8; //-25;

    return constants;
})();