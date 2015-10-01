/**
 * Created by t_tappa on 10/1/2015.
 */
function TileSpriteHelper() {
    return {
        newTiling: function newTiling(texture, width, height){
            var tiling = new PIXI.extras.TilingSprite(texture, width, height);
            return tiling;
        },
        setPosition: function setPosition(sprite,posX, posY) {
            sprite.position.x = posX;
            sprite.position.y = posY;
            return sprite;
        },
        setTilePosition: function setTilePosition(sprite, posX, posY) {
            sprite.tilePosition.x = posX;
            sprite.tilePosition.y = posY;
            return sprite;
        }
    }
}
