/**
 * Created by t_tappa on 11/30/2015.
 */
function Character() {
    PIXI.Container.call(this);

    this.pool = new ObjectPool();


    this.slices = [];
    this.numOfSlices = 0;
    this.removedSlicesCount = 0;

    this.viewportX = 0;
    this.viewportSliceX = 0;
}

Character.constructor = Character;
Character.prototype = Object.create(PIXI.Container.prototype);