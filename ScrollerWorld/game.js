/**
 * Created by t_tappa on 9/30/2015.
 */
var renderer = PIXI.autoDetectRenderer(512, 384,{backgroundColor : 0x66FF99});
document.body.appendChild(renderer.view);

var stage = new PIXI.Container(0x66FF99);
var farTexture = PIXI.Texture.fromImage("images/bg-far.png");
var midTexture = PIXI.Texture.fromImage("images/bg-mid.png");

var far = new PIXI.TilingSprite(farTexture, 512, 256);
var mid = new PIXI.TilingSprite(midTexture, 512, 256);

far.position.x=0;
far.position.y=0;
far.tilePosition.x = 0;
far.tilePosition.y = 0;

mid.position.x=0;
mid.position.y=128;
mid.tilePosition.x = 0;
mid.tilePosition.y = 0;

stage.addChild(far);
stage.addChild(mid);

requestAnimationFrame(update);

function update() {
    far.tilePosition.x -= 0.128;
    mid.tilePosition.x -= 0.64;

    renderer.render(stage);

    requestAnimationFrame(update);
}