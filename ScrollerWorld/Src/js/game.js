/**
 * Created by t_tappa on 9/30/2015.
 */
var renderer = PIXI.autoDetectRenderer(1080, 720,{backgroundColor : 0x66FF99}),
    map = MapClass();
document.body.appendChild(renderer.view);

GameFlow().start();

function updateRender() {
/*    map.loadSpriteSheet("resources/wall.json");*/
    map.updateFrame();
    renderer.render(map.stage);
    requestAnimationFrame(updateRender);
}