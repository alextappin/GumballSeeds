/**
 * Created by ajt on 11/29/2015.
 */
function Walls() {
    PIXI.Container.call(this);

    this.pool = new ObjectPool();
    this.createLookupTables();

    this.slices = [];
    this.numOfSlices = 0;
    this.removedSlicesCount = 0;

    this.viewportX = 0;
    this.viewportSliceX = 0;

    this.score = 0;
}

Walls.constructor = Walls;
Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH/WallSlice.WIDTH) + 1;

Walls.prototype.setViewportX = function(viewportX) {
    this.score += .05;
    this.viewportX = this.checkViewportXBounds(viewportX);

    var prevViewportSliceX = this.viewportSliceX;
    this.viewportSliceX = Math.floor(this.viewportX/WallSlice.WIDTH);

    this.removeOldSlices(prevViewportSliceX);
    this.addNewSlices();
};

Walls.prototype.removeOldSlices = function(prevViewportSliceX) {
    var numOldSlices = this.viewportSliceX - prevViewportSliceX;
    if (numOldSlices > Walls.VIEWPORT_NUM_SLICES)
    {
        numOldSlices = Walls.VIEWPORT_NUM_SLICES;
    }

    for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++)
    {
        //it is now offset because we are deleting, need to account for this
        var slice = this.slices[i - this.removedSlicesCount];
        if (slice.sprite != null)
        {
            this.returnWallSprite(slice.type, slice.sprite);
            this.removeChild(slice.sprite);
            slice.sprite = null;

            //need to remove slice and add to the count.
            this.slices = this.slices.slice(1);
            this.removedSlicesCount++;
        }
    }
};

Walls.prototype.addSlice = function(sliceType, y) {
    var slice = new WallSlice(sliceType, y);
    this.numOfSlices++;
    this.slices.push(slice);
};

Walls.prototype.addSliceBorrow = function(sliceType, y) {
    var slice = new WallSlice(sliceType, y);
};

Walls.prototype.checkViewportXBounds = function(viewportX) {
    var maxViewportX = (this.numOfSlices - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;
    if (viewportX < 0)
    {
        viewportX = 0;
    }
    else if (viewportX > maxViewportX)
    {
        viewportX = maxViewportX;
    }

    return viewportX;
};

Walls.prototype.addNewSlices = function() {
    //negative because our wall slices must be shifted to the left (because its scrolling right...)
    var firstX = -(this.viewportX % WallSlice.WIDTH);
    for (var i = this.viewportSliceX, sliceIndex = 0;
         i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES;
         i++, sliceIndex++)
    {
        //it is now offset because it is removing slices. Need to account for this
        var slice = this.slices[i - this.removedSlicesCount];
        if (slice.sprite == null && slice.type != SliceType.GAP)
        {
            slice.sprite = this.borrowWallSprite(slice.type);
            slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
            slice.sprite.position.y = slice.y;

            this.addChild(slice.sprite);

            //TODO MOVE THIS INTO CLASS AND MAKE A TEXT ON SCREEN CLASS
            this.removeChild(this.text);
            this.text = new PIXI.Text(Math.floor(this.score), {font:"25px Arial", fill:"#228869"});
            this.text.position.x = 20;
            this.addChild(this.text);
        }
        else if (slice.sprite != null)
        {
            slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
        }
    }
};

Walls.prototype.createLookupTables = function() {
    this.borrowWallSpriteLookup = [];
    this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
    this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
    this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
    this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
    this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

    this.returnWallSpriteLookup = [];
    this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
    this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
    this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
    this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
    this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
};

Walls.prototype.borrowWallSprite = function(sliceType) {
    return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

Walls.prototype.returnWallSprite = function(sliceType, sliceSprite) {
    return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};

Walls.prototype.slicesAreLow = function() {
    return this.slices.length < 1000;
};