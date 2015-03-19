/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="constants.ts" />

/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="constants.ts" />

/// <reference path="objects/plane.ts" />
/// <reference path="objects/island.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/bullet.ts" />

var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;
var game: createjs.Container;
var collision: managers.Collision;


//Game objects
var plane: objects.Plane;
var collectible: objects.Island;
var enemies: objects.Cloud[] = [];
var sky: objects.Ocean;
var bullets: objects.Bullet[] = [];
var bullet: objects.Bullet;
var lifeBar: createjs.Text;
var scoreBar: createjs.Text;
var score = 0;
var lives = 5;


var currentState: number;
var currentStateFunction;

// asset manifest - array of asset objects
var manifest = [
    { id: "enemy", src: "assets/images/enemy.png" },
    { id: "collectible", src: "assets/images/collectible.png" },
    { id: "background", src: "assets/images/sky.png" },
    { id: "plane", src: "assets/images/plane.png" },
    { id: "bullet", src: "assets/images/bullet.png" },
    { id: "start", src: "assets/images/start-button.png" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "collect", src: "assets/audio/yay.ogg" },
    { id: "damage", src: "assets/audio/thunder.ogg" }
];

function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
} //function preload ends

//Initialize the game
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    currentState = constants.MENU_STATE; //start the game in the menu screen
    changeState(currentState); //will use the menu tate variable on the changestate function
} //function init ends


// Game Loop function that gets called every tick
function gameLoop(event): void {
    currentStateFunction();
    stage.update();
}

function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            currentStateFunction = states.menuState;
            states.menu();
            break;

        case constants.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            break;

        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            states.gameOver();//initialize the game over state
            break;
    }
} //function main ends