/**
 * Created by ajt on 11/29/2015.
 */
function Main() {
    this.renderer = PIXI.autoDetectRenderer(GameVariables.getWidth(), GameVariables.getHeight(), {backgroundColor: 0x66FF99});
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container(0x66FF99);
    GameVariables.setCurrentScrollSpeed(GameVariables.getMinScrollSpeed());
    this.loadSpriteSheet();
}

Main.prototype.update = function() {
    this.gameStatesHandler();
    //render the stage to the screen
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ["../resources/wall.json", "../resources/bg1.png",
        "../resources/test2.png", "../resources/bg3.png", "../resources/characterSprites.json", "../resources/characterSprites.png", "../resources/enemy.json", "../resources/enemy.png"];
    loader = new PIXI.loaders.Loader();
    loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this))
};

Main.prototype.spriteSheetLoaded = function() {
    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.gameStatesHandler = function() {
    GameVariables.getSwitchScreen() ? this.purgeStage() : this.updatedSelectedScreen();
};

Main.prototype.scrollerUpdater = function() {
    this.scroller.moveViewportXBy(GameVariables.getCurrentScrollSpeed());
    GameVariables.setCurrentScrollSpeed(GameVariables.getCurrentScrollSpeed() + GameVariables.getScrollAcceleration());
    if (GameVariables.getCurrentScrollSpeed() > GameVariables.getMaxScrollSpeed()) {
        GameVariables.setCurrentScrollSpeed(GameVariables.getMaxScrollSpeed());
    }
};

Main.prototype.titleScreenUpdater = function() {

};

Main.prototype.purgeStage = function() {
    this.stage.destroy();
    this.stage = new PIXI.Container(0x66FF99);
    this.startAppropriateScreen();
    GameVariables.toggleScreenChange();
};

Main.prototype.updatedSelectedScreen = function() {
    if (GameVariables.getScreenToShow() == "Title") {
        this.titleScreenUpdater();
    }
    else if(GameVariables.getScreenToShow() == "Game") {
        this.scrollerUpdater();
    }
};

Main.prototype.startAppropriateScreen = function() {
    if (GameVariables.getScreenToShow() == "Title") {
        this.startTitleScreen();
    }
    else if(GameVariables.getScreenToShow() == "Game") {
        this.startScrollerScreen();
    }
};

Main.prototype.startScrollerScreen = function() {
    this.scroller = new Scroller(this.stage);
};

Main.prototype.startTitleScreen = function() {
    this.titleScreen = new TitleScreen(this.stage);
};
