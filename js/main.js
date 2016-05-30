/**
 * Created by ajt on 11/29/2015.
 */
function Main() {
    //going to run a pre-load function here to test the screen sizes and stufffff

    MainGlobals.initialize();
    window.addEventListener("resize", this.refresh);
    HelperFunctions().setScrollSpeedToMin();
    this.loadSpriteSheet();
}

Main.prototype.refresh = function() {
    window.location.reload(false);
};

Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ["../resources/characterSprites.json", "../resources/enemy.json", "../resources/fgNew.json",
        "../resources/gumballStem.json", "../resources/loadImage.json", "../resources/powerBar.json",
        "../resources/StartButton.json", "../resources/trans.json",

        "../updatedImages/titleScreen/startButtons.json", "../updatedImages/titleScreen/startrainbowanimations.json","../updatedImages/titleScreen/startrainbowanimationwhite.json",
        "../updatedImages/titleScreen/titleWords.json", "../updatedImages/titleScreen/titleBG.json", "../updatedImages/map/gumballs.json",
        "../updatedImages/map/skyhaze1.json", "../updatedImages/map/clouds.json", "../updatedImages/map/gumballMachine.json",
        "../updatedImages/map/hill1.json", "../updatedImages/map/hill2.json", "../updatedImages/map/hazes.json",
        "../updatedImages/map/hill3.json", "../updatedImages/map/ground17.json", "../updatedImages/character/characterRun.json",
        "../updatedImages/character/characterJump.json", "../updatedImages/character/characterAttack.json",
        "../updatedImages/enemy/enemyFly.json", "../updatedImages/gumballs/gumballs.json",
        "../updatedImages/super/rainbow1.json","../updatedImages/super/rainbow2.json","../updatedImages/super/rainbow3.json",
        "../updatedImages/super/rainbow4.json","../updatedImages/super/rainbow5.json","../updatedImages/super/rainbow6.json",
        "../updatedImages/super/rainbow7.json","../updatedImages/super/rainbow8.json","../updatedImages/super/rainbow9.json",
        "../updatedImages/super/rainbow10.json","../updatedImages/super/rainbow11.json","../updatedImages/super/rainbow12.json",
        "../updatedImages/super/rainbow13.json","../updatedImages/super/rainbow14.json","../updatedImages/super/rainbow15.json",
        "../updatedImages/super/superGumball1.json", "../updatedImages/character/characterSuper1.json", "../updatedImages/character/characterSuper2.json",
        "../updatedImages/super/super1.json", "../updatedImages/super/super2.json", "../updatedImages/super/super3.json",
        "../updatedImages/super/super4.json", "../updatedImages/super/super5.json",
        "../updatedImages/interface/superBar1.json", "../updatedImages/interface/superBar2.json"
    ],
        loader = new PIXI.loaders.Loader();
    loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this))
};
Main.prototype.update = function() {
    this.gameStatesHandler();
    MainGlobals.renderer.render(MainGlobals.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.spriteSheetLoaded = function() {
    this.startAppropriateScreen();
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.gameStatesHandler = function() {
    if (HelperFunctions().doSwitchScreen()) {
        this.purgeStage()
    } else {
        this.updatedSelectedScreen();
    }
};

Main.prototype.purgeStage = function() {
    this.saveAndRestartGameVariables();
    MainGlobals.stage.destroy();
    MainGlobals.stage = new PIXI.Container(0xFFFFFF);
    this.startAppropriateScreen();
    HelperFunctions().switchScreenToggle();
};

Main.prototype.updatedSelectedScreen = function() {
    if(HelperFunctions().screenIsGame()) {
        this.scroller.update();
    } else if (HelperFunctions().screenIsTitle()) {
        this.titleScreen.update();
    } else if(HelperFunctions().screenIsLoad()) {
        this.loadScreen.update();
    }
};

Main.prototype.startAppropriateScreen = function() {
    if(HelperFunctions().screenIsGame()) {
        this.scroller = new Scroller(MainGlobals.stage);
    } else if (HelperFunctions().screenIsTitle()) {
        this.titleScreen = new TitleScreen(MainGlobals.stage);
    } else if(HelperFunctions().screenIsLoad()) {
        this.loadScreen = new LoadScreen(MainGlobals.stage);
    }
};

Main.prototype.saveAndRestartGameVariables = function() {
    HelperFunctions().resetGlobals();
};