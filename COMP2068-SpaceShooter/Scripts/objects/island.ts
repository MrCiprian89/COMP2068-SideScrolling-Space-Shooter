module objects {
    export class Island extends objects.GameObject {

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("collectible");
            this.name = "collectible";
            this._dx = 5;
            this.soundString = "collect";
            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset() {
            //set x to a random number
            this.y = Math.floor(Math.random() * 640);
            this.x = this.width + 800;
        } //method reset ends

        //check to see if the object has reached the end of the screen or has hit the player
        private _checkBounds() {
            if ((this.x < -480 + this.height) || this.isColliding == true) {
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