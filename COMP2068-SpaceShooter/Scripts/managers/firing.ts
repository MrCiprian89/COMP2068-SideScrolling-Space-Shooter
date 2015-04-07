module managers {

    export class Fire {
        public static normalFire;
        public static spreadFire;

     public static stageButtonClick() {
            bullet = new objects.Bullet();
            bullet.x = 55;
            bullet.y = stage.mouseY;

            bullets.unshift(bullet);
            game.addChild(bullets[0]);
            createjs.Sound.play(bullet.soundString);
          
    }
     public static stageButtonClickSpread() {
        bullet = new objects.BulletSpread(0);
        bullet.x = 55;
        bullet.y = stage.mouseY - 5;

        bullets.unshift(bullet);
        game.addChild(bullets[0]);

        bullet = new objects.BulletSpread(1);
        bullet.x = 55;
        bullet.y = stage.mouseY;

        bullets.unshift(bullet);
        game.addChild(bullets[0]);

        bullet = new objects.BulletSpread(2);
        bullet.x = 55;
        bullet.y = stage.mouseY + 5;

        bullets.unshift(bullet);
        game.addChild(bullets[0]);
        createjs.Sound.play(bullet.soundString);
    }


    }
}