module objects {
    export class ScoreBoard {

        //PUBLIC INSTANCE VARIABLES
        public lives: number = constants.PLAYER_LIVES;
        public score: number = 0;

        //PRIVATE INSTANCE VARIABLES
        private _livesLabel: createjs.Text;
        private _scoreLabel: createjs.Text;

        //CONSTRUCTOR
        constructor() {
            this._livesLabel = new createjs.Text("Lives: ", constants.LABEL_FONT + " " + "consolas", constants.LABEL_COLOUR);
            game.addChild(this._livesLabel);

            this._scoreLabel = new createjs.Text("Score: ", constants.LABEL_FONT + " " + "consolas", constants.LABEL_COLOUR);
            game.addChild(this._scoreLabel);

            this._scoreLabel.x = 350;
            this._scoreLabel.y = 100;
            this._livesLabel.x = 350;
            this._livesLabel.y = 300;
             
        }//END constructor

        update() {
            this._livesLabel.text = "LIVES: " + this.lives.toString();
            this._scoreLabel.text = "SCORE: " + this.score.toString();
        }


    }//END class
}//END module