module objects {
    export class Boss extends createjs.SpriteContainer {
        private gun;
        private body;
        private gasTank;


        constructor() {
            super(managers.Assets.atlas);
            this.gun = new GameObjectSprite("boss_gun");
            this.gun.x = 200;
            this.gun.y = 150;
            this.addChild(this.gun);

            this.body = new GameObjectSprite("boss_breakable_smaller");
            this.body.x = 200;
            this.body.y = 160;
            this.addChild(this.body);

            this.gasTank = new GameObjectSprite("gas_tank_dark");
            this.gasTank.x = 250;
            this.gasTank.y = 300;
            this.addChild(this.gasTank);
            stage.addChild(this);
        }


    }//END class
}//END module 