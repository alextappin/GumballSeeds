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
    GameVariables.setCurrentScrollSpeed(GameVariables.getMinScrollSpeed());
    this.scroller.moveViewportXBy(GameVariables.getCurrentScrollSpeed());
    GameVariables.setCurrentScrollSpeed(GameVariables.getCurrentScrollSpeed() + GameVariables.getScrollAcceleration());
    if (GameVariables.getCurrentScrollSpeed() > GameVariables.getMaxScrollSpeed())
    {
        GameVariables.setCurrentScrollSpeed(GameVariables.getMaxScrollSpeed());
    }
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


/**
 * Created by ajt on 11/29/2015.
 */
/*
 function Main() {
 this.renderer = PIXI.autoDetectRenderer(GameVariables().getWidth(), GameVariables().getHeight(), {backgroundColor: 0x66FF99});
 document.body.appendChild(this.renderer.view);
 this.stage = new PIXI.Container(0x66FF99);
 GameVariables().setCurrentScrollSpeed(GameVariables().getMinScrollSpeed());
 this.loadSpriteSheet();
 }

 Main.MIN_SCROLL_SPEED = 5.5;
 Main.MAX_SCROLL_SPEED = 7;

 Main.prototype.update = function() {
 this.scroller.moveViewportXBy(GameVariables().getCurrentScrollSpeed());
 GameVariables().setCurrentScrollSpeed(GameVariables().getCurrentScrollSpeed() + GameVariables().getScrollAcceleration());
 if (GameVariables().getCurrentScrollSpeed() > GameVariables().getMaxScrollSpeed())
 {
 GameVariables().setCurrentScrollSpeed(GameVariables().getMaxScrollSpeed());
 }
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
 };*/