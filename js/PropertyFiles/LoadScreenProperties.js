/**
 * Created by ajt on 4/27/2016.
 */
function LoadScreenProperties() {
    var props = {
        far : new Far(),
        mid : new Mid(),
        mid2 : new Mid2(),
        titleBoard : new TitleBoard(),
        startButton : new StartButton(),
        textScore : new Text("highscore"),
        viewportX : 0
    };

    return props;
}

LoadScreenProperties.constructor = LoadScreenProperties;