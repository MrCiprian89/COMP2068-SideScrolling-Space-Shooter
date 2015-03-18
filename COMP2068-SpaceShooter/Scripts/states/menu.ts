
module states {
    //changes the state to the game state when function is called
    export function playButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE; 
        changeState(currentState);
    }

    export function menuState() {
        sky.update();
        plane.update();
    }

    //initializes all the objects of the starting menu screen
    export function menu() {
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        sky = new objects.Ocean();
        plane = new objects.Plane();

        // Show Cursor
        stage.cursor = "default";

        // Display Game Menu
        var buttonStart = new objects.Button("thunder", "start");
        buttonStart.x = 320;
        buttonStart.y = 220;
        game.addChild(buttonStart);
        buttonStart.addEventListener("click", playButtonClicked);
        stage.addChild(game);
    }
}  