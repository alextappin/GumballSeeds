/**
 * Created by ajt on 5/1/2016.
 */
function TitleTimingHelper() {
    var helpers = {};

    helpers.startBgFadeIn = function() {

    };

    helpers.startTitleFadeIn = function() {

    };

    helpers.startStartFadeIn = function() {

    };

    helpers.continueBgOpacity = function(bg) {
        if (bg.alpha >= 1) {
            bg.update(bg);
        } else {
            bg.updateOpacity(bg);
        }
    };

    helpers.updateTitleObjects = function(bg, start) {
        if (!TimingGlobals.titleBackgoundFadeIn) {
            TimingGlobals.titleBackgoundFadeIn = true;
            bg.updateOpacity(bg);
        } else if (!TimingGlobals.startButtonFadeIn && bg.alpha > TimingGlobals.startButtonAlphaCue) {
            TimingGlobals.startButtonFadeIn = true;
            start.updateOpacity(start);
            helpers.continueBgOpacity(bg);
        } else {
            start.update(start);
            helpers.continueBgOpacity(bg);
        }
    };

    return helpers;
}