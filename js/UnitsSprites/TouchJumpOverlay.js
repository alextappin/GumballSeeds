/**
 * Created by ajt on 3/12/2016.
 */

function TouchJump() {
    PIXI.Container.call(this);
    this.constructTouchJump();
}

TouchJump.constructor = TouchJump;
TouchJump.prototype = Object.create(PIXI.Container.prototype);

TouchJump.prototype.constructTouchJump = function() {
    this.TouchJumpOverlayProperties = new TouchJumpOverlayProperties();
    this.initiateTouchJumpSprites();
};

TouchJump.prototype.initiateTouchJumpSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("trans");
    //add them to the array
    this.TouchJumpOverlayProperties.sprites.push(sprite1);
    this.addChild(this.TouchJumpOverlayProperties.sprites[this.TouchJumpOverlayProperties.spriteCount]);
};

TouchJump.prototype.update = function(jumpButtonObj, characterObj) {
    this.handleClickEvents(this.TouchJumpOverlayProperties.sprites[0], characterObj);
    this.updatePosition(jumpButtonObj);
};

TouchJump.prototype.updateSprites = function(characterObj) {
    if (this.TouchJumpOverlayProperties.changeSpriteCounter == this.TouchJumpOverlayProperties.spriteSpeed) {
        this.TouchJumpOverlayProperties.changeSpriteCounter = 0;
        this.nextSprite(characterObj);
    }
    else {
        this.TouchJumpOverlayProperties.changeSpriteCounter++;
    }
};

TouchJump.prototype.updatePosition = function(obj) {
    obj.position.x = 0;
    obj.position.y = 0;
    obj.width = GameVariables.getWidth()/2;
    obj.height = GameVariables.getHeight();
};

TouchJump.prototype.handleClickEvents = function(spriteToHandle, characterObj) {
    if (!spriteToHandle.interactive) {
        var spriteTimeout;
        function onButtonDown() {
            if(characterObj){
                characterObj.startJumpAnimation()
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