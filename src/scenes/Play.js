class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
   
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('smallship', './assets/Smallship.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFB6C1).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFB6C1).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFB6C1).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFB6C1).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 37, 566, 64, 0xFF69B4).setOrigin(0, 0);
        //four corner
        this.add.rectangle(0, 0, 48, 48, 0x00FF7F).setOrigin(0, 0);
        this.add.rectangle(592, 0, 48, 48, 0x00FF7F).setOrigin(0, 0);
        this.add.rectangle(0, 435, 48, 48, 0x00FF7F).setOrigin(0, 0);
        this.add.rectangle(592, 435, 48, 48, 0x00FF7F).setOrigin(0, 0);
       
       
        

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(1, 1).setOrigin(0, 0);

        // add spaceships 
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setScale(3, 3).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setScale(3, 3).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setScale(3, 3).setOrigin(0,0);
        this.smallship = new Smallship(this, game.config.width, 170, 'smallship', 0, 50, 1).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // player 1 score
        this.p1Score = 0;
        

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F0FFFF',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        const bestScore = localStorage.getItem('bestScore');
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.add.text(450, 54, 'B: ' + bestScore, scoreConfig);

        //Fire
        this.add.text(250, 54, 'Fire', scoreConfig);
        //this.Timer = 0;
        //this.timeTracker = this.add.text(69, 88, this.clock, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
        /*var timer = scene.time.addEvent({
            delay: 500,                // ms
            callback: callback,
            //args: [],
            callbackScope: this,
            loop: true
        });
        */
    }

    update() {
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            const bestScore = localStorage.getItem('bestScore');
            if (!bestScore || bestScore < this.p1Score) {
                localStorage.setItem('bestScore', this.p1Score);
            }
            this.scene.start("overScene");
        }

        this.starfield.tilePositionX -= 1;  // scroll tile sprite
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.smallship.update();
            //this.timeTracker.update();
        }             
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.smallship)) {
            this.p1Rocket.reset();
            this.shipExplode(this.smallship);
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width*3 && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setScale(1, 1).setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;     
        // play sound
        this.sound.play('sfx_explosion');  
    }
}