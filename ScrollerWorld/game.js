/**
 * Created by t_tappa on 9/30/2015.
 */
var renderer = PIXI.autoDetectRenderer(512, 384,{backgroundColor : 0x66FF99});
document.body.appendChild(renderer.view);

var stage = new PIXI.Container(0x66FF99);
var farTexture = PIXI.Texture.fromImage("images/bg-far.png");
var midTexture = PIXI.Texture.fromImage("images/bg-mid.png");

var far = TileSpriteHelper().newTiling(farTexture, 512, 256);
var mid = TileSpriteHelper().newTiling(midTexture, 512, 256);

TileSpriteHelper().setPosition(far, 0, 0);
TileSpriteHelper().setTilePosition(far, 0, 0);

TileSpriteHelper().setPosition(mid, 0, 128);
TileSpriteHelper().setTilePosition(mid, 0, 0);

stage.addChild(far);
stage.addChild(mid);

requestAnimationFrame(update);

function update() {
    far.tilePosition.x -= 0.128;
    mid.tilePosition.x -= 0.64;

    renderer.render(stage);

    requestAnimationFrame(update);
}