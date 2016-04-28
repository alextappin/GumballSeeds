/**
 * Created by ajt on 4/27/2016.
 */
function LoadScreenProperties() {
    var props = {
        loadImage : new LoadImage(),
        textInstructions : new Text("loadInstructions"),
        textInfo : new Text ("loadInfo")
    };

    return props;
}

LoadScreenProperties.constructor = LoadScreenProperties;