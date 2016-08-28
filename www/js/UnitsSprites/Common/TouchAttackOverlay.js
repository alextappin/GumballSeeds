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
    obj.position.x = MainGlobals.ScreenWidth/2;
    obj.position.y = 0;
    obj.width = MainGlobals.ScreenWidth/2;
    obj.height = MainGlobals.ScreenHeight;
};

TouchAttack.prototype.handleClickEvents = function(spriteToHandle, characterObj) {
    if (!spriteToHandle.interactive) {
        var spriteTimeout;
        function onButtonDown() {
            if(characterObj){
                if (MainGlobals.Balance.isAttacking == false) {
                    characterObj.startAttackAnimation();
                } else if (MainGlobals.Balance.isComboAttacking == false) {
                    characterObj.startComboAttackAnimation();
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