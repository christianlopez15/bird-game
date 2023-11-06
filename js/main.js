/// <reference path="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" />

let bird;
let pipes = [];
let gameStarted = false;
let gameOver = false;
let startTime;
let elapsedTime = 0;
let bestTime = 0;

function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    pipes.push(new Pipe());
    resetGame(); // Initialize game state
}

function draw() {
    if (gameStarted && !gameOver) {
        background(79, 171, 227); // Background color

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();

            if (pipes[i].hits(bird)) {
                console.log("Game over!");
                gameOver = true;
                elapsedTime = millis() - startTime; // Record elapsed time on collision
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        bird.update();
        bird.show();

        if (frameCount % 100 == 0) {
            pipes.push(new Pipe());
        }

        if (startTime === 0) {
            startTime = millis(); // Set the start time on game start
        }
        elapsedTime = millis() - startTime;

        textSize(24);
        fill(0); // Text color
        text("Time: " + (elapsedTime / 1000).toFixed(2) + " seconds", 120, 30);
    } else if (!gameStarted) {
        // Start screen or instructions
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Press SPACE to start", width / 2, height / 2);
    } else if (gameOver) {
        // Game over screen
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Time: " + (elapsedTime / 1000).toFixed(2) + " seconds", width / 2, height / 2);

        if (elapsedTime > bestTime) {
            bestTime = elapsedTime;
        }

        text("Best Time: " + (bestTime / 1000).toFixed(2) + " seconds", width / 2, height / 2 + 50);
        text("Press SPACE to play again", width / 2, height / 2 + 100);
    }
}

function keyPressed() {
    if (!gameStarted || gameOver) {
        if (key === " ") {
            resetGame(); // Reset the game on spacebar press
        }
    } else if (!gameOver) {
        if (key === " ") {
            bird.up();
        }
    }

    if (!gameStarted) {
        if (key === " ") {
            gameStarted = true; // Start the game on spacebar press
            startTime = millis(); // Start the timer
        }
    }
}

function resetGame() {
    bird = new Bird(); // Reset bird's position
    pipes = []; // Clear pipes
    gameStarted = false; // Reset game state
    gameOver = false;
    startTime = 0;
    elapsedTime = 0;
}