var layers = {};
var allLayers = [];

var width;
var height;

function myCanvas(id) {
    var canvas = new Canvas(id);
    allLayers.push(canvas);
    return canvas;
}

function setup() {
    layers.background = myCanvas("background");

    addUpdate(mainLoop);
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    for (var layer of allLayers) {
        layer.resize(width, height);
    }
}

function draw() {
    layers.background.filter("blur(15px)");
    layers.background.color("black");
    layers.background.background();
    layers.background.color("yellow");
    layers.background.fillRect(5, 5, 200, 200);
}

function mainLoop() {
    resize();
    draw();
}

addSetup(setup);
