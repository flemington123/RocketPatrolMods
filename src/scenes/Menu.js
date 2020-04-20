class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        //sprite
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('smallship', './assets/Smallship.png');
    }

    create() {
        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF69B4',
            color: '#FFF0F5',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.add.text(centerX, centerY- textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use ←→ arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFB6C1';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);  
        

        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(1, 1).setOrigin(0, 0);
        this.ship = new Spaceship(this, 20, 431, 'spaceship', 0, 20).setScale(3, 3).setOrigin(0,0);
        this.smallship = new Smallship(this, game.config.width-20, 431, 'smallship', 0, 50, 4).setOrigin(0,0);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene", this.Highscore);    
        }
        this.starfield.tilePositionX -= 1; 
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}