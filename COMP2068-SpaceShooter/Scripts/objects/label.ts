﻿module objects {
    
    //LABEL CLASS
    export class Label extends createjs.Text {
        //instance variables
        public width: number;
        public height: number;

        //CONSTRUCtOR
        constructor(labelString, x: number, y: number) {
            super(labelString, constants.LABEL_FONT , constants.LABEL_COLOUR);
            this.width = this.getMeasuredWidth();
            this.height = this.getMeasuredHeight();
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = x;
            this.y = y;

        }//END constructor

    }//END class
}//END module