/// <reference path="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" />

class Pipe {
    constructor() {
        this.top = random(height / 2);
        this.bottom = random(height / 2);
        this.x = width;
        this.w = 20;
        this.speed = 2;
    }

    show() {
        fill(16, 110, 34);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        // Calculate bird position and hitbox boundaries
        let birdRight = bird.x + bird.width;
        let birdBottom = bird.y + bird.height;

        // Check for collision with the top pipe
        if (bird.x + bird.width > this.x && bird.x < this.x + this.w) {
            if (bird.y < this.top || birdBottom > height - this.bottom) {
                return true;
            }
        }

        return false;
    }
}
