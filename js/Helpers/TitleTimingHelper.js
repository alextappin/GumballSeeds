/**
 * Created by ajt on 5/1/2016.
 */
function TitleTimingHelper() {
    var helpers = {};

    helpers.updateTitleObjects = function(bg, start) {
        if (!TimingGlobals.titleBackgoundFadeIn) {
            TimingGlobals.titleBackgoundFadeIn = true;
            bg.updateOpacity(bg);
        } else if (!TimingGlobals.startButtonFadeIn && bg.alpha > TimingGlobals.startButtonAlphaCue) {
            TimingGlobals.startButtonFadeIn = true;
            start.updateOpacity(start);
            bg.update(bg);
        } else {
            start.update(start);
            bg.update(bg);
        }
    };

    return helpers;
}