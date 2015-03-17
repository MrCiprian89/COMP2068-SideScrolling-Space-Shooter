module objects {
    export class Plane extends objects.GameObject {

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("plane");
            this.soundString = "engine";
              this.y = stage.mouseY;
              this.x = 30;
              this.regX = this.getBounds().width * 0.5;
              this.regY = this.getBounds().height * 0.5;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.y = stage.mouseY;
        } //method update ends
    } //class Plane ends
} //module objects ends  



