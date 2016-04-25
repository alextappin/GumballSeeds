/**
 * Created by ajt on 3/12/2016.
 */
function TextProperties(textType) {
    var props = {
        words : {},
        type : textType,
        setValues : function() {
            if (this.type == "score") {
                this.text = "Score  " + ScoreGlobals.score;
                this.positionX = 10;
                this.positionY = 10;
                this.fill = "Green";
            }
            else if(this.type == "highscore") {
                this.text = "HighScore  " + ScoreGlobals.highScore;
                this.positionX = (MapGlobals.screenWidth - this.words.width) / 2;
                this.positionY = (MapGlobals.screenHeight / 2) + MapGlobals.screenHeight*.1;
                this.fill = "Yellow";
            }
            else if(this.type == "lives") {
                this.text = "Lives  " + ScoreGlobals.lives;
                this.positionX = 10;
                this.positionY = 40;
                this.fill = "Yellow";
            }
            else {
                this.text = "DEFAULT";
                this.positionX = 0;
                this.positionY = 0;
                this.fill = "Black";
            }
        },
        getStyleProperties : function() {
            return {
                fill : this.fill
            }

        }
    };

    return props;
}

TextProperties.constructor = TextProperties;