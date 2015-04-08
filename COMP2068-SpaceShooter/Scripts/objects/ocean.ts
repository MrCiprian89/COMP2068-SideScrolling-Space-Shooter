module objects {
    export class Ocean extends objects.GameObject {

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("background");
            this._dx = 5;
            this._reset();
            //this.regX = this.getBounds().width;
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset() {
            //set x to a random number
            this.y = 0;
            this.x = 900;
            //this.x = 2952;
        } //method reset ends

        //check to see if the object has reached the end of the screen or has hit the player
        private _checkBounds() {
            if (this.x < -200) {
                this._reset();
            } //if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.x -= this._dx;
            this._checkBounds();
        } //method update ends
    } //class Plane ends
} //module objects ends  