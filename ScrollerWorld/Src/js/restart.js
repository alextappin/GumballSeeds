/**
 * Created by ajt on 11/29/2015.
 */
function Main() {
    this.renderer = PIXI.autoDetectRenderer(512, 384, {backgroundColor: 0x66FF99});
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container(0x66FF99);

    this.scroller = new Scroller(this.stage);

    requestAnimationFrame(this.update.bind(this));
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
    this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};