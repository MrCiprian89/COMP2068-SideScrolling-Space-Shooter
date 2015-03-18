





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

        // Display Game Over
        var collectible2 = new objects.Island;
        collectible2.x = 200;
        collectible2.y = 300;
        game.addChild(collectible2);
        collectible2.addEventListener("click", playButtonClicked);

        stage.addChild(game);
    }
}  