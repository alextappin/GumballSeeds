/**
 * Created by ajt on 5/29/2016.
 */
/*function Resizer() {
    this.ratio = Math.min(window.innerWidth/MapGlobals.screenWidth,
        window.innerHeight/MapGlobals.screenHeight);

    // Scale the view appropriately to fill that dimension
    console.log(this.stage.scale);
    this.stage.scale.x = this.stage.scale.y = this.ratio;
    console.log(this.stage.scale);

    // Update the renderer dimensions
    this.renderer.resize(Math.ceil(MapGlobals.screenWidth * this.ratio),
        Math.ceil(MapGlobals.screenHeight * this.ratio));

    MapGlobals.screenWidth *= this.ratio;
    MapGlobals.screenHeight *= this.ratio;

    console.log("Resize\n" +
        "  Window inner " + window.innerWidth + "," +
        window.innerHeight +
        " pixel ratio " + window.devicePixelRatio + "\n" +
        "  Renderer " + this.renderer.width + "," +
        this.renderer.height + " res " + this.renderer.resolution + "\n" +
        "  Scale " + this.stage.scale.x + "," + this.stage.scale.y + "\n");
}*/

function Resizer() {
    var resizer = {};

    resizer.startResize = function() {
        console.log(this);
        this.ratio = Math.min(window.innerWidth/MapGlobals.screenWidth,
            window.innerHeight/MapGlobals.screenHeight);

        // Scale the view appropriately to fill that dimension
        console.log(this.stage.scale);
        this.stage.scale.x = this.stage.scale.y = this.ratio;
        console.log(this.stage.scale);

        // Update the renderer dimensions
        this.renderer.resize(Math.ceil(MapGlobals.screenWidth * this.ratio),
            Math.ceil(MapGlobals.screenHeight * this.ratio));

        MapGlobals.screenWidth *= this.ratio;
        MapGlobals.screenHeight *= this.ratio;
    };

    resizer.updateRenderer = function() {

    };

    resizer.updateGlobals = function() {
        this.stage.scale.x = this.stage.scale.y = this.ratio;
    };

    resizer.calculateNewRatio = function() {
        this.ratio = Math.min(window.innerWidth/MapGlobals.screenWidth,
            window.innerHeight/MapGlobals.screenHeight);
    };

    resizer.resizerGameFlow = function() {

    };

    return resizer;

}