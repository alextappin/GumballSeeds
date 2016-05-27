/**
 * Created by ajt on 4/30/2016.
 */
var PhysicsGlobals = (function PhysicsGlobals() {
    var constants = {};

    constants.attackingTime = 0;
    constants.characterGravity = .51;
    constants.characterJumpVelocity = -16;
    constants.characterJumpHighVelocity = -20;
    constants.characterJumpAttackVelocity = -12;
    constants.characterVelocityY = 5;
    constants.applyFallingGravity = false;
    constants.characterAirborn = true;

    return constants;
})();