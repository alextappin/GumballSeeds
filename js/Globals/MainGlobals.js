/**
 * Created by ajt on 5/29/2016.
 */
var MainGlobals = (function MainGlobals() {
    var constants = {};

    //Globals used throughout the game. /Globals/* directory
    constants.Balance = {};
    constants.Map = {};
    constants.Physics = {};
    constants.PowerUp = {};
    constants.Scaling = {};
    constants.Score = {};
    constants.Scroller = {};
    constants.Timing = {};


    constants.stage = {};
    constants.renderer = {};
    constants.ratio = 0;
    constants.renderOptions = {
        antialiasing: false,
        transparent: true,
        resolution: window.devicePixelRatio,
        autoResize: true,
        backgroundColor : 0x000000
    };

    constants.initializeGlobals = function() {
        constants.Balance = BalanceGlobals();
        constants.Map = MapGlobals();
        constants.Physics = PhysicsGlobals();
        constants.PowerUp = PowerUpGlobals();
        constants.Scaling = ScalingGlobals();
        constants.Score = ScoreGlobals();
        constants.Scroller = ScrollerGlobals();
        constants.Timing = TimingGlobals();
    };

    constants.initialize = function() {
        constants.initializeGlobals();
        //setup renderer stage and put it on the html view
        constants.renderer = PIXI.autoDetectRenderer(constants.Map.screenWidth, constants.Map.screenHeight/*, rendererOptions*/);
        constants.renderer.view.style.position = "absolute";
        constants.renderer.view.style.top = "0px";
        constants.renderer.view.style.left = "0px";
        constants.stage = new PIXI.Container(0xFFFFFF);
        constants.ratio = 0;
        document.body.appendChild(constants.renderer.view);
    };

    constants.resizeStage = function() {
        // Determine which screen dimension is most constrained

        constants.ratio = Math.min(
            window.innerWidth/constants.Map.screenWidth,
            window.innerHeight/constants.Map.screenHeight
        );
        // Scale the view appropriately to fill that dimension
        constants.stage.scale.x = constants.stage.scale.y = constants.ratio;
        // Update the renderer dimensions
        constants.renderer.resize(
            Math.ceil(constants.Map.screenWidth * constants.ratio),
            Math.ceil(constants.Map.screenHeight * constants.ratio)
        );

        constants.Map.screenWidth *= constants.ratio;
        constants.Map.screenHeight *= constants.ratio;
        constants.initializeGlobals();
        constants.Map.screenWidth *= constants.ratio;
        constants.Map.screenHeight *= constants.ratio;
        /*console.log("Resize\n" +
            "  Window inner " + window.innerWidth + "," +
            window.innerHeight +
            " pixel ratio " + window.devicePixelRatio + "\n" +
            "  Renderer " + constants.renderer.width + "," +
            constants.renderer.height + " res " + constants.renderer.resolution + "\n" +
            "  Scale " + constants.stage.scale.x + "," + constants.stage.scale.y + "\n");*/
    };

    return constants;
}());