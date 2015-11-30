/**
 * Created by ajt on 11/29/2015.
 */
function MapBuilder(walls) {
    this.walls = walls;
    this.createMap();
}

MapBuilder.WALL_HEIGHTS = [
    256, // Lowest slice
    224,
    192,
    160,
    128  // Highest slice
];

MapBuilder.prototype.createMap = function() {
    this.createWallSpan(3, 15, true);
    this.createGap(1);
    this.createWallSpan(1, 30);
    this.createGap(1);
    this.createWallSpan(2, 18);
    this.createGap(1);
    this.createSteppedWallSpan(2, 5, 28);
    this.createGap(1);
    this.createWallSpan(1, 10);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1);
    this.createWallSpan(2, 7);
    this.createGap(1);
    this.createWallSpan(1, 16);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 22);
    this.createGap(2);
    this.createWallSpan(2, 14);
    this.createGap(2);
    this.createWallSpan(3, 8);
    this.createGap(2);
    this.createSteppedWallSpan(3, 5, 12);
    this.createGap(3);
    this.createWallSpan(0, 8);
    this.createGap(3);
    this.createWallSpan(1, 50);
    this.createGap(20);
};

MapBuilder.prototype.createGap = function(spanLength) {
    for (var i = 0; i < spanLength; i++)
    {
        this.walls.addSlice(SliceType.GAP);
    }
};

MapBuilder.prototype.createWallSpan = function(heightIndex, spanLength, noFront, noBack) {
    noFront = noFront || false;
    noBack = noBack || false;

    if (noFront == false && spanLength > 0)
    {
        this.addWallFront(heightIndex);
        spanLength--;
    }

    var midSpanLength = spanLength - (noBack ? 0 : 1);
    if (midSpanLength > 0)
    {
        this.addWallMid(heightIndex, midSpanLength);
        spanLength -= midSpanLength;
    }

    if (noBack == false && spanLength > 0)
    {
        this.addWallBack(heightIndex);
    }
};

MapBuilder.prototype.createSteppedWallSpan = function(heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2)
    {
        heightIndex = 2;
    }

    this.createWallSpan(heightIndex, spanALength, false, true);
    this.addWallStep(heightIndex - 2);
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
};

MapBuilder.prototype.addWallFront = function(heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.FRONT, y);
};

MapBuilder.prototype.addWallBack = function(heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.BACK, y);
};

MapBuilder.prototype.addWallMid = function(heightIndex, spanLength) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    for (var i = 0; i < spanLength; i++)
    {
        if (i % 2 == 0)
        {
            this.walls.addSlice(SliceType.WINDOW, y);
        }
        else
        {
            this.walls.addSlice(SliceType.DECORATION, y);
        }
    }
};

MapBuilder.prototype.addWallStep = function(heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.STEP, y);
};

MapBuilder.prototype.buildRandomSequence = function() {
    //console.log(this.walls.slices.length);
    /*if (this.walls.slices.length < 1000) {*/
        //console.log("WE IN ", this.walls.slices);
    /*console.log(this.walls.viewportSliceX);
    console.log(this.walls.slices.length);*//*
    this.sequenceOne();*/
/*        var rand = Math.floor((Math.random() * 4));
        switch (rand) {
            case 0:
                this.sequenceOne();
                break;
            case 1:
                this.sequenceTwo();
                break;
            case 2:
                this.sequenceThree();
                break;
            case 3:
                this.sequenceThree();
                break;
            default:
                break;*/
        //}
    //}
};

MapBuilder.prototype.sequenceOne = function() {
    this.createWallSpan(1, 20);
    this.createGap(1);
};


MapBuilder.prototype.sequenceTwo = function() {
    this.createWallSpan(1, 20);
    this.createGap(1);
};


MapBuilder.prototype.sequenceThree = function() {
    this.createSteppedWallSpan(2, 5, 28);
    this.createGap(2);
};


MapBuilder.prototype.sequenceFour = function() {
    this.createSteppedWallSpan(2, 5, 20);
    this.createGap(3);
};