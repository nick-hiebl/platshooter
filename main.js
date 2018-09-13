var layers = {};
var allLayers = [];

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
    for (var layer of allLayers) {
        layer.resize(window.innerWidth, window.innerHeight);
    }
}

function draw() {
    layers.background.filter('blur(5px)');
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
