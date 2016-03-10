function ObjectPool() {
    this.createWindows();
    this.createDecorations();
    this.createFrontEdges();
    this.createBackEdges();
    this.createSteps();
}

ObjectPool.prototype.borrowWindow = function() {
    return this.windows.shift();
};

ObjectPool.prototype.returnWindow = function(sprite) {
    this.windows.push(sprite);
};

ObjectPool.prototype.borrowDecoration = function() {
    return this.decorations.shift();
};

ObjectPool.prototype.returnDecoration = function(sprite) {
    this.decorations.push(sprite);
};

ObjectPool.prototype.borrowFrontEdge = function() {
    return this.frontEdges.shift();
};

ObjectPool.prototype.returnFrontEdge = function(sprite) {
    this.frontEdges.push(sprite);
};

ObjectPool.prototype.borrowBackEdge = function() {
    return this.backEdges.shift();
};

ObjectPool.prototype.returnBackEdge = function(sprite) {
    this.backEdges.push(sprite);
};

ObjectPool.prototype.borrowStep = function() {
    return this.steps.shift();
};

ObjectPool.prototype.returnStep = function(sprite) {
    this.steps.push(sprite);
};

ObjectPool.prototype.createWindows = function() {
    this.windows = [];

    this.addWindowSprites(6, "window_01");
    this.addWindowSprites(6, "window_02");

    this.shuffle(this.windows);
};

ObjectPool.prototype.createDecorations = function() {
    this.decorations = [];

    this.addDecorationSprites(6, "decoration_01");
    this.addDecorationSprites(6, "decoration_02");
    this.addDecorationSprites(6, "decoration_03");

    this.shuffle(this.decorations);
};

ObjectPool.prototype.createFrontEdges = function() {
    this.frontEdges = [];

    this.addFrontEdgeSprites(2, "edge_01");
    this.addFrontEdgeSprites(2, "edge_02");

    this.shuffle(this.frontEdges);
};

ObjectPool.prototype.createBackEdges = function() {
    this.backEdges = [];

    this.addBackEdgeSprites(2, "edge_01");
    this.addBackEdgeSprites(2, "edge_02");

    this.shuffle(this.backEdges);
};

ObjectPool.prototype.createSteps = function() {
    this.steps = [];
    this.addStepSprites(2, "step_01");
};

ObjectPool.prototype.addWindowSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++)
    {
        var sprite = PIXI.Sprite.fromFrame(frameId);
        this.windows.push(sprite);
    }
};

ObjectPool.prototype.addDecorationSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++)
    {
        var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
        this.decorations.push(sprite);
    }
};

ObjectPool.prototype.addFrontEdgeSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++)
    {
        var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
        this.frontEdges.push(sprite);
    }
};

ObjectPool.prototype.addBackEdgeSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++)
    {
        var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
        sprite.anchor.x = 1;
        sprite.scale.x = -1;
        this.backEdges.push(sprite);
    }
};

ObjectPool.prototype.addStepSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++)
    {
        var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
        sprite.anchor.y = 0.25;
        this.steps.push(sprite);
    }
};

ObjectPool.prototype.shuffle = function(array) {
    var len = array.length;
    var shuffles = len * 3;
    for (var i = 0; i < shuffles; i++)
    {
        var wallSlice = array.pop();
        var pos = Math.floor(Math.random() * (len-1));
        array.splice(pos, 0, wallSlice);
    }
};