class Over extends Phaser.Scene {
    constructor() {
        super("overScene");
    }
    preload(){
        this.load.image('starfield', './assets/starfield.png');
    }
    create() {
        // Overmenu display setting
        let overConfig = {
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

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // show Overmenu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        
        const bestScore = localStorage.getItem('bestScore');
        this.add.text(centerX, centerY- textSpacer, 'GAME OVER', overConfig).setOrigin(0.5);
        overConfig.backgroundColor = '#FFB6C1';
        overConfig.color = '#FFF0F5';
        this.add.text(centerX, centerY + textSpacer, 'Try Again', overConfig).setOrigin(0.5);  
        this.add.text(centerX, centerY + textSpacer + 40, 'Press ← for Easy or → for Hard', overConfig).setOrigin(0.5); 
       

        // BestScore display
        this.add.text(0, 54, 'Your Best Score is ' + bestScore, overConfig);
        
        
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
            this.scene.start("playScene");    
        }
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