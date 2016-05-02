/**
 * Created by ajt on 3/11/2016.
 */
function TitleScreenProperties() {
    var props = {
        far : new Far(),
        mid : new Mid(),
        mid2 : new Mid2(),
        titleBoard : new TitleBoard(),
        titleWords : new TitleWords(),
        startButton : new StartButton(),
        textScore : new Text("highscore"),
        startAnimation : new StartAnimation(),
        viewportX : 0
    };

    return props;
}

TitleScreenProperties.constructor = TitleScreenProperties;