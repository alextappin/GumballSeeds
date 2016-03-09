/**
 * Created by ajt on 11/29/2015.
 */
function MapBuilder(walls) {
    this.walls = walls;
    this.createMap();
}

MapBuilder.WALL_HEIGHTS = [
    656, // Lowest slice
    624,
    592,
    560,
    528  // Highest slice
];

MapBuilder.prototype.createMap = function() {
    /*this.createWallSpan(0, 10, true);*/
    this.createWallSpan(3, 1000, true);
    this.createGap(2);
    this.createWallSpan(1, 10, true);
    this.createGap(2);
    this.createWallSpan(2, 10, true);
    this.createGap(2);
/*    this.createSteppedWallSpan(2, 5, 28);
    this.createGap(4);*/
    /*this.createWallSpan(1, 30);
    this.createGap(1);
    this.createWallSpan(2, 18);
    this.createGap(1);*/
/*    this.createSteppedWallSpan(2, 5, 28);
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
    this.createGap(20);*/
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

MapBuilder.prototype.addAndBuildRandomSequence = function() {
    var rand = Math.floor((Math.random() * 10) + 5),
        randForMapGen = Math.floor((Math.random() * 5));
    this.sequenceOne(rand, randForMapGen);
};

MapBuilder.prototype.sequenceOne = function(rand, rangeRand) {
    if (rand >= 4) {
        this.createWallSpan(rangeRand, (rand * 2) + 3);
        this.createGap(2);
        this.createWallSpan(rangeRand, (rand + rand) + 3);
        this.createGap(1);
    }
    else if (rand > 2) {
        this.createSteppedWallSpan(rangeRand,(rand * rand) + 2, (rand * 2) + 2);
        this.createGap(1);
        this.createWallSpan(rangeRand, (rand + rand) + 3);
        this.createGap(1);
    }

    else if (rand >= 0) {
        this.createWallSpan(rangeRand, (rand + rand) + 3);
        this.createGap(1);
        this.createSteppedWallSpan(rangeRand,(rand * rand) + 2, (rand * 2) + 2);
        this.createGap(1);
    }
};