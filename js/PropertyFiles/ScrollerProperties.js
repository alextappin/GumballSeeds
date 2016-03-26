/**
 * Created by ajt on 3/10/2016.
 */
function ScrollerProperties() {
    var props = {
        far : new Far(),
        mid : new Mid(),
        mid2 : new Mid2(),
        front : new Walls(),
        character : new Character(),
        touchJump : new TouchJump(),
        touchAttack : new TouchAttack(),
        enemies : [],
        mapBuilder : {},
        textScore : new Text("kills"),
        textLives : new Text("lives"),
        viewportX : 0
    };

    return props;
}

ScrollerProperties.constructor = ScrollerProperties;