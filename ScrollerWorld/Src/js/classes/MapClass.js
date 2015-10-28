/**
 * Created by t_tappa on 10/1/2015.
 */

function MapClass() {
    var stage = ContainerHelper().newContainer(0x999888),
        farTexture = TextureHelper().newTexture('bg-far.png'),
        midTexture = TextureHelper().newTexture('bg-mid.png'),
        closeTexture = TextureHelper().newTexture('wall.png'),
        far = TileSpriteHelper().newTiling(farTexture, 512, 256),
        mid = TileSpriteHelper().newTiling(midTexture, 512, 256),
        near = TileSpriteHelper().newTiling(closeTexture, 512, 256);
    TileSpriteHelper().setPosition(far, 0, 0);
    TileSpriteHelper().setTilePosition(far, 0, 0);
    TileSpriteHelper().setPosition(mid, 0, 128);
    TileSpriteHelper().setTilePosition(mid, 0, 0);
    TileSpriteHelper().setPosition(near, 0, 220);
    TileSpriteHelper().setTilePosition(near, 0, 0);
    stage = ContainerHelper().addChildren(stage, far, mid, near);
    return {
        stage : stage,
        farTexture : farTexture,
        midTexture : midTexture,
        far : far,
        mid : mid,
        updateFrame : function updateFrame() {
            far.tilePosition.x -= 0.128;
            mid.tilePosition.x -= 0.64;
            near.tilePosition.x -= 2.5;
        }/*,
        loadSpriteSheet : function(assetPath) {
            var assetsToLoad = [assetPath];
            loader.add(assetsToLoad);
            loader.once('complete', this.spriteSheetLoaded);
            loader.load();
        },
        spriteSheetLoaded : function() {
            var slice1 = PIXI.Sprite.fromFrame("edge_01");
            slice1.position.x = 32;
            slice1.position.y = 64;
            stage.addChild(slice1);
        }*/

    }
}