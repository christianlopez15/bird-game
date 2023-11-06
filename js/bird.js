/// <reference path="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" />

class Bird {
    constructor() {
        this.y = height / 2;
        this.x = 64;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
        this.birdImg = loadImage('assets/bird.png'); // Load the bird image
        this.width = 32; // Set the width of the bird image
        this.height = 32; // Set the height of the bird image
    }

    show() {
        image(this.birdImg, this.x, this.y, this.width, this.height); // Adjust the size as needed
    }

    up() {
        this.velocity += this.lift;
    }

    update() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}
