/**
 * Created by ajt on 4/25/2016.
 */
function HelperFunction() {
    var functions = {};

    functions.getRandomNumber = function(startRange, endRange) {
        //Will return a random number from startRange to endRange
        return Math.floor((Math.random() * endRange) + startRange);
    };
    functions.getNewPoint = function(x, y) {
        return {x : x, y : y};
    };

    return functions;
}