/**
 * Created by t_tappa on 9/30/2015.
 */
var renderer = PIXI.autoDetectRenderer(800, 450,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('images/bunny.png');

// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);
bunny.width = 80;
bunny.height = 80;

// center the sprite's anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = 70;
bunny.position.y = 400;

stage.addChild(bunny);

// start animating
animate();
function animate() {
    if(bunny.position.x < 800)
        requestAnimationFrame(animate);
    else
        requestAnimationFrame(animateReverse);

    // just for fun, let's rotate mr rabbit a little
    bunny.position.x += 2;
    bunny.rotation += .1;

    // render the container
    renderer.render(stage);
}
function animateReverse() {
    if(bunny.position.x < 0)
        requestAnimationFrame(animate);
    else
        requestAnimationFrame(animateReverse);

    // just for fun, let's rotate mr rabbit a little
    bunny.position.x -= 4;
    bunny.rotation -= .2;

    // render the container
    renderer.render(stage);

}