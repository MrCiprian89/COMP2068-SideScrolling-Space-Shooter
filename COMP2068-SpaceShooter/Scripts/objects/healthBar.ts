module objects {
    export class HealthBar extends createjs.Shape{
        //instance variables
        public width;
        public height;
        public name;
        public health;
        private graphic: createjs.Graphics;
  
        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor(health) {
            this.graphic = new createjs.Graphics();
            super(this.drawGraphic(constants.PLAYER_LIVES))
            name = "health_bar"; 
            health = constants.PLAYER_LIVES;
            
        } //constructor ends

        update(lives) {
            
            this.graphics = this.drawGraphic(lives);
           // this.graphics = this.drawGraphic(health);
        }

        drawGraphic(health) {
         
            this.graphic.setStrokeStyle(1);
            var barSize = (104 /constants.PLAYER_LIVES) * health;
            this.graphic = new createjs.Graphics();
            this.graphic.beginFill("green");
            this.graphic.drawRect(624, 40, barSize, 24);
            return this.graphic;
        }
       
    }
} 