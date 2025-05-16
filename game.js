// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define some game constants
const ENEMY_SIZE = 50;
const PLAYER_SIZE = 50;
const BULLET_SIZE = 10;
const ENEMY_SPEED = 2;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 10;

// Define the player and enemy objects
let player = {
  x: canvas.width / 2,
  y: canvas.height - PLAYER_SIZE,
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  speed: PLAYER_SPEED
};

let enemies = [];
let bullets = [];

// Define the game loop
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the player
  if (keysDown['ArrowLeft']) {
    player.x -= player.speed;
  }
  if (keysDown['ArrowRight']) {
    player.x += player.speed;
  }

  // Move the enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].x += ENEMY_SPEED;
    if (enemies[i].x > canvas.width) {
      enemies.splice(i, 1);
    }
  }

  // Move the bullets
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= BULLET_SPEED;
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }

  // Check for collisions
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
      if (checkCollision(enemies[i], bullets[j])) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
      }
    }
  }

  // Draw everything
  drawPlayer();
  drawEnemies();
  drawBullets();

  // Request the next frame
  requestAnimationFrame(update);
}

// Define the drawing functions
function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
  ctx.fillStyle = 'ed';
  for (let i = 0; i < enemies.length; i++) {
    ctx.fillRect(enemies[i].x, enemies[i].y, ENEMY_SIZE, ENEMY_SIZE);
  }
}

function drawBullets() {
  ctx.fillStyle = 'black';
  for (let i = 0; i < bullets.length; i++) {
    ctx.fillRect(bullets[i].x, bullets[i].y, BULLET_SIZE, BULLET_SIZE);
  }
}

// Define the collision detection function
function checkCollision(obj1, obj2) {
  if (obj1.x + ENEMY_SIZE > obj2.x && obj1.x < obj2.x + BULLET_SIZE && obj1.y + ENEMY_SIZE > obj2.y && obj1.y < obj2.y + BULLET_SIZE) {
    return true;
  }
  return false;
}

// Define the key press handler
let keysDown = {};
document.addEventListener('keydown', function(event) {
  keysDown[event.key] = true;
  if (event.key === ') {
    // Shoot a bullet
    bullets.push({
      x: player.x + player.width / 2,
      y: player.y
    });
  }
});

document.addEventListener('keyup', function(event) {
  keysDown[event.key] = false;
});

// Start the game loop
update();

// Add some enemies to the game
setInterval(function() {
  enemies.push({
    x: 0,
    y: Math.random() * (canvas.height - ENEMY_SIZE)
  });
}, 1000);
