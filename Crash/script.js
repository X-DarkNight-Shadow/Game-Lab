const display_Multiplyer = document.getElementById("CrashDisplay");
const display_Konto = document.getElementById("CrashMoneyDisplay");
const display_Set = document.getElementById("CrashSetMoney");
const display_state = document.getElementById("CrashControllState");

const input_Set = document.getElementById("CrashSetInput");
const button_Set = document.getElementById("crashSetButton");
const button_Controller = document.getElementById("CrashControll");

let konto = 100;
let set = 0;
let Multiplyer = 0;
let controller = false;
let state = "Start";

function maxing() {
    input_Set.max = konto;
}

function setting() {
    const value = Number(input_Set.value);

    if (value > konto || value < 0) {
        input_Set.style.border = "solid 2px red";

        setTimeout(() => {
            input_Set.style.border = "solid 2px black";
        }, 1000);

        return;
    }

    set = value;
}

function Controll() {
    if (set > konto || set < 0) return;

    if (controller) {
        controller = false;
        state = "Start";

        konto += set * Multiplyer;
        Multiplyer = 0;

        return;
    }

    controller = true;
    state = "Stop";

    Game_Loop();
}

function Game_Loop() {
    if (!controller) return;

    if (Math.floor(Math.random() * 1000) === 1) {
        crash();
        return;
    }

    Multiplyer += 0.005;

    requestAnimationFrame(Game_Loop);
}

function crash() {
    konto -= set;

    display_Multiplyer.style.color = "red";
    display_Multiplyer.style.textShadow = "0px 0px 10px red";

    controller = false;
    state = "Crashed";

    setTimeout(() => {
        Multiplyer = 0;

        display_Multiplyer.style.color = "white";
        display_Multiplyer.style.textShadow = "none";

        state = "Start";
    }, 2000);
}

function UpdateScreen() {
    display_Konto.textContent = konto;
    display_Multiplyer.textContent =
        Math.round(Multiplyer * 100) / 100 + "x";
    display_Set.textContent = set;
    display_state.textContent = state;
}

function Main_loop() {
    requestAnimationFrame(Main_loop);

    UpdateScreen();
    maxing();
}

Main_loop();