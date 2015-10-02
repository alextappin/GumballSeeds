/**
 * Created by t_tappa on 10/1/2015.
 */

function MapClass() {
    var stage = ContainerHelper().newContainer(0x999888),
        farTexture = TextureHelper().newTexture('bg-far.png'),
        midTexture = TextureHelper().newTexture('bg-mid.png'),
        far = TileSpriteHelper().newTiling(farTexture, 512, 256),
        mid = TileSpriteHelper().newTiling(midTexture, 512, 256);
    TileSpriteHelper().setPosition(far, 0, 0);
    TileSpriteHelper().setTilePosition(far, 0, 0);
    TileSpriteHelper().setPosition(mid, 0, 128);
    TileSpriteHelper().setTilePosition(mid, 0, 0);
    stage = ContainerHelper().addChildren(stage, far, mid);
    return {
        stage : stage,
        farTexture : farTexture,
        midTexture : midTexture,
        far : far,
        mid : mid,
        updateFrame : function updateFrame() {
            far.tilePosition.x -= 0.128;
            mid.tilePosition.x -= 0.64;
        }
    }
}