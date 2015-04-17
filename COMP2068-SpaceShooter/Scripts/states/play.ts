/// <reference path="../objects/bullet.ts" />
/// <reference path="../objects/bulletspread.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/collectible.ts" />
/// <reference path="../objects/gameobjects.ts" />
/// <reference path="../objects/gameobjectsprite.ts" />
/// <reference path="../objects/healthbar.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/powerup.ts" />
/// <reference path="../objects/plane.ts" />
/// <reference path="../constants.ts" />
/// <reference path="../managers/firing.ts" />
/// <reference path="../managers/collision.ts" />
/// <reference path="../objects/boss.ts" />


module states {
    export class Play {
        public game: createjs.Container;
        public sky: objects.Ocean;
        public collectible: objects.collectible;
        public stageLabel: objects.GameObjectSprite;
        public plane: objects.Plane;
        public enemies: objects.ENEMY[] = [];
        public collision: managers.Collision;
        public healthLabel: objects.GameObjectSprite;
        public scoreLabel;
        public healthContainer;
        public healthBar;
        public scoreBar;
        public firingMethod;
        public lastFired;
        public fireDelay: number;

        // play state Function
        constructor(label) {   
            //RED found and added soundtrack ///////////////////////////////////////////
            createjs.Sound.play("game-soundtrack", { loop: -1 });            
            //Setup Game Variables
            this.lastFired = 0;
            this.fireDelay = 100;
            bulletType = constants.BULLET_NORMAL;

            // Declare new Game Container
            this.game = new createjs.Container();
            //add sky to game
            this.sky = new objects.Ocean();
            this.game.addChild(this.sky);

            //add stage title
            this.stageLabel = new objects.GameObjectSprite(label);
            this.stageLabel.x = 400;
            this.stageLabel.y = 240;
            this.game.addChild(this.stageLabel);
            createjs.Tween.get(this.stageLabel).to({ alpha: 0 }, 1000);

            //add collectible to game
            this.collectible = new objects.collectible();
            this.game.addChild(this.collectible);

            //add plane to game
            this.plane = new objects.Plane(player);
            this.game.addChild(this.plane);

            //add ENEMYs to game
            for (var ENEMY = constants.ENEMY_NUM; ENEMY > 0; ENEMY--) {
                this.enemies[ENEMY] = new objects.ENEMY(); //updates ENEMY's position
                this.game.addChild(this.enemies[ENEMY]);
            } //for ends

            //add health label 
            this.healthLabel = new objects.GameObjectSprite("health-font");
            this.healthLabel.x = 555;
            this.healthLabel.y = 48;
            this.game.addChild(this.healthLabel);

            //add score label 
            this.scoreLabel = new objects.GameObjectSprite("score-font");
            this.scoreLabel.x = 555;
            this.scoreLabel.y = 85;
            this.game.addChild(this.scoreLabel);

            //add empty container that shows when health drops
            this.healthContainer = new objects.GameObject("health-container");
            this.healthContainer.x = 676;
            this.healthContainer.y = 36;
            this.game.addChild(this.healthContainer);

            //add a shape object that shows the current health of the player
            this.healthBar = new objects.HealthBar(7);
            this.game.addChild(this.healthBar);

            //add text to show score
            this.scoreBar = new createjs.Text("" + score, constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.scoreBar.x = 620;
            this.scoreBar.y = 72;
            this.game.addChild(this.scoreBar);

            this.firingMethod = new managers.Fire(this);
            this.collision = new managers.Collision(this.healthBar, this.firingMethod);

            //activates the mouse click by firing
            stage.removeAllEventListeners();
            stage.addEventListener("mousedown", this.firingMethod.stageButtonClick);
            stage.addChild(this.game);
        }//END constructor

        public update() {

            this.checkBulletCollisions(this.enemies);

            this.checkCollisions();
             this.scoreBar.text = "" + score;
            this.plane.update(); //updates plane's position16
            this.collectible.update(); //updates collectible's position
            this.sky.update(); //updates ocean's position

            for (var enmey = constants.ENEMY_NUM; enmey > 0; enmey--) {
                this.enemies[enmey].update(); //updates ENEMY's position
             //   this.enemies[enmey].fireBullet();
            //   this.enemies[enmey].checkBulletCollision(this.plane);
            //    this.enemies[enmey].checkBulletOutOfBounds();
            } //for ends

            if (bullets.length >= 1) {
                var bulletAmount = bullets.length - 1
                for (var i = bulletAmount; i >= 0; i--) {
                    if (bullets[i] != null) {
                        if (bullets[i].x > 850) {
                            this.game.removeChild(bullets[i]);
                            bullets.splice(i, 1);
                        }//END if
                        else {
                            bullets[i].update();
                        }//END else
                    }//END if
                }//END for
                }//END if

        }//END update()

       public clearLevel() {
           this.game.removeAllChildren();
           stage.removeAllEventListeners();
           stage.removeChild(this.game);
       }
//utility functions ###############################################################

    //Calculate distance between two points
    private distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }//END distance

    private checkBulletCollision(collider1: objects.GameObjectSprite, collider2: objects.ENEMY, index) {

            var p1: createjs.Point = new createjs.Point;
            var p2: createjs.Point = new createjs.Point;
            p1.x = collider1.x;
            p1.y = collider1.y;
            p2.x = collider2.x;
            p2.y = collider2.y;
            if (this.distance(p1, p2) < ((collider1.width * 0.5) + (collider2.width * 0.5))) {
                if (!collider2.isColliding) {
                    bullets.splice(index, 1);
                    this.game.removeChild(collider1);
                    collider2.reset();
                    var hit = createjs.Sound.play("enemy-hit-sound");
                    hit.volume = 0.5;
                    score += 10;
                }
            }
            else {

            }
        }//END checkBulletCollision()

    protected checkCollisions() {
        this.collision.update(this.plane, this.enemies);
        this.collision.collectiblePickup(this.plane, this.collectible);
    }
        protected checkBulletCollisions(enemies){

            if (bullets.length >= 1) {
                var bulletAmount = bullets.length - 1
                for (var i = bulletAmount; i >= 0; i--) {
                    for (var x = constants.ENEMY_NUM; x > 0; x--) {
                        if (bullets[i] != null) {
                            this.checkBulletCollision(bullets[i], enemies[x], i);
                        }
                    }
                }
            }//END if 
    }

        protected  checkBulletCollisions2(enemies) {
            if (bullets.length >= 1) {
                var bulletAmount = bullets.length - 1
                for (var i = bulletAmount; i >= 0; i--) {
                    if (bullets[i] != null) {
                        this.checkBulletCollision(bullets[i], enemies, i);
                    }
                }


            }
        }


    }//END class
}//END module

