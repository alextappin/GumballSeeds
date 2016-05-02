/**
 * Created by ajt on 5/1/2016.
 */
function TitleTimingHelper() {
    var helpers = {};

    helpers.updateTitleObjects = function(bg, words, start) {
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

        if (TimingGlobals.startButtonPressed) {
            //start the startAnimation
        }
    };

    return helpers;
}