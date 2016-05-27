/**
 * Created by ajt on 3/12/2016.
 */

function TouchAttack() {
    PIXI.Container.call(this);
    this.constructTouchAttack();
}

TouchAttack.constructor = TouchAttack;
TouchAttack.prototype = Object.create(PIXI.Container.prototype);

TouchAttack.prototype.constructTouchAttack = function() {
    this.Properties = new TouchAttackOverlayProperties();
    this.initiateTouchAttackSprites();
};

TouchAttack.prototype.initiateTouchAttackSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("trans");
    //add them to the array
    this.Properties.sprites.push(sprite1);
    this.addChild(this.Properties.sprites[this.Properties.spriteCount]);
};

TouchAttack.prototype.update = function(jumpButtonObj, characterObj) {
    this.handleClickEvents(this.Properties.sprites[0], characterObj);
    this.updatePosition(jumpButtonObj);
};

TouchAttack.prototype.updatePosition = function(obj) {
    obj.position.x = MapGlobals.screenWidth/2;
    obj.position.y = 0;
    obj.width = MapGlobals.screenWidth/2;
    obj.height = MapGlobals.screenHeight;
};

TouchAttack.prototype.handleClickEvents = function(spriteToHandle, characterObj) {
    if (!spriteToHandle.interactive) {
        var spriteTimeout;
        function onButtonDown() {
            if(characterObj){
                if (BalanceGlobals.isAttacking == false) {
                    characterObj.startAttackAnimation();
                } else {
                    characterObj.startJumpAttackAnimation();
                }
            }

            clearTimeout(spriteTimeout);
        }
        spriteToHandle.interactive = true;
        spriteToHandle.interactive = true;
        spriteToHandle
            .on('mousedown', onButtonDown)
            .on('touchstart', onButtonDown);
    }
};