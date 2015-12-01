/**
 * Created by ajt on 11/29/2015.
 */
function Main() {
    this.renderer = PIXI.autoDetectRenderer(512, 384, {backgroundColor: 0x66FF99});
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container(0x66FF99);

    this.scrollSpeed = Main.MIN_SCROLL_SPEED;

    this.loadSpriteSheet();
}

Main.MIN_SCROLL_SPEED = 4;
Main.MAX_SCROLL_SPEED = 5;
Main.SCROLL_ACCELERATION = 0.005;

Main.prototype.update = function() {
    this.scroller.moveViewportXBy(this.scrollSpeed);
    this.scrollSpeed += Main.SCROLL_ACCELERATION;
    if (this.scrollSpeed > Main.MAX_SCROLL_SPEED)
    {
        this.scrollSpeed = Main.MAX_SCROLL_SPEED;
    }
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ["../resources/wall.json", "../resources/bg-mid.png",
        "../resources/bg-far.png", "../resources/characterSprites.json", "../resources/characterSprites.png"];
    loader = new PIXI.loaders.Loader();
    loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this))
};

Main.prototype.spriteSheetLoaded = function() {
    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(this.update.bind(this));
    var slice1 = PIXI.Sprite.fromFrame("sprite1");
    slice1.scale.x = .5;
    slice1.scale.y = .5;
    //slice1.scale = 1.5;
    slice1.position.x = 32;
    slice1.position.y = 220;
    this.stage.addChild(slice1);
};