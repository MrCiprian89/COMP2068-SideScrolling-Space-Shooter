module managers {

    export class Fire {
        public level;

        constructor(level) {
            this.level = level;
        }

        public stageButtonClick() {
         
            if (tickEvent - playerLastFired > playerFireDelay) {
                playerLastFired = tickEvent;
                bullet = new objects.BulletSpread(1);
                bullet.x = 55;
                bullet.y = stage.mouseY;

                bullets.unshift(bullet);
                currentStateFunction.game.addChild(bullets[0]);
                var bullet = createjs.Sound.play(bullet.soundString);
                bullet.volume = 0.5;
            }
        }

        public stageButtonClickSpread() {
            if (tickEvent - playerLastFired > playerFireDelay) {
                playerLastFired = tickEvent;
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
                var bullet = createjs.Sound.play(bullet.soundString);
                bullet.volume = 0.5;
            }
        }

    }
}