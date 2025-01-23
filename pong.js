// Seleccionamos el canvas y el contexto para dibujar
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Definimos las características de la paleta y la pelota
const paddleWidth = 10, paddleHeight = 100;
let leftPaddle = { x: 10, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
let rightPaddle = { x: canvas.width - paddleWidth - 10, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speedX: 5, speedY: 5 };

// Control de teclas
const UP_ARROW = 38, DOWN_ARROW = 40, W_KEY = 87, S_KEY = 83;

// Agregar los eventos para las teclas
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.keyCode === UP_ARROW) {
        rightPaddle.dy = -5;
    } else if (e.keyCode === DOWN_ARROW) {
        rightPaddle.dy = 5;
    } else if (e.keyCode === W_KEY) {
        leftPaddle.dy = -5;
    } else if (e.keyCode === S_KEY) {
        leftPaddle.dy = 5;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === UP_ARROW || e.keyCode === DOWN_ARROW) {
        rightPaddle.dy = 0;
    }
    if (e.keyCode === W_KEY || e.keyCode === S_KEY) {
        leftPaddle.dy = 0;
    }
}

// Función para dibujar la paleta
function drawPaddle(paddle) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Función para dibujar la pelota
function drawBall() {
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

// Función para mover las paletas
function movePaddles() {
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Limitar el movimiento de las paletas dentro del canvas
    if (leftPaddle.y < 0) leftPaddle.y = 0;
    if (leftPaddle.y + leftPaddle.height > canvas.height) leftPaddle.y = canvas.height - leftPaddle.height;

    if (rightPaddle.y < 0) rightPaddle.y = 0;
    if (rightPaddle.y + rightPaddle.height > canvas.height) rightPaddle.y = canvas.height - rightPaddle.height;
}

// Función para mover la pelota
function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebote de la pelota en el techo y el suelo
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY = -ball.speedY;
    }

    // Rebote con las paletas
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.speedX = -ball.speedX;
    }
    if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.speedX = -ball.speedX;
    }

    // Si la pelota pasa por los lados (fuera de la pantalla)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        resetBall();
    }
}

// Función para reiniciar la pelota al centro
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX;
    ball.speedY = 5;
}

// Función de actualización que se llama repetidamente para dibujar y mover
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    movePaddles(); // Mover las paletas
    moveBall();    // Mover la pelota

    drawPaddle(leftPaddle);  // Dibujar paleta izquierda
    drawPaddle(rightPaddle); // Dibujar paleta derecha
    drawBall();              // Dibujar pelota

    requestAnimationFrame(update); // Llamar a la función update para el siguiente frame
}

// Iniciar el juego
update();
