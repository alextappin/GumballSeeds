/**
 * Created by ajt on 3/26/2016.
 */
function GameSounds() {
    var soundsProps = {
        titleSound : {
            id : "Title",
            url : "resources/GumballSeedsTheme2.mp3"
        },
        gameSound : {
            id : "Game",
            url : "resources/GameplaySong.mp3"
        },
        bassSound : {
            id: "Bass",
            url: "resources/Bass bomb sound effect.mp3"
        },
        jumpSound : {
          id : "GumballJump",
            url : "resources/GumballSounds/GBS gumball seed JUMP.m4a"
        },
        EnemyDieSound : {
            id : "EnemyDie",
            url : "resources/GumballSounds/Gumball Seeds Bad Guy DYING SOUND.mp3"
        },
        EnemyExplodeSound : {
            id : "ExplodeEnemy",
            url : "resources/GumballSounds/"
        },
        PowerAddSound : {
            id : "AddPower",
            url : "resources/GumballSounds/Gumball Seeds LIFE STATUS ADD.mp3"
        },
        BassEnergySound : {
            id : "BassEnergy",
            url : "resources/GumballSounds/Gumball Seeds low bass energy blast.mp3"
        },
        SuperChargeSound : {
            id : "SuperCharge",
            url : "resources/GumballSounds/Gumball Seeds Super PowerUp.mp3"
        },
        EnemyTakeThatSound : {
            id : "TakeThat",
            url : "resources/GumballSounds/Gumball Seeds TAKE THAT.mp3"
        },
        RainbowRocketSound : {
            id : "RainbowRocket",
            url : "resources/GumballSounds/GumballSeeds Rainbow band Rocket.mp3"
        }
    },
        numSoundsToLoad = 11,
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
            MainGlobals.Map.soundLoaded = true;
        }
    }
}