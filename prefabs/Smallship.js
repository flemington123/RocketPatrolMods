class Smallship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, Speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
        // store pointValue
        this.points = pointValue;   
        this.speed  = Speed
    }

    update() {
        // move spaceship left
        this.x -= this.speed;
        // wraparound from left to right edge
        if (this.x <= 0-this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}