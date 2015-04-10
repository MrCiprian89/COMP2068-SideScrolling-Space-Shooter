/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/collectible.ts" />
/// <reference path="../objects/plane.ts" />


module managers {
    // Collision Manager Class
    export class Collision2 {
        // class variables
        private plane: objects.Plane;
        private collectible: objects.collectible;
        private ENEMYs = [];
        private enemies = [];

        constructor(plane: objects.Plane, collectible: objects.collectible, ENEMYs, enemies) {
            this.plane = plane;
            this.collectible = collectible;
            this.ENEMYs = ENEMYs;
            this.enemies = enemies;
        }

        // Utility method - Distance calculation between two points
        private distance(p1: createjs.Point, p2: createjs.Point): number {
            var result: number = 0;
            var xPoints: number = 0;
            var yPoints: number = 0;

            xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;

            yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;

            result = Math.sqrt(xPoints + yPoints);

            return result;
        }

        // check collision between plane and any ENEMY object
        private collisionCheck(collider1, collider2) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = collider1.x;
            p1.y = collider1.y;
            p2.x = collider2.x;
            p2.y = collider2.y;
            if (this.distance(p1, p2) < ((collider1.width / 2) + (collider2.width / 2)) - 20) {
                createjs.Sound.play(collider2.soundString);
                collider1.isColliding = true;
                collider2.isColliding = true;
                if (collider2.name === "enemy" || collider2.name === "enemy2") {
                    lives--;
                    healthBar.update(lives);
                    //take away bullet power up
                    bulletType = constants.BULLET_NORMAL;
                    stage.removeAllEventListeners();
                    stage.addEventListener("click", managers.Fire.stageButtonClick);
                }
                if (lives <= 0) {
                    changeState(constants.GAME_OVER_STATE)
                }
                if (collider2.name === "power-up-multi") {
                    score += 200;
                    if (bulletType != constants.BULLET_SPREAD) {
                        bulletType = constants.BULLET_SPREAD;
                        stage.removeAllEventListeners();
                        stage.addEventListener("click", managers.Fire.stageButtonClickSpread);
                    }
                }
                // if (collider2.name === "collectible") { score += 200; }
            }
            else {
                collider2.isColliding = false;
                collider1.isColliding = false;
            }
        }

        // Utility Function to Check Collisions
        update() {
            for (var ENEMY = constants.ENEMY_NUM; ENEMY > 0; ENEMY--) {
                this.collisionCheck(this.plane, this.ENEMYs[ENEMY]);
            }
            for (var enemy = 3; enemy > 0; enemy--) {
                this.collisionCheck(this.plane, this.enemies[enemy]);
            }
            this.collisionCheck(this.plane, this.collectible);
        }//END update()
    }//END class
}//END modules   