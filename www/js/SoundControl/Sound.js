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
        attackSound : {
            id : "GumballAttack1",
            url : "resources/GumballSounds/GBS gumball seed SWORD SWING HAH 1.m4a"
        },
        attackSound2 : {
            id : "GumballAttack2",
            url : "resources/GumballSounds/GBS SWORD SWING sfx.mp3"
        },
        attackSound3 : {
            id : "GumballAttack3",
            url : "resources/GumballSounds/GBS SWORD SWING sfx2.mp3"
        },
        EnemyDieSound : {
            id : "EnemyDie",
            url : "resources/GumballSounds/Gumball Seeds Bad Guy DYING SOUND.mp3"
        },
        EnemyExplodeSound : {
            id : "ExplodeEnemy",
            url : "resources/GumballSounds/Gumball Seeds Explosion.mp3"
        },
        PowerAddSound : {
            id : "AddPower",
            url : "resources/GumballSounds/Gumball Seeds LIFE STATUS ADD.mp3"
        },
        CharacterHitSound : {
            id : "CharacterHit",
            url : "resources/GumballSounds/Gumball Seeds LIFE STATUS SUBTRACT OOF.mp3"
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
        numSoundsToLoad = 12,
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
        if (counter >= numSoundsToLoad) {
            MainGlobals.Map.soundLoaded = true;
        }
    }
}