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
    this.Properties = new TouchJumpOverlayProperties();
    this.initiateTouchJumpSprites();
};

TouchJump.prototype.initiateTouchJumpSprites = function() {
    var sprite1 = PIXI.Sprite.fromFrame("trans");
    //add them to the array
    this.Properties.sprites.push(sprite1);
    this.addChild(this.Properties.sprites[this.Properties.spriteCount]);
};

TouchJump.prototype.update = function(jumpButtonObj, characterObj) {
    this.handleClickEvents(this.Properties.sprites[0], characterObj);
    this.updatePosition(jumpButtonObj);
};

TouchJump.prototype.updateSprites = function(characterObj) {
    if (this.Properties.changeSpriteCounter == this.Properties.spriteSpeed) {
        this.Properties.changeSpriteCounter = 0;
        this.nextSprite(characterObj);
    }
    else {
        this.Properties.changeSpriteCounter++;
    }
};

TouchJump.prototype.updatePosition = function(obj) {
    obj.position.x = 0;
    obj.position.y = 0;
    obj.width = MapGlobals.screenWidth/2;
    obj.height = MapGlobals.screenHeight;
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