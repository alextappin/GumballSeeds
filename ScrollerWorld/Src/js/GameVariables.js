/**
 * Created by ajt on 3/9/2016.
 */
function GameVariables() {
    var constants = {
        screenWidth : 1080,
        screenHeight : 720,
        enemies : 2
    };

    return {
        getWidth : function getWidth() {
            return constants.screenWidth;
        },
        getHeight : function getHeight() {
            return constants.screenHeight;
        },
        setEnemies : function setEnemies(value) {
            constants.enemies = value;
        },
        getEnemies : function getEnemies() {
            return constants.enemies;
        }
    };
}