const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");

let Platforms = {
    Platform1: {
        X: [140,145,150,155,160],
        Y: [100,100,100,100,100]
    }
}

let Game = {
    Gravity: 0.005,
    Air_resistance: 0.999,
    friction: 0.8,
    Platforms: 2
}

let Player = {
    X: 150,
    Y: 0,
    Velocity_X: 0,
    Velocity_Y: 0,
    OnGround: false,
    Platform_spawn_height: 0,
    Death_zone: 0,
}

let camera = {
    x: 0,
    y: 0
};

let STEP = 5;


function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(Player.X, Player.Y, STEP, STEP);

    for (let platfrom in Platforms) {
        for (let i = 0; i < Platforms[platfrom].X.length; i++) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(Platforms[platfrom].X[i], Platforms[platfrom].Y[i], STEP, STEP);
        }
    }
}

function Spawn_Platforms(){
    if (!(Player.Y - 100 < Player.Platform_spawn_height)){
        return;
    }

    let newPlatformX = Math.floor(Math.random() * (canvas.width - STEP * 5) / 6);
    let newPlatformY = Math.floor(Math.random() * (Player.Platform_spawn_height + 100));

    let newPlatformName = "Platform" + Game.Platforms;

    Platforms[newPlatformName] = {
        X: [],
        Y: []
    };

    for (let i = newPlatformX - STEP * 3; i < newPlatformX + STEP * 2; i += STEP){
        Platforms[newPlatformName].X.push(i);
        Platforms[newPlatformName].Y.push(newPlatformY); 
    }

    Game.Platforms++;
}

function UpdateZones(){
    if (Player.Y < Player.Platform_spawn_height){
        Player.Platform_spawn_height = Player.Y;
    }

    if (Player.Y + 100 > Game.Death_zone){
        Game.Death_zone = Player.Y + 100;
    }
}

function UpdateCamera(){
    camera.y = Player.Y - canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    ctx.restore();
}


function Velocity(selection, strength){
    switch(selection){
        case "Update":
            Player.Velocity_X *= Game.Air_resistance;
            Player.X += Player.Velocity_X; 

            Player.Velocity_Y += Game.Gravity;
            Player.Velocity_Y *= Game.Air_resistance;
            Player.Y += Player.Velocity_Y;

            if (Player.X < 0) {
                Player.Velocity_X *= -0.5;
                Player.X = 0;
            } else if (Player.X > 315) {
                Player.Velocity_X *= -0.5;
                Player.X = 315;
            }

            for (let platform in Platforms) {
                for (let i = 0; i < Platforms[platform].X.length; i++) {
                    let platX = Platforms[platform].X[i];
                    let platY = Platforms[platform].Y[i];

                    if (Player.X < platX + STEP &&
                        Player.X + STEP > platX &&
                        Player.Y < platY + STEP &&
                        Player.Y + STEP > platY) {
                        
                        if (Player.Velocity_Y > 0) {
                            Player.Y = platY - STEP; 
                            Player.Velocity_Y = 0;   
                            Player.Velocity_X *= Game.friction;
                            Player.OnGround = true;
                        } 
                    }
                }
            }
            break;
        
        case "X":
            if (Player.OnGround){
                Player.Velocity_X += strength * 3;
            } else {
                Player.Velocity_X += strength;
            }
            break;

        case "Y":
            Player.Velocity_Y = strength; 
            break;
    }
    drawGame();
}



document.addEventListener("keydown", (event) => {
    if (event.key === " " && Player.OnGround) { 
        Velocity("Y", -0.8 );
        Player.OnGround = false;  
    } else if (event.key === "a") {
        Velocity("X", -0.1);
    } else if (event.key === "d") {
        Velocity("X", 0.1);
    } else {
        return;
    }

    drawGame();
});

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr+5, dpr+5);
}

function loop(){
    requestAnimationFrame(loop);

    Velocity("Update", 0);
    UpdateZones();
    UpdateCamera();
}

setInterval(() => {
    Spawn_Platforms();
}, 5000);


resizeCanvas();
drawGame();
Velocity("Update", 0);
Spawn_Platforms();
loop();
UpdateCamera();