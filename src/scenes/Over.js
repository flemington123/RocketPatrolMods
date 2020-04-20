class Over extends Phaser.Scene {
    constructor() {
        super("overScene");
    }
    create() {
        // Overmenu display setting
        let overConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show Overmenu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        
        const bestScore = localStorage.getItem('bestScore');
        this.add.text(centerX, centerY- textSpacer, 'GAME OVER', overConfig).setOrigin(0.5);
        overConfig.backgroundColor = '#00FF00';
        overConfig.color = '#000';
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
                gameTimer: 6000    
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