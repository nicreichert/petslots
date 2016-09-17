const backgroundWidth = 800;
const backgroundHeight = 600;

const stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(backgroundWidth, backgroundHeight);

const Slots = [
    "cat",
    "fox",
    "dog",
    "penguin",
    "bear"
];

function Helper() {
    this.addToScene = function(sprite) {
    	stage.addChild(sprite);
    };

    this.addToParent = function(parent, component) {
        $(parent).append(component);
    };

    this.removeFromScene = function(sprite) {
    	stage.removeChild(sprite);
    };

    this.createRoundSquare = function(x, y, w, h, r) {
        var square = new PIXI.Graphics();
        square.beginFill();
        square.drawRoundedRect(x, y, w, h, r);
        square.endFill();

        return square;
    };

	this.getSlotTypeFileName = function(type) {
		return "images/" + type + ".png";
	};
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] === obj)
            return true;
    return false;
};

Array.prototype.last = function(){
    return this[this.length - 1];
};

Array.prototype.first = function(){
    return this[0];
};

PIXI.Graphics.prototype.setInteractive = function(val) {
    this.interactive = val;
    return this;
};

String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

