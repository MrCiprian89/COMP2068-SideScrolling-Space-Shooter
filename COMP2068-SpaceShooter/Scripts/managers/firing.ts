module managers {

    export class Fire {
        public level;

        constructor() {
            this.level = level;
        }
     public  stageButtonClick() {
            bullet = new objects.Bullet();
            bullet.x = 55;
            bullet.y = stage.mouseY;

            bullets.unshift(bullet);
            currentStateFunction.game.addChild(bullets[0]);
            createjs.Sound.play(bullet.soundString);      
    }
     public stageButtonClickSpread() {
        bullet = new objects.BulletSpread(0);
        bullet.x = 55;
        bullet.y = stage.mouseY - 5;

        bullets.unshift(bullet);
        currentStateFunction.game.addChild(bullets[0]);

        bullet = new objects.BulletSpread(1);
        bullet.x = 55;
        bullet.y = stage.mouseY;

        bullets.unshift(bullet);
        currentStateFunction.game.addChild(bullets[0]);

        bullet = new objects.BulletSpread(2);
        bullet.x = 55;
        bullet.y = stage.mouseY + 5;

        bullets.unshift(bullet);
        currentStateFunction.game.addChild(bullets[0]);
        createjs.Sound.play(bullet.soundString);
    }


    }
}