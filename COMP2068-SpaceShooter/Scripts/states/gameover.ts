module states {
    export function gameOverState() {
        sky.update();
  
    }

    // Restart Game when Try Again Button is clicked
    export function tryAgainClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }

    // Game Over Scene
    export function gameOver() {
        createjs.Sound.stop();
        game.removeAllChildren();
        game.removeAllEventListeners();
        stage.removeAllEventListeners();



        // Declare new Game Container
        game = new createjs.Container();
        //add ocean to game
        sky = new objects.Ocean();
        game.addChild(sky);
        // Show Cursor
        stage.cursor = "default";


        stage.addChild(game);

    }
} 