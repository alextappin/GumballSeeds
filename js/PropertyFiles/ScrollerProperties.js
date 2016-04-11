/**
 * Created by ajt on 3/10/2016.
 */
function ScrollerProperties() {
    var props = {
        far : new Far(),
        mid : new Mid(),
        mid2 : new Mid2(),
        ground : new Ground(),
        character : new Character(),
        powerBar : new PowerBar(),
        touchJump : new TouchJump(),
        touchAttack : new TouchAttack(),
        enemies : [],
        mapBuilder : {},
        textScore : new Text("score"),
        textLives : new Text("lives"),
        viewportX : 0
    };

    return props;
}

ScrollerProperties.constructor = ScrollerProperties;
