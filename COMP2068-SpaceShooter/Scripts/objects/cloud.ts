module objects {

    export class Cloud extends objects.GameObject {
  
        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("enemy");
            this._dx = 5;
            this.soundString = "damage";
            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset() {
            //set x to a random number
            this.y = Math.floor(Math.random() * 300);
            this.x = this.width + 800;
            this._dx = Math.floor(Math.random() * 5) + 8;
            this.isColliding = false;
        } //method reset ends

        //check to see if the object has reached the end of the screen or has hit the player
        private _checkBounds() {
            if (this.x < -480 + this.width || this.isColliding == true) {
                this._reset();
            } //if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this._checkBounds();
            this.x -= this._dx;         
        } //method update ends
    } //class Plane ends
} //module objects ends   