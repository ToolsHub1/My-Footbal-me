// Variables for game
const canvas = document.getElementById('footballField');
const context = canvas.getContext('2d');

const playerWidth = 50, playerHeight = 50;
const ballRadius = 10;
let player1 = { x: 50, y: 175, width: playerWidth, height: playerHeight, color: 'blue', speed: 5 };
let player2 = { x: 700, y: 175, width: playerWidth, height: playerHeight, color: 'red', speed: 5 };
let ball = { x: 390, y: 190, radius: ballRadius, color: 'white', dx: 2, dy: 2 };

let keys = {};

// Function to draw players
function drawPlayer(player) {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

// Function to draw the ball
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

// Function to move players
function movePlayers() {
    if (keys['ArrowUp'] && player1.y > 0) {
        player1.y -= player1.speed;
    }
    if (keys['ArrowDown'] && player1.y < canvas.height - player1.height) {
        player1.y += player1.speed;
    }
    if (keys['w'] && player2.y > 0) {
        player2.y -= player2.speed;
    }
    if (keys['s'] && player2.y < canvas.height - player2.height) {
        player2.y += player2.speed;
    }
}

// Function to move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce ball off top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Reset ball if it goes off the left or right side
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
    }

    // Check if ball hits players
    if (ball.x - ball.radius < player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height) {
        ball.dx = -ball.dx;
    }
    if (ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + player2.height) {
        ball.dx = -ball.dx;
    }
}

// Function to update the game
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawPlayer(player1);
    drawPlayer(player2);
    drawBall();
    movePlayers();
    moveBall();
    requestAnimationFrame(update); // Loop the game
}

// Event listeners for keyboard input
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start the game
update();
