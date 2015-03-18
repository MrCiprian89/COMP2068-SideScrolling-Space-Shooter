module objects {
    export class Bullet extends objects.GameObject {

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("bullet");
            this._dx = 2;
            this.soundString = "collect";
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////

        //check to see if the object has reached the end of the screen or has hit the player
        private _checkBounds() {
            if (this.x > 800 + this.width || this.isColliding == true) {
                game.removeChild(this);
            }//if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.x += this._dx;
              this._checkBounds();
        } //method update ends
    } //class Plane ends
} //module objects ends   