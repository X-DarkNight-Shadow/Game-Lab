const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");

let Player = {
    X: 100,
    Y: 70,
    Recall_X: [],
    Recall_Y: [],
    direction: "right"
}

let Apple = {
    X: 190,
    Y: 70
}

let STEP = 10;

let restarting = false;

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const position in Player.Recall_X){
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(Player.Recall_X[position], Player.Recall_Y[position], STEP, STEP);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(Apple.X, Apple.Y, STEP, STEP);

    ctx.fillStyle = "green";
    ctx.fillRect(Player.X, Player.Y, STEP, STEP);
}

function New_Apple_Position() {
    Apple.X = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    Apple.Y = Math.floor(Math.random() * (canvas.height / 10)) * 10;

    const overlap = Player.Recall_X.some((x, index) => {
        return x === Apple.X && Player.Recall_Y[index] === Apple.Y;
    });

    if (overlap) {
        New_Apple_Position();
    }
}


function Save_Cords(){
    Player.Recall_X.push(Player.X);
    Player.Recall_Y.push(Player.Y);
}

function Check_Move(x, y) {
    for (let i = 0; i < Player.Recall_X.length - 1; i++) {
        if (x === Player.Recall_X[i] && y === Player.Recall_Y[i]) {
            return false;
        }
    }

    if (Player.Y + STEP > 0 && Player.Y - STEP < 140 && Player.X + STEP > 0 && Player.X - STEP < 290){
        return true;
    }

    return false;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "w") {
        Player.direction = "up";
    } else if (event.key === "s") {
        Player.direction = "down";
    } else if (event.key === "a") {
        Player.direction = "left";
    } else if (event.key === "d") {
        Player.direction = "right";
    } else {
        return;
    }
});

function loop(){
    let newX = Player.X;
    let newY = Player.Y;

    if (Player.direction === "up") {
        newY -= STEP;
    } else if (Player.direction === "down") {
        newY += STEP;
    } else if (Player.direction === "left") {
        newX -= STEP;
    } else if (Player.direction === "right") {
        newX += STEP;
    } else {
        return;
    }

    if (!Check_Move(newX, newY)) {
        if (!restarting) window.alert("Game Over");
        restarting = true;
        window.location.reload("index.html")
        return;
    }

    if (Player.Recall_X.length === 450){
        window.alert("You WON!");
        window.location.reload("index.html");
        return;
    }

    Player.X = newX;
    Player.Y = newY;

    Save_Cords();

    if (Player.X === Apple.X && Player.Y === Apple.Y) {
        New_Apple_Position();
    } else {
        Player.Recall_X.shift();
        Player.Recall_Y.shift();
    }
}

setInterval(() => {
    drawGame();
    loop();
}, 100);

drawGame();
Save_Cords();


/*
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 100, 80);


ctx.beginPath();
ctx.arc(150, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();

ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Hello!", 50, 200);


ctx.clearRect(0, 0, canvas.width, canvas.height);


Example:

// Background
ctx.fillStyle = "lightgray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Blue square
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 100, 100);

// Red circle
ctx.beginPath();
ctx.arc(250, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();

// Text
ctx.fillStyle = "black";
ctx.font = "24px Arial";
ctx.fillText("Canvas!", 120, 250);

*/