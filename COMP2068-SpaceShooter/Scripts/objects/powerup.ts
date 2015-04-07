module objects {
    export class PowerUp extends objects.GameObjectSprite {

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("collectible");
            this._dx = 2;
            this.soundString = "laser-sound";
            this.name = "powerup";
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////

        //check to see if the object has reached the end of the screen or has hit the player
        private _checkBounds() {
            if (this.x > 800 + this.width || this.isColliding == true) {

            }//if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.x += this._dx;
            this._checkBounds();
        } //method update ends
    } //class Plane ends
} //module objects ends    