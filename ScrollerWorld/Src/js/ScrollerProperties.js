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
        enemies : [],
        mapBuilder : {},
        viewportX : 0
    };

    return props;
}

ScrollerProperties.constructor = ScrollerProperties;
