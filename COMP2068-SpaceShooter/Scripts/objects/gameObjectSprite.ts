module objects {

    export class GameObjectSprite extends createjs.Sprite {
        // PUBLIC VARIABLES
        public width: number;
        public height: number;
        public isColliding: boolean;
        public soundString: string;
        public name: string;

        // PRIVATE VARIABLE
        protected _dy;
        protected _dx;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor(assetString: string) {
            super(managers.Assets.atlas, assetString);

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.isColliding = false;
        }


    }

}    