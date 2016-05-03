/**
 * Created by ajt on 5/1/2016.
 */
function TitleTimingHelper() {
    var helpers = {};

    helpers.updateTitleObjects = function(bg, words, start, startAnimation) {
        if (TimingGlobals.startButtonFadeIn) {
            bg.update(bg);
            words.update(words);
            start.updateOpacity(start);

        } else if (TimingGlobals.titleWordsFadeIn) {
            bg.update(bg);
            words.update(words);
            if (words.alpha > TimingGlobals.startButtonAlphaCue) {
                TimingGlobals.startButtonFadeIn = true;
            }
        } else {
            bg.update(bg);
            if (bg.alpha > TimingGlobals.titleWordsAlphaCue) {
                TimingGlobals.titleWordsFadeIn = true;
            }
        }

        if (TimingGlobals.startButtonPressed) { //start the startAnimation for button being pressed
            startAnimation.update(startAnimation);
            start.updateClickedStartTextures(start);
            if (startAnimation.position.x >= 0) {
                if (startAnimation.position.x >= startAnimation.width) { //switch to the game screen
                    HelperFunctions().switchScreenToggle();
                    MapGlobals.screenToShow = MapGlobals.gameString;
                    TimingGlobals.startButtonPressed = false;
                    TimingGlobals.startAnimation = false;
                }
                bg.switchToWhiteBackground(bg);
                words.hideWords(words);
            }
            else {
                bg.update(bg);
            }
        }
    };

    return helpers;
}