module objects {
    export class Plane extends createjs.Bitmap {


        public height: number;
        public width: number;


        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("plane"));

            this.height = this.getBounds().height;
            this.width = this.getBounds().width;

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.y = stage.mouseY;
            this.x = 30;
            createjs.Sound.play("engine", { loop: -1 });
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.y = stage.mouseY;
        } //method update ends
    } //class Plane ends
} //module objects ends 