

module states {
    export function playState() {
        plane.update(); //updates plane's position
        collectible.update(); //updates island's position
        sky.update(); //updates ocean's position

        for (var enmey = 3; enmey > 0; enmey--) {
            //checkCollision(plane, enemies[enmey]);

            enemies[enmey].update(); //updates cloud's position
        } //for ends
        // if (bullets.length >= 1) {
        var bulletAmount = bullets.length - 1;
        for (var i = bulletAmount; i >= 0; i--) {
            bullets[i].update();
        }
        stage.update(); // Refreshes our stage
    }
    function stageButtonClick() {
        bullet = new objects.Bullet();
        bullet.x = 55;
        bullet.y = stage.mouseY;

        bullets.unshift(bullet);
        stage.addChild(bullets[0]);
    }


    // play state Function
    export function play(): void {
        // Declare new Game Container
        game = new createjs.Container();
        //add ocean to game
        sky = new objects.Ocean();
        game.addChild(sky);

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

        //activates the mouse click by firing
        stage.addEventListener("click", stageButtonClick);

        stage.addChild(game);
    }
} 