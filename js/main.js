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
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};
Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ["../resources/wall.json", "../resources/bg1.png",
        "../resources/test2.png", "../resources/bg3.png", "../resources/characterSprites.json", "../resources/characterSprites.png",
        "../resources/enemy.json", "../resources/enemy.png","../resources/TitleScreen.json", "../resources/TitleSprites.png",
        "../resources/StartButton.json", "../resources/StartButton.png", "../resources/Gumballs.json", "../resources/Gumballs.png",
        "../resources/trans.json", "../resources/trans.png"];
    loader = new PIXI.loaders.Loader();
    loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this))
};
Main.prototype.spriteSheetLoaded = function() {
    this.startAppropriateScreen();
    requestAnimationFrame(this.update.bind(this));
};
Main.prototype.gameStatesHandler = function() {
    GameVariables.getSwitchScreen() ? this.purgeStage() : this.updatedSelectedScreen();
};
Main.prototype.purgeStage = function() {
    this.saveAndRestartGameVariables();
    this.stage.destroy();
    this.stage = new PIXI.Container(0x66FF99);
    this.startAppropriateScreen();
    GameVariables.toggleScreenChange();
};
Main.prototype.updatedSelectedScreen = function() {
    if (GameVariables.getScreenToShow() == "Title") {
        this.titleScreen.update();
    }
    else if(GameVariables.getScreenToShow() == "Game") {
        this.scroller.update();
    }
};
Main.prototype.startAppropriateScreen = function() {
    if (GameVariables.getScreenToShow() == "Title") {
        this.titleScreen = new TitleScreen(this.stage);
    }
    else if(GameVariables.getScreenToShow() == "Game") {
        this.scroller = new Scroller(this.stage);
    }
};
Main.prototype.saveAndRestartGameVariables = function() {
    if (GameVariables.getCurrentScore() > GameVariables.getHighScore()) {
        GameVariables.setHighScore(GameVariables.getCurrentScore());
    }
    GameVariables.setEnemies(2);
    GameVariables.setLives(20);
};