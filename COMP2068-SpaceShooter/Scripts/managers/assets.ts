module managers {
    export class Assets {
        public static loader;
        public static manifest;
        public static atlas: createjs.SpriteSheet;
        public static bitMapFont: createjs.SpriteSheet;
    
        // Initialize Image and Sound Assets
        public static init() {
            // asset manifest - array of asset objects
            this.manifest = [
                { id: "laser-up", src: "assets/images/laser-up.png" },
                { id: "laser-down", src: "assets/images/laser-down.png" },
                { id: "health-container", src: "assets/images/health-container.png" },
                { id: "textureAtlas", src: "assets/images/atlas.png" },
                { id: "collectible", src: "assets/images/pickup.png" },
                { id: "background", src: "assets/images/sky.gif" },
                { id: "plane", src: "assets/images/plane.png" },
                { id: "ship", src: "assets/images/ship1.png" },
                { id: "ship2", src: "assets/images/ship2.png" },
                { id: "select", src: "assets/images/select-button.png" },
                { id: "start", src: "assets/images/start-button.png" },
                { id: "back", src: "assets/images/back-button.png" },
                { id: "main-menu-button", src: "assets/images/main-menu-button.png" },
                { id: "try-again-button", src: "assets/images/try-again-button.png" },
                { id: "select-ship1-button", src: "assets/images/ship-select-button1.png" },
                { id: "select-ship2-button", src: "assets/images/ship-select-button2.png" },
                { id: "instructions-button", src: "assets/images/instructions-button.png" },
                { id: "instructions", src: "assets/images/instructions.png" },
                { id: "game-over", src: "assets/images/game-over-label.png" },

                { id: "damage", src: "assets/audio/explosion.wav" },
                { id: "laser-sound", src: "assets/audio/laser_fire.wav" },
                { id: "enemy-hit-sound", src: "assets/audio/laser_hit.wav" },
                { id: "collect", src: "assets/audio/pickup.wav" },
                { id: "button-sound", src: "assets/audio/button_press.wav" },
                { id: "select-button-sound", src: "assets/audio/button_select.wav" },
                { id: "explosion", src: "assets/audio/button_select.wav" },
                { id: "gameover-explosion-sound", src: "assets/audio/game-over-explosion.wav" }
            ];


            createjs.Sound.initializeDefaultPlugins();
            createjs.Sound.alternateExtensions = ["mp3"];
            this.loader = new createjs.LoadQueue(false);
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);
            this.loader.setUseXHR(false);
        }

        // Load Sprites and BitMap Fonts
        public static loadSprites() {
            var imageData =
                {
                    "images": ["assets/images/atlas.png"],
                    "frames": [

                        [506, 2, 150, 100],
                        [455, 2, 21, 38],
                        [373, 46, 55, 33],
                        [2, 2, 369, 81],
                        [506, 104, 150, 100],
                        [588, 206, 22, 13],
                        [430, 46, 22, 13],
                        [478, 2, 20, 5],
                        [658, 2, 150, 100],
                        [810, 2, 150, 100],
                        [2, 85, 250, 166],
                        [254, 85, 250, 166],
                        [373, 2, 80, 42],
                        [506, 206, 80, 42],
                        [658, 104, 150, 100],
                        [810, 104, 150, 100]
                    ],
                    "animations": {

                        "back-button": [0],
                        "collectible": [1],
                        "enemy-ship": [2],
                        "game-over-label": [3],
                        "instructions-button": [4],
                        "laser-down": [5],
                        "laser-up": [6],
                        "laser": [7],
                        "main-menu-button": [8],
                        "select-button": [9],
                        "ship-select-button1": [10],
                        "ship-select-button2": [11],
                        "ship1": [12],
                        "ship2": [13],
                        "start-button": [14],
                        "try-again-button": [15]
                    
                    }//END animations
                }//END image data
           

            // BitMap Font SpriteSheet Data object
            var fontData = {
        
    };
            this.atlas = new createjs.SpriteSheet(imageData);
            this.bitMapFont = new createjs.SpriteSheet(fontData);
           
        }

    }
} 
         