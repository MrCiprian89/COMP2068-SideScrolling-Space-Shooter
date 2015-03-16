module objects {
    export class Plane extends createjs.Bitmap{
        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("plane"));
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.y = 430;
            this.x = stage.mouseX;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.x = stage.mouseX;
        } //method update ends
    } //class Plane ends
} //module objects ends 