/**
 * Created by ajt on 11/29/2015.
 */
function Main() {
    //going to run a pre-load function here to test the screen sizes and stufffff

    MainGlobals.initialize();
    window.addEventListener("resize", this.refresh);
    MainGlobals.Helpers.setScrollSpeedToMin();
    this.loadSpriteSheet();
    PIXI.GC_MODES.DEFAULT = PIXI.GC_MODES.AUTO; //Optimizes the game by about 2% Total...
}

Main.prototype.refresh = function() {
    window.location.reload(false);
};

Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad3 = [
            "imagesSmall/character.json", "imagesSmall/map.json",
            "imagesSmall/title.json", "imagesSmall/interface.json"
        ],
        assetsToLoadHighRes = [],
        loader = new PIXI.loaders.Loader();
    for (var i = 1; i < 8; i++) {
        assetsToLoadHighRes.push("imagesBeta/img" + i + ".json");
    }
    loader.add(assetsToLoadHighRes).load(this.spriteSheetLoaded.bind(this))
};
Main.prototype.update = function() {
    this.gameStatesHandler();
    MainGlobals.renderer.render(MainGlobals.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.spriteSheetLoaded = function() {
    this.startAppropriateScreen();
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.gameStatesHandler = function() {
    if (MainGlobals.Helpers.doSwitchScreen()) {
        this.purgeStage()
    } else {
        this.updatedSelectedScreen();
    }
};

Main.prototype.purgeStage = function() {
    this.saveAndRestartGameVariables();
    MainGlobals.stage.destroy();
    MainGlobals.stage = new PIXI.Container(0xFFFFFF);
    this.startAppropriateScreen();
    MainGlobals.Helpers.switchScreenToggle();
};

Main.prototype.updatedSelectedScreen = function() {
    if(MainGlobals.Helpers.screenIsGame()) {
        this.scroller.update();
    } else if (MainGlobals.Helpers.screenIsTitle()) {
        this.titleScreen.update();
    } else if(MainGlobals.Helpers.screenIsLoad()) {
        this.loadScreen.update();
    } else if(MainGlobals.Helpers.screenIsBlack()) {
        this.loadScreen.update();
    }
};

Main.prototype.startAppropriateScreen = function() {
    if(MainGlobals.Helpers.screenIsGame()) {
        this.scroller = new Scroller(MainGlobals.stage);
    } else if (MainGlobals.Helpers.screenIsTitle()) {
        this.titleScreen = new TitleScreen(MainGlobals.stage);
        console.log(MainGlobals.stage);
    } else if (MainGlobals.Helpers.screenIsBlack()) {
        this.loadScreen = new BlackScreen(MainGlobals.stage);
    }
    else if(MainGlobals.Helpers.screenIsLoad()) {
        this.loadScreen = new LoadScreen(MainGlobals.stage);
    }
};

Main.prototype.saveAndRestartGameVariables = function() {
    MainGlobals.Helpers.resetGlobals();
};