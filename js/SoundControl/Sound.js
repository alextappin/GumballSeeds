/**
 * Created by ajt on 3/26/2016.
 */
function GameSounds() {
    var soundsProps = {
        titleSound : {
            id : MapGlobals.titleString,
            url : "../resources/GumballSeedsTheme2.mp3"
        },
        gameSound : {
            id : MapGlobals.gameString,
            url : "../resources/GameplaySong.mp3"
        },
        bassSound : {
            id: "Bass",
            url: "../resources/Bass bomb sound effect.mp3"
        }
    },
        numSoundsToLoad = 3,
        counter = 0;
    createjs.Sound.addEventListener("fileload", handleFileLoad);

    //Register the sounds at the start of the game
    for (var key in soundsProps) {
        if (soundsProps.hasOwnProperty(key)) {
            createjs.Sound.registerSound(soundsProps[key].url, soundsProps[key].id);
            counter++;
        }
    }

    function handleFileLoad() {
        if (counter == numSoundsToLoad) {
            MapGlobals.soundLoaded = true;
        }
    }
}