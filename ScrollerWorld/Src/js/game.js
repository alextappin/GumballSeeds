/**
 * Created by t_tappa on 9/30/2015.
 */
var renderer = PIXI.autoDetectRenderer(512, 384,{backgroundColor : 0x66FF99}),
    map = MapClass();
document.body.appendChild(renderer.view);

requestAnimationFrame(update);

function update() {
    map.far.tilePosition.x -= 0.128;
    map.mid.tilePosition.x -= 0.64;

    renderer.render(map.stage);

    requestAnimationFrame(update);
}