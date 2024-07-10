import * as e from "express";

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

// Define a Pipe interface
interface Pipe {
  pipePosition: number;
  topPipeHeight: number;
  passed: boolean;
}

var gameOver = false;

const ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 480;

const bird = new Image();
bird.src = './assets/bird.jpg';

const birdX = 50;
let birdY = 150;
const gravity = 1.5;
let velocity = 0;
// Define maximum width and height for the bird
const maxBirdWidth = 40;
const maxBirdHeight = 30;

document.addEventListener('keydown', () => {
  velocity = -15;
});


function drawAxes() {
  // Set the style for the axes
  ctx.strokeStyle = '#000'; // Black color for the axes
  ctx.lineWidth = 1; // Thin lines

  // Draw X axis
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2); // Start at the left middle of the canvas
  ctx.lineTo(canvas.width, canvas.height / 2); // Draw to the right middle of the canvas
  ctx.stroke(); // Apply the stroke to actually draw

  // Draw Y axis
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0); // Start at the top middle of the canvas
  ctx.lineTo(canvas.width / 2, canvas.height); // Draw to the bottom middle of the canvas
  ctx.stroke(); // Apply the stroke to actually draw
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calculate scale factors to maintain aspect ratio
  const scaleFactor = Math.min(maxBirdWidth / bird.width, maxBirdHeight / bird.height);

  // Calculate the scaled width and height
  const scaledWidth = bird.width * scaleFactor;
  const scaledHeight = bird.height * scaleFactor;

  ctx.drawImage(bird, birdX, birdY,scaledWidth, scaledHeight);

  // Display the current birdY value
  ctx.font = '16px Arial'; // Set the font size and family
  ctx.fillStyle = '#000'; // Set the text color
  if(gameOver === true)
  {
    ctx.fillText(`Game over`, 10, 20); // Position the text on the canvas
  }
  else{
    ctx.fillText(`birdY: ${birdY.toFixed(2)}, canvas.height: ${canvas.height}`, 10, 20); // Position the text on the canvas
  }
  velocity += gravity;
  birdY += velocity;

  // Prevent the bird from falling off the bottom of the screen
  if (birdY + bird.height > canvas.height) {
    birdY = canvas.height - bird.height;
    velocity = 0; // Optionally stop the bird's movement or set to a small bounce effect
  }

  // Prevent the bird from going off the top of the screen
  if (birdY < 0) {
    birdY = 0;
    velocity = 0; // Reset velocity when hitting the top
  }


}

bird.onload = draw;


// Declare the pipes array with the Pipe type
let pipes: Pipe[] = [];

// Define pipe properties
const pipeWidth = 50;
const pipeGap = 100;
const pipeInterval = 1500;
const pipeVelocity = 2;

// Initialize game
setInterval(addPipe, pipeInterval);

// Function to add a new pipe
function addPipe() {
  const pipePosition = canvas.width;
  const topPipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap)) + 30; // Random height for the top pipe
  pipes.push({ pipePosition, topPipeHeight, passed: false });
}

// Function to move and draw pipes
function updatePipes() {
  // Move pipes
  pipes.forEach(pipe => {
    pipe.pipePosition -= pipeVelocity;
  });

  // Remove pipes that are no longer visible
  pipes = pipes.filter(pipe => pipe.pipePosition + pipeWidth > 0);

  // Draw pipes
  pipes.forEach(pipe => {
    // Top pipe
    ctx.fillStyle = '#0f0'; // Green color for pipes
    ctx.fillRect(pipe.pipePosition, 0, pipeWidth, pipe.topPipeHeight);
    // Bottom pipe
    const bottomPipeHeight = canvas.height - pipe.topPipeHeight - pipeGap;
    ctx.fillRect(pipe.pipePosition, canvas.height - bottomPipeHeight, pipeWidth, bottomPipeHeight);
  });
}

// Function to handle collision with pipes
function checkCollision() {
  for (let pipe of pipes) {
    if (birdX + maxBirdWidth > pipe.pipePosition && birdX < pipe.pipePosition + pipeWidth) {
      if (birdY < pipe.topPipeHeight || birdY + maxBirdHeight > canvas.height - (canvas.height - pipe.topPipeHeight - pipeGap)) {
        // Collision detected, handle game over
        console.log('Game Over');
        gameOver = true;
      }
    }
  }
}

// Update game function to include pipe logic
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(gameOver === false)
  {
    drawAxes();
    
    // Existing bird drawing logic here
    
    updatePipes();
    checkCollision();
    draw();
  }

  requestAnimationFrame(updateGame);
}

updateGame(); 