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

function rand2() {
    return 2 * Math.random() - 1;
}

function sin2(x) {
    var res = Math.sin(x);
    var r2 = res * res;
    return r2 * r2;
}

var last = 0;

function draw() {
    layers.background.filter("blur(15px)");
    layers.background.color("black");
    layers.background.background();
    layers.background.color("#da3");
    var shake = rand2() * 0.02 + last * 0.98;
    last = shake;
    var now = Date.now();
    var top = height *
        (0.3 +
            (Math.sin(now / 300) * 0.02 + Math.sin(now / 305) * 0.02 + // Basic oscillation
            0.1 * shake * sin2(now / 5000)));
    layers.background.fillRect(-15, top, width + 30, height * 0.4);
}

function mainLoop() {
    resize();
    draw();
}

addSetup(setup);
