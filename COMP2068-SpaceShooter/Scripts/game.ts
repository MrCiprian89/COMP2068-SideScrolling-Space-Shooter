/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="constants.ts" />
/// <reference path="managers/assets.ts" />

/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/instructions.ts" />


/// <reference path="objects/plane.ts" />
/// <reference path="objects/island.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/button.ts" />


//Game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;
var game: createjs.Container;
var collision: managers.Collision;
var stats: Stats = new Stats();
var textureAtlas: createjs.SpriteSheet;
var fontAtlas: createjs.SpriteSheet;

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
var lives = 3;
var player = "ship";

var currentState: number;
var currentStateFunction;

// asset manifest - array of asset objects
var manifest = [
    { id: "enemy", src: "assets/images/enemy-ship.png" },
    { id: "collectible", src: "assets/images/pickup.png" },
    { id: "background", src: "assets/images/sky.png" },
    { id: "plane", src: "assets/images/plane.png" },
    { id: "ship", src: "assets/images/ship1.png" },
    { id: "ship2", src: "assets/images/ship2.png" },
    { id: "bullet", src: "assets/images/laser.png" },
    { id: "select", src: "assets/images/select-button.png" },
    { id: "start", src: "assets/images/start-button.png" },
    { id: "back", src: "assets/images/back-button.png" },
    { id: "main-menu-button", src: "assets/images/main-menu-button.png" },
    { id: "try-again-button", src: "assets/images/try-again-button.png" },
    { id: "select-ship1-button", src: "assets/images/ship-select-button1.png" },
    { id: "select-ship2-button", src: "assets/images/ship-select-button2.png" },
    { id: "instructions-button", src: "assets/images/instructions-button.png" },
    { id: "instructions", src: "assets/images/instructions.png" },
    { id: "game-over", src: "assets/images/game-over-label.png" },

    { id: "damage", src: "assets/audio/explosion.wav" },
    { id: "laser-sound", src: "assets/audio/laser_fire.wav" },
    { id: "enemy-hit-sound", src: "assets/audio/laser_hit.wav" },
    { id: "collect", src: "assets/audio/pickup.wav" },
    { id: "button-sound", src: "assets/audio/button_press.wav" },
    { id: "select-button-sound", src: "assets/audio/button_select.wav" },
    { id: "explosion", src: "assets/audio/button_select.wav" },
    { id: "gameover-explosion-sound", src: "assets/audio/game-over-explosion.wav" }
];

function preload() {
    managers.Assets.init();
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
    textureAtlas = new createjs.SpriteSheet(managers.Assets.loadSprites);
} //function preload ends

//Initialize the game
function init() {
    managers.Assets.loadSprites();
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    stats.setMode(1);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '810px';
    stats.domElement.style.top = '0';
    document.body.appendChild(stats.domElement);
    currentState = constants.MENU_STATE; //start the game in the menu screen
    changeState(currentState); //will use the menu tate variable on the changestate function
} //function init ends


// Game Loop function that gets called every tick
function gameLoop(event): void {
    stats.begin();
    currentStateFunction();
    stage.update();
    stats.end();
}

function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            currentStateFunction = states.menuState;
            states.menu();
            break;

        case constants.CHARACTER_SELECT:
            // instantiate menu screen
            currentStateFunction = states.selectState;
            states.selectOptions();
            break;

        case constants.INSTRUCTION:
            // instantiate menu screen
            currentStateFunction = states.instructionState;
            states.showInstructions();
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
