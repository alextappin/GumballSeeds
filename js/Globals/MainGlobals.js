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
    constants.ScreenWidth = 1280;
    constants.ScreenHeight = 720;
    //stage and game sizing specific
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
        //setup renderer stage and put it on the html view
        constants.initializeGlobals();
        constants.renderer = PIXI.autoDetectRenderer(constants.ScreenWidth, constants.ScreenHeight/*, rendererOptions*/);
        constants.stage = new PIXI.Container(0xFFFFFF);
        constants.ratio = 0;
        document.body.appendChild(constants.renderer.view);
        constants.resizeStage();
    };

    constants.resizeStage = function() {
        // Determine which screen dimension is most constrained
        constants.ratio = Math.min(
            window.innerWidth/constants.ScreenWidth,
            window.innerHeight/constants.ScreenHeight
        );
        // Scale the view appropriately to fill that dimension
        constants.stage.scale.x = constants.stage.scale.y = constants.ratio;
        // Update the renderer dimensions
        constants.renderer.resize(
            Math.ceil(constants.ScreenWidth * constants.ratio),
            Math.ceil(constants.ScreenHeight * constants.ratio)
        );

        constants.ScreenWidth *= constants.ratio;
        constants.ScreenHeight *= constants.ratio;
/*        HelperFunctions().endGame();
        constants.initializeGlobals();
        HelperFunctions().resetGame();*/
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