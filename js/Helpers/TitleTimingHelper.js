/**
 * Created by ajt on 5/1/2016.
 */
function TitleTimingHelper() {
    var helpers = {};

    helpers.updateTitleObjects = function(bg, words, start, startAnimation) {
        if (MainGlobals.Timing.startButtonFadeIn) {
            bg.update(bg);
            words.update(words);
            start.updateOpacity(start);

        } else if (MainGlobals.Timing.titleWordsFadeIn) {
            bg.update(bg);
            words.update(words);
            if (words.alpha > MainGlobals.Timing.startButtonAlphaCue) {
                MainGlobals.Timing.startButtonFadeIn = true;
            }
        } else {
            bg.update(bg);
            if (bg.alpha > MainGlobals.Timing.titleWordsAlphaCue) {
                MainGlobals.Timing.titleWordsFadeIn = true;
            }
        }

        if (MainGlobals.Timing.startButtonPressed) { //start the startAnimation for button being pressed
            startAnimation.update(startAnimation);
            start.updateClickedStartTextures(start);
            if (startAnimation.position.x >= 0) {
                if (startAnimation.position.x >= startAnimation.width) { //switch to the game screen
                    HelperFunctions().switchScreenToggle();
                    MainGlobals.Map.screenToShow = MainGlobals.Map.gameString;
                    MainGlobals.Timing.startButtonPressed = false;
                    MainGlobals.Timing.startAnimation = false;
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