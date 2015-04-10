module states {
    export function playState() {
        if (bullets.length >= 1) {
            var bulletAmount = bullets.length - 1
            for (var i = bulletAmount; i >= 0; i--) {
                for (var x = constants.ENEMY_NUM; x > 0; x--) {
                    if (bullets[i] != null) {
                        states.checkBulletCollision(bullets[i], enemies[x], i);
                    }
                }
                if (bullets[i] != null) {
                    if (bullets[i].x > 800) {
                        bullets.splice(i, 1);
                        game.removeChild(bullets[i]);
                    }
                    else {
                        bullets[i].update();
                    }
                }  
            }
        }//END if 
        collision.update();   
        scoreBar.text = "" + score;
           
        plane.update(); //updates plane's position16
        collectible.update(); //updates collectible's position
        sky.update(); //updates ocean's position

        for (var enmey = constants.ENEMY_NUM; enmey > 0; enmey--) {
            enemies[enmey].update(); //updates ENEMY's position
        } //for ends
    }//END playState

    // play state Function
    export function play(): void {   
       
        // Declare new Game Container
        game = new createjs.Container();
        //add sky to game
        sky = new objects.Ocean();
        game.addChild(sky);

        //add stage title
        stageLabel = new objects.GameObjectSprite("stage1-font");
        stageLabel.x = 400;
        stageLabel.y = 240;
        game.addChild(stageLabel);
        createjs.Tween.get(stageLabel).to({ alpha: 0 }, 1000);

        //add collectible to game
        collectible = new objects.collectible();
        game.addChild(collectible);

        //add plane to game
        plane = new objects.Plane(player);
        game.addChild(plane);

        //add ENEMYs to game
        for (var ENEMY = constants.ENEMY_NUM; ENEMY > 0; ENEMY--) {
            enemies[ENEMY] = new objects.ENEMY(); //updates ENEMY's position
            game.addChild(enemies[ENEMY]);
        } //for ends
        collision = new managers.Collision(plane, collectible, enemies);


        //add health label 
        var healthLabel = new objects.GameObjectSprite("health-font");
        healthLabel.x = 555;
        healthLabel.y = 48;
        game.addChild(healthLabel);

        //add score label 
        var scoreLabel = new objects.GameObjectSprite("score-font");
        scoreLabel.x = 555;
        scoreLabel.y = 85;
        game.addChild(scoreLabel);

        //add empty container that shows when health drops
        var healthContainer = new objects.GameObject("health-container");
        healthContainer.x = 676;
        healthContainer.y = 36;
        game.addChild(healthContainer);

        //add a shape object that shows the current health of the player
        healthBar = new objects.HealthBar(7);
        game.addChild(healthBar);

        //add text to show score
        scoreBar = new createjs.Text("" + score, constants.LABEL_FONT, constants.LABEL_COLOUR);
        scoreBar.x = 620;
        scoreBar.y = 72;
        game.addChild(scoreBar);

        //activates the mouse click by firing
         
        document.addEventListener("mouseup", managers.Fire.stageButtonClick);  
        stage.addChild(game);
    }//END play

//utility classes ###############################################################

    //Calculate distance between two points
    export function distance(p1: createjs.Point, p2: createjs.Point): number {
        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
   }//END distance

    export function checkBulletCollision(collider1: objects.GameObjectSprite, collider2: objects.ENEMY, index) {

        var p1: createjs.Point = new createjs.Point;
        var p2: createjs.Point = new createjs.Point;
        p1.x = collider1.x;
        p1.y = collider1.y;
        p2.x = collider2.x;
        p2.y = collider2.y;
        if (distance(p1, p2) < ((collider1.width * 0.5) + (collider2.width * 0.5))) {
            if (!collider2.isColliding) {
                bullets.splice(index, 1);
                game.removeChild(collider1);
                collider2.reset();
                createjs.Sound.play("enemy-hit-sound");
                score += 10;
            }
        }
        else {

        }
    }
}//END module
