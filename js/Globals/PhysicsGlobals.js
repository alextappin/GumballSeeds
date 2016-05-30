/**
 * Created by ajt on 4/30/2016.
 */
function PhysicsGlobals() {
    var constants = {};

    constants.attackingTime = 0;
    constants.characterGravity = MainGlobals.ScreenHeight/1411; // .51;
    constants.characterJumpVelocity = MainGlobals.ScreenHeight/-45;//-16;
    constants.characterJumpHighVelocity = MainGlobals.ScreenHeight/-36; //-20;
    constants.characterJumpAttackVelocity = MainGlobals.ScreenHeight/-51.4; //-14;
    constants.characterVelocityY = MainGlobals.ScreenHeight/144; //5;
    constants.applyFallingGravity = false;
    constants.characterAirborn = true;
    constants.characterHighJumping = false;

    constants.characterRiseSpeed = MainGlobals.ScreenHeight * .016;//.012; with width
    constants.characterBoltSpeed = MainGlobals.ScreenHeight * .06;//.04; with width..
    constants.characterEndSuperVelocity = MainGlobals.ScreenHeight/-28.8; //-25;

    return constants;
}