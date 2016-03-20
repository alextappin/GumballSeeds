/**
 * Created by ajt on 3/12/2016.
 */
function TextProperties(textType) {
    var props = {
        words : {},
        type : textType,
        setValues : function() {
            if (this.type == "kills") {
                this.text = "Kills  " + GameVariables.getCurrentScore();
                this.positionX = 50;
                this.positionY = 50;
                this.fill = "Green";
            }
            else if(this.type == "highscore") {
                this.text = "HighScore  " + GameVariables.getHighScore();
                this.positionX = (GameVariables.getWidth() - this.words.width) / 2;
                this.positionY = (GameVariables.getHeight() / 2) + GameVariables.getHeight()*.1;
                this.fill = "Yellow";
            }
            else if(this.type == "lives") {
                this.text = "Lives  " + GameVariables.getLives();
                this.positionX = 50;
                this.positionY = 150;
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