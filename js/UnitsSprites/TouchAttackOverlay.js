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
    this.TouchAttackOverlayProperties = new TouchAttackOverlayProperties();
    this.initiateTouchAttackSprites();
};

TouchAttack.prototype.initiateTouchAttackSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("trans");
    //add them to the array
    this.TouchAttackOverlayProperties.sprites.push(sprite1);
    this.addChild(this.TouchAttackOverlayProperties.sprites[this.TouchAttackOverlayProperties.spriteCount]);
};

TouchAttack.prototype.update = function(jumpButtonObj, characterObj) {
    this.handleClickEvents(this.TouchAttackOverlayProperties.sprites[0], characterObj);
    this.updatePosition(jumpButtonObj);
};

TouchAttack.prototype.updatePosition = function(obj) {
    obj.position.x = GameVariables.getWidth()/2;
    obj.position.y = 0;
    obj.width = GameVariables.getWidth()/2;
    obj.height = GameVariables.getHeight();
};

TouchAttack.prototype.handleClickEvents = function(spriteToHandle, characterObj) {
    if (!spriteToHandle.interactive) {
        var spriteTimeout;
        function onButtonDown() {
            if(characterObj){
                characterObj.startAttackAnimation()
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