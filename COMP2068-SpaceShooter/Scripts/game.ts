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
var sky: objects.Ocean;
var bullets: objects.BulletSpread[] = [];
var bullet: objects.BulletSpread;
var lifeBar: createjs.Text;
var scoreBar: createjs.Text;
var healthBar: objects.HealthBar;

//Game Variables
var score = 0;
var lives = 3;
var player = "ship1";
var bulletType = constants.BULLET_NORMAL;
var level = 0;

var currentState: number;
var currentStateFunction;
var stateChanged: boolean = false;

//Game States
//var gameOver: states.GameOver;
//var play: states.Play;
var menu: states.Menu;
var instructions: states.Instruction;
var characterSelect: states.CharacterSelect;
var level1: states.Play;
var level2: states.Level2State;
var level3: states.Level3State;

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
    setupStats();
    currentState = constants.MENU_STATE; //start the game in the menu screen
    changeState(currentState); //will use the menu state variable on the changestate function
} //function init ends


// Game Loop function that gets called every tick
function gameLoop(event): void {
    stats.begin();
    currentStateFunction.update();
    if (score >= 100 && level === 1) {
        currentState = constants.LEVEL_TWO;
        stateChanged = true;
    }
    //if (score >= 300 && level === 2) {
    //    currentState = constants.LEVEL_THREE;
    //    stateChanged = true;
    //}
    if (stateChanged) {
        changeState(currentState);
    }//END if

    stage.update();
    stats.end();
}//END gameLoop()

function changeState(state: number): void {
    // Launch Various "screens"
    stateChanged = false;
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;

        case constants.CHARACTER_SELECT:
            // instantiate menu screen
            characterSelect = new states.CharacterSelect;
            currentStateFunction = characterSelect;
            break;
             
        case constants.INSTRUCTION:
            // instantiate menu screen
            instructions = new states.Instruction();
            currentStateFunction = instructions;
            break;

        case constants.PLAY_STATE:
            // instantiate play screen
            level = 1;
            console.log("start stage 1");
            level1 = new states.Play("stage1-font");
            currentStateFunction = level1;
            break;

        case constants.LEVEL_TWO:
            // instantiate play screen
            level = 2;
            console.log("start stage 2");
            currentStateFunction.clearLevel();
            level2 = new states.Level2State
            currentStateFunction = level2;
            break;

        case constants.LEVEL_THREE:
            // instantiate play screen
            level = 3;
            console.log("start stage 3");
            currentStateFunction.clearLevel();
            level3 = new states.Level3State;
            currentStateFunction = level3;
            break;

        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            states.gameOver();//initialize the game over state
            break;
    }//END switch
}//END changeState


    // UTILITY METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function setupStats() {
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '650px';
        stats.domElement.style.top = '440px';
        document.body.appendChild(stats.domElement);
    }//END setup stats

