/**
 * Created by t_tappa on 10/1/2015.
 */
function TextureHelper() {
    return {
        newTexture : function newTexture(imagePath) {
            return PIXI.Texture.fromImage(imagePath);
        }
    }
}