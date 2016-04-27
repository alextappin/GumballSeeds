/**
 * Created by ajt on 11/29/2015.
 */
function Main() {
    this.renderer = PIXI.autoDetectRenderer(MapGlobals.screenWidth, MapGlobals.screenHeight, {backgroundColor: 0x66FF99});
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container(0x66FF99);
    ScrollerGlobals.currentScrollSpeed = ScrollerGlobals.minScrollSpeed;
    this.loadSpriteSheet();
}
Main.prototype.update = function() {
    this.gameStatesHandler();
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};
Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ["../resources/wall.json", "../resources/bg1.png",
        "../resources/test2.png", "../resources/bg3.png", "../resources/characterSprites.json", "../resources/characterSprites.png",
        "../resources/enemy.json", "../resources/enemy.png","../resources/TitleScreen.json", "../resources/TitleSprites.png",
        "../resources/StartButton.json", "../resources/StartButton.png", "../resources/trans.json", "../resources/trans.png",
        "../resources/powerBar.json", "../resources/powerBar.png", "../resources/fgNew.json", "../resources/fgNew.png",
        "../resources/Gumball.json", "../resources/Gumball.png", "../resources/gumballStem.json", "../resources/gumballStem.png"],
    loader = new PIXI.loaders.Loader();
    loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this))
};
Main.prototype.spriteSheetLoaded = function() {
    this.startAppropriateScreen();
    requestAnimationFrame(this.update.bind(this));
};
Main.prototype.gameStatesHandler = function() {
    MapGlobals.switchScreen ? this.purgeStage() : this.updatedSelectedScreen();
};
Main.prototype.purgeStage = function() {
    this.saveAndRestartGameVariables();
    this.stage.destroy();
    this.stage = new PIXI.Container(0x66FF99);
    this.startAppropriateScreen();
    MapGlobals.switchScreen = !MapGlobals.switchScreen;
};
Main.prototype.updatedSelectedScreen = function() {
    if (MapGlobals.screenToShow == "Title") {
        this.titleScreen.update();
    }
    else if(MapGlobals.screenToShow == "Game") {
        this.scroller.update();
    }
    else if(MapGlobals.screenToShow == "Load") {

    }
};
Main.prototype.startAppropriateScreen = function() {
    if (MapGlobals.screenToShow == "Title") {
        this.titleScreen = new TitleScreen(this.stage);
    }
    else if(MapGlobals.screenToShow == "Game") {
        this.scroller = new Scroller(this.stage);
    }
    else if(MapGlobals.screenToShow == "Load") {
        this.scroller = new LoadScreen(this.stage);
    }
};
Main.prototype.saveAndRestartGameVariables = function() {
    HelperFunctions.resetGlobals();
};