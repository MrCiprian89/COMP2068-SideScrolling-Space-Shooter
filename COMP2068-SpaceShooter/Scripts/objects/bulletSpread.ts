module objects {
    export class BulletSpread extends objects.GameObjectSprite {

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor(travelDirection: number) {
            if (travelDirection === 0) {
                super("laser-up");
                this._dy = -4;
            }
            else if (travelDirection === 1) {
                super("laser");
                this._dy = 0;
            }
            else {
                super("laser-down");
                this._dy = 2;
            }
            this._dx = 4;
            this.soundString = "laser-sound";
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////

        //Public Methods//////////////////////////////////////////////////////////////////////////
     update() {
            this.x += this._dx;
            this.y += this._dy;
        } //method update ends

    } //class Plane ends
} //module objects ends    