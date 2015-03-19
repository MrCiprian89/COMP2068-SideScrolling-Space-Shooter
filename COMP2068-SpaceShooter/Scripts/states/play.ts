module states {

    export function playState() {
        stats.begin();

        if (bullets.length >= 1) {
            var bulletAmount = bullets.length - 1;
            for (var i = bulletAmount; i >= 0; i--) {
                for (var x = 3; x > 0; x--) {
                    checkBulletCollision(bullets[i], enemies[x],i)
                }
                bullets[i].update();
            }
        }
        scoreBar.text = "Score: " + score;
        collision.update();
        lifeBar.text = "Lives: " + lives;
        
        plane.update(); //updates plane's position
        collectible.update(); //updates island's position
        sky.update(); //updates ocean's position

        for (var enmey = 3; enmey > 0; enmey--) {
            enemies[enmey].update(); //updates cloud's position
        } //for ends

        stats.end();
    }

    // play state Function
    export function play(): void {
        var stats: Stats = new Stats();
        
        // Declare new Game Container
        game = new createjs.Container();
        //add ocean to game
        sky = new objects.Ocean();
        game.addChild(sky);

        lifeBar = new createjs.Text("Score: " + score, constants.LABEL_FONT, constants.LABEL_COLOUR);
        lifeBar.x = 620;
        lifeBar.y = 10;
        game.addChild(lifeBar);
        scoreBar = new createjs.Text("Lives: " + lives, constants.LABEL_FONT, constants.LABEL_COLOUR);
        scoreBar.x = 620;
        scoreBar.y = 50;
        game.addChild(scoreBar);


        //add island to game
        collectible = new objects.Island();
        game.addChild(collectible);

        //add plane to game
        plane = new objects.Plane();
        game.addChild(plane);

        //add clouds to game
        for (var cloud = 3; cloud > 0; cloud--) {
            enemies[cloud] = new objects.Cloud(); //updates cloud's position
            game.addChild(enemies[cloud]);
        } //for ends

        collision = new managers.Collision(plane, collectible, enemies);

        //activates the mouse click by firing
        stage.addEventListener("click", stageButtonClick);

        stage.addChild(game);
    }

//Event Handlers ###############################################################
    export function stageButtonClick() {
        bullet = new objects.Bullet();
        bullet.x = 55;
        bullet.y = stage.mouseY;

        bullets.unshift(bullet);
        game.addChild(bullets[0]);
    }

    //Utility Methods #####################################################################
    //Create an fps display
   export function setupStats() {
        stats.setMode(1);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '810px';
        stats.domElement.style.top = '0';
        document.body.appendChild(stats.domElement);
    }

    //Calculate distance between two points
    export function distance(p1: createjs.Point, p2: createjs.Point): number {

        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
   }//END distance


    export function checkBulletCollision(collider1: objects.GameObject, collider2: objects.Cloud, index) {
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
                //score += 100;
            }
        }
        else {

        }
    }
}//END bulletUpdate
