const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");

let Platforms = {
    Platform1: {
        X: [140, 145, 150, 155, 160],
        Y: [100, 100, 100, 100, 100]
    }
};

let Game = {
    Gravity: 0.005,
    Air_resistance: 0.999,
    friction: 0.8,
    Platforms: 2,
    Score: 0,
    BestScore: 0
};

let Player = {
    X: 150,
    Y: 95,
    Velocity_X: 0,
    Velocity_Y: 0,
    OnGround: false,
    Platform_spawn_height: 100,
    Death_zone: 250
};

let camera = {
    x: 0,
    y: 0
};

let Keys = {
    a: false,
    d: false
};

let STEP = 5;

const SpawnPoint = {
    X: 150,
    Y: 95
};

function resizeCanvas() {
    canvas.width = 320;
    canvas.height = 240;

    ctx.imageSmoothingEnabled = false;
}

function drawGame() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let playerScreenY = Player.Y - camera.y;

    if (playerScreenY < 80) {
        camera.y = Math.floor(Player.Y - 80);
    }

    if (playerScreenY > 160) {
        camera.y = Math.floor(Player.Y - 160);
    }

    camera.x = 0;

    ctx.save();

    ctx.translate(
        Math.floor(-camera.x),
        Math.floor(-camera.y)
    );

    ctx.fillStyle = "blue";

    ctx.fillRect(
        Math.floor(Player.X),
        Math.floor(Player.Y),
        STEP,
        STEP
    );

    for (let platform in Platforms) {
        for (let i = 0; i < Platforms[platform].X.length; i++) {
            ctx.fillStyle = "yellow";

            ctx.fillRect(
                Math.floor(Platforms[platform].X[i]),
                Math.floor(Platforms[platform].Y[i]),
                STEP,
                STEP
            );
        }
    }

    ctx.restore();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = "white";
    ctx.font = "8px monospace";

    ctx.fillText(
        "Height: " + Game.Score,
        6,
        12
    );

    ctx.fillText(
        "Best: " + Game.BestScore,
        6,
        22
    );
}

function Spawn_Platforms() {
    if (Player.Y - 80 > Player.Platform_spawn_height) {
        return;
    }

    let newPlatformX = Math.floor(
        Math.random() * (canvas.width - STEP * 5)
    );

    let newPlatformY =
        Player.Platform_spawn_height - 30;

    let newPlatformName = "Platform" + Game.Platforms;

    Platforms[newPlatformName] = {
        X: [],
        Y: []
    };

    for (
        let i = newPlatformX;
        i < newPlatformX + STEP * 5;
        i += STEP
    ) {
        Platforms[newPlatformName].X.push(i);
        Platforms[newPlatformName].Y.push(newPlatformY);
    }

    Player.Platform_spawn_height = newPlatformY;

    Game.Platforms++;
}

function UpdateScore() {
    let height = Math.max(
        0,
        Math.floor((100 - Player.Y) / 10)
    );

    if (height > Game.Score) {
        Game.Score = height;
    }

    if (Game.Score > Game.BestScore) {
        Game.BestScore = Game.Score;
    }
}

function Respawn() {
    Player.X = SpawnPoint.X;
    Player.Y = SpawnPoint.Y;

    Player.Velocity_X = 0;
    Player.Velocity_Y = 0;

    Player.OnGround = false;

    Player.Platform_spawn_height = 100;
    Player.Death_zone = 250;

    Game.Score = 0;

    camera.x = 0;
    camera.y = 0;

    Platforms = {
        Platform1: {
            X: [140, 145, 150, 155, 160],
            Y: [100, 100, 100, 100, 100]
        }
    };

    Game.Platforms = 2;
}

function UpdateZones() {
    if (Player.Y < Player.Platform_spawn_height) {
        Player.Platform_spawn_height = Player.Y;
    }

    Player.Death_zone = SpawnPoint.Y + 150;
}

function UpdatePlayer() {
    if (Keys.a) {
        if (Player.OnGround) {
            Player.Velocity_X -= 0.015;
        } else {
            Player.Velocity_X -= 0.005;
        }
    }

    if (Keys.d) {
        if (Player.OnGround) {
            Player.Velocity_X += 0.015;
        } else {
            Player.Velocity_X += 0.005;
        }
    }

    Player.Velocity_X *= Game.Air_resistance;
    Player.X += Player.Velocity_X;

    Player.Velocity_Y += Game.Gravity;
    Player.Velocity_Y *= Game.Air_resistance;
    Player.Y += Player.Velocity_Y;

    if (Player.X < 0) {
        Player.X = 0;
        Player.Velocity_X *= -0.5;
    }

    if (Player.X > canvas.width - STEP) {
        Player.X = canvas.width - STEP;
        Player.Velocity_X *= -0.5;
    }

    Player.OnGround = false;

    for (let platform in Platforms) {
        for (let i = 0; i < Platforms[platform].X.length; i++) {
            let platX = Platforms[platform].X[i];
            let platY = Platforms[platform].Y[i];

            if (
                Player.X < platX + STEP &&
                Player.X + STEP > platX &&
                Player.Y < platY + STEP &&
                Player.Y + STEP > platY
            ) {
                if (Player.Velocity_Y > 0) {
                    Player.Y = platY - STEP;
                    Player.Velocity_Y = 0;
                    Player.Velocity_X *= Game.friction;
                    Player.OnGround = true;
                }
            }
        }
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "a") {
        Keys.a = true;
    }

    if (event.key === "d") {
        Keys.d = true;
    }

    if (event.key === " " && Player.OnGround) {
        Player.Velocity_Y = -0.8;
        Player.OnGround = false;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "a") {
        Keys.a = false;
    }

    if (event.key === "d") {
        Keys.d = false;
    }
});

function loop() {
    requestAnimationFrame(loop);

    UpdatePlayer();
    UpdateZones();
    UpdateScore();

    if (Player.Y > Player.Death_zone) {
        Respawn();
    }

    Spawn_Platforms();
    drawGame();
}

resizeCanvas();
drawGame();
loop();