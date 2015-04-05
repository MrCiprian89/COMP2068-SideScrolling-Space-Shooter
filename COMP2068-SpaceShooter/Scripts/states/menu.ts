
module states {
    var characterSelect: objects.Button;
    var buttonStart: objects.Button;
    var instructButton: objects.Button;
    var title: objects.Label;
    export function menuState() {
        sky.update();
    }

    //initializes all the objects of the starting menu screen
    export function menu() {
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        sky = new objects.Ocean();
        game.addChild(sky);
        // Show Cursor
        stage.cursor = "default";

        // Display Game Menu
        title = new objects.Label("Space Shooter", 400, 100);
        game.addChild(title);


         buttonStart = new objects.Button("button-sound", "start", constants.SCREEN_CENTRE_WIDTH, constants.SCREEN_CENTRE_HEIGHT);
        game.addChild(buttonStart);
        buttonStart.addEventListener("click", playButtonClicked);

         characterSelect = new objects.Button("button-sound", "select", constants.SCREEN_CENTRE_WIDTH + 76, constants.SCREEN_CENTRE_HEIGHT + 100);
        game.addChild(characterSelect);
        characterSelect.addEventListener("click", selectButtonClicked);

        instructButton = new objects.Button("button-sound", "instructions-button", constants.SCREEN_CENTRE_WIDTH -76, constants.SCREEN_CENTRE_HEIGHT + 100);
        game.addChild(instructButton);
        instructButton.addEventListener("click", instructionButtonClicked);

        stage.addChild(game);
    }

    //FUNCTIONS ########################################################

    //changes the state to the game state when function is called
    export function playButtonClicked(event: MouseEvent) {
        createjs.Sound.play(buttonStart.soundString);
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    export function selectButtonClicked(event: MouseEvent) {
        createjs.Sound.play(characterSelect.soundString);
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.CHARACTER_SELECT;
        changeState(currentState);
    }
    export function instructionButtonClicked(event: MouseEvent) {
        createjs.Sound.play(instructButton.soundString);
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.INSTRUCTION;
        changeState(currentState);
    }
}  //END module