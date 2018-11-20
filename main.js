var layers = {};
var allLayers = [];

var width;
var height;

var tileset;

var levelGrid;

function myCanvas(id) {
    var canvas = new Canvas(id);
    allLayers.push(canvas);
    return canvas;
}

function setup() {
    layers.background = myCanvas("background");
    layers.foreground = myCanvas("foreground");
    tileset = new Image();
    tileset.src = "https://opengameart.org/sites/default/files/generic-platformer-tiles.png";

    levelGrid = [];

    for (let i = 0; i < 64; i++) {
        let l = [];
        for (let j = 0; j < 128; j++) {
            if (Math.random() < 0.5) {
                l.push(0);
            } else {
                l.push(1);
            }
        }
        levelGrid.push(l);
    }

    resize();

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

function bgDraw() {
    layers.background.filter("blur(15px)");
    layers.background.color("black");
    layers.background.background();
    layers.background.color("#da3");
    var shake = rand2() * 0.025 + last * 0.975;
    last = shake;
    var now = Date.now();
    var top = height *
        (0.3 +
            (Math.sin(now / 300) * 0.01 + Math.sin(now / 305) * 0.01)); // Basic oscillation
    var randomness = height * 0.1 * shake * sin2(now / 5000);

    layers.background.fillRect(-15, top + randomness, width + 30, height * 0.4);

    layers.background.color("black");
    var cycleLength = 500;
    var N = 2;
    for (var i = 0; i < N; i++) {
        layers.background.fillRect(1.4 * width * (0.8 - ((now + i * cycleLength / N) % cycleLength) / cycleLength), 0, 40, height);
    }
}

function getTileOffset(x, y) {
    let map = [[0, 0, 0],
               [0, 0, 0],
               [0, 0, 0]];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (y + i < 0 || y + i >= levelGrid.length) {
                map[i+1][j+1] = 1;
            } else if (x + i < 0 || x + i > levelGrid[y+i].length) {
                map[i+1][j+1] = 1;
            } else {
                map[i+1][j+1] = levelGrid[y+i][x+j];
            }
        }
    }

    if (map[1][1] == 0) {
        return {x: 6, y: 7};
    }

    if (map[0][1] == 0) {
        return {x: 8, y: 0};
    } else {
        return {x: 8, y: 1};
    }
}

function draw() {
    // bgDraw();
    layers.foreground.ctx.clearRect(0, 0, 10000, 10000);
    // layers.foreground.drawImage(tileset, 0, 0, 32, 32, 0, 0, 32, 32);
    const TILESIZE = 16;
    for (let y = 0; y < levelGrid.length; y++) {
        for (let x = 0; x < levelGrid[y].length; x++) {
            if (levelGrid[y][x] == 1) {
                let ref = getTileOffset(x, y);

                if (ref) {
                    layers.foreground.drawImage(tileset, 32 * ref.x, 32 * ref.y,
                                                32, 32, x * TILESIZE, y * TILESIZE,
                                                TILESIZE, TILESIZE);
                } else {
                    layers.foreground.color('blue');
                    layers.foreground.fillRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE);
                }
            } else {
                layers.foreground.color('white');
                layers.foreground.fillRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE);
            }
        }
    }
}

function mainLoop() {
    draw();
}

addSetup(setup);
