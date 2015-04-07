/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="constants.ts" />
/// <reference path="managers/assets.ts" />
/// <reference path="managers/firing.ts" />

/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/instructions.ts" />


/// <reference path="objects/plane.ts" />
/// <reference path="objects/collectible.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/healthbar.ts" />


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
var collectible: objects.collectible;
var enemies: objects.Cloud[] = [];
var sky: objects.Ocean;
var bullets: objects.BulletSpread[] = [];
var bullet: objects.BulletSpread;
var lifeBar: createjs.Text;
var scoreBar: createjs.Text;
var healthBar: objects.HealthBar;

//Game Variables
var score = 0;
var lives = 3;
var player = "ship";
var bulletType = constants.BULLET_NORMAL;
var level = 0;

var currentState: number;
var currentStateFunction;
var shootingFunction;


function preload() {
    managers.Assets.init();
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(managers.Assets.manifest); // loading my asset manifest
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
            level = 1;
            currentStateFunction = states.playState;
            states.play();
            break;

        case constants.LEVEL_TWO:
            // instantiate play screen
            level = 2;
            currentStateFunction = states.level2State;
            states.play2();
            break;

        case constants.LEVEL_THREE:
            // instantiate play screen
            level = 3;
            currentStateFunction = states.level3State;
            states.play3();
            break;

        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            states.gameOver();//initialize the game over state
            break;
    }

} //function main ends
