/**
 * Created by ajt on 3/10/2016.
 */
function ScrollerProperties() {
    var props = {
        bgSky1 : new BgSky1(),
        haze4 : new Haze4(),
        cloud5 : new Clouds5(),
        cloud7 : new Clouds7(),
        gumballMachine8 : new GumballMachine8(),
        hill1a9 : new Hill1a9(),
        hill1b10 : new Hill1b10(),
        haze11 : new Haze11(),
        hill2a12 : new Hill2a12(),
        hill2b13 : new Hill2b13(),
        haze14 : new Haze14(),
        hill3a15 : new Hill3a15(),
        hill3b16 : new Hill3b16(),
        superBg : new SuperBg(),
        scoreBar : new ScoreBar(),
        ground : new GroundHandler(),
        super : new Super(),
        character : new Character(),
        gumballs : new GumballsHandler(),
        powerBar : new PowerBar(),
        lifeBar : new LifeBar(),
        touchJump : new TouchJump(),
        touchAttack : new TouchAttack(),
        enemies : new EnemiesHandler(),
        mapBuilder : {},
        textScore : new Text("score"),
        textLives : new Text("lives"),
        viewportX : 0
    };

    return props;
}

ScrollerProperties.constructor = ScrollerProperties;
