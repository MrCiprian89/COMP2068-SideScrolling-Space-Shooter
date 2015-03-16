/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/plane.ts" />
/// <reference path="objects/island.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/ocean.ts" />

var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;

//Game objects
var plane: objects.Plane;
var collectible: objects.Island;
var enemies: objects.Cloud[] = [];
var sky: objects.Ocean;

// asset manifest - array of asset objects
var manifest = [
    { id: "enemy", src: "assets/images/enemy.png" },
    { id: "collectible", src: "assets/images/collectible.png" },
    { id: "background", src: "assets/images/sky.png" },
    { id: "plane", src: "assets/images/plane.png" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "collect", src: "assets/audio/yay.ogg" },
    { id: "damage", src: "assets/audio/thunder.ogg" }
];


// Game Objects 
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
} //function preload ends

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
} //function init ends

function gameLoop() {
    stage.update(); // Refreshes our stage
    plane.update(); //updates plane's position
    collectible.update(); //updates island's position
    sky.update(); //updates ocean's position

    for (var cloud = 3; cloud > 0; cloud--) {
        enemies[cloud].update(); //updates cloud's position
    } //for ends
} //function gameLoop ends


// Our Game Kicks off in here
function main() {
    //add ocean to game
    sky = new objects.Ocean();
    stage.addChild(sky);

    //add island to game
    collectible = new objects.Island();
    stage.addChild(collectible);

    //add plane to game
    plane = new objects.Plane();
    stage.addChild(plane);

    //add clouds to game
    for (var cloud = 3; cloud > 0; cloud--) {
        enemies[cloud] = new objects.Cloud(); //updates cloud's position
        stage.addChild(enemies[cloud]);
    } //for ends
} //function main ends