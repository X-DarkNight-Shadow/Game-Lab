const Monition_Box = document.getElementById("Wrapper-Move-Monition");
const Item_box = document.getElementById("Item-box");
const NPC_Item_box = document.getElementById("NPC_Item-box");
const Titel = document.getElementById("Title");
const Shoot_NPC_button = document.getElementById("Shoot-NPC");
const Shoot_Self_button = document.getElementById("Shoot-Self");
const Health_box = document.getElementById("Health-box");
const NPC_Health_box = document.getElementById("NPC-Health-box");

const Item_list = ["Lupe","Zigaretten","Bier","Handschellen","Säge"];


let Round = 0;
let Turn = true;
let Damage = 1;

let Health = 4;
let NPC_Health = 4;

let Blocked = 0;
let NPC_Blocked = 0;

let Items = {
    Lupe: 0,
    Zigaretten: 0,
    Bier: 0,
    Handschellen: 0,
    Säge: 0
}

let NPC_Items = {
    Lupe: 0,
    Zigaretten: 0,
    Bier: 0,
    Handschellen: 0,
    Säge: 0
}

let Bot = 50;

let Monition = 1;
let Monition_order = [];




// Logical Functions

function RN(rn){
    return Math.floor(Math.random() * rn);
}




// Update Objects

function UpdateHealth(){
    for (let i = 1; i < 5; i++){
        document.getElementById("Heart" + i).style.display = "none";
    }

    for (let i = 1; i < Health + 1; i++){
        document.getElementById("Heart" + i).style.display = "block";
    }

    for (let i = 1; i < 5; i++){
        document.getElementById("NPC-Heart" + i).style.display = "none";
    }

    for (let i = 1; i < NPC_Health + 1; i++){
        document.getElementById("NPC-Heart" + i).style.display = "block";
    }
}

function UpdateInventory(){
    for (const item in Items) {
        document.getElementById(item).textContent = Items[item] + "x";
        
        if (Items[item] > 0){
            document.getElementById("Button-" + item).disabled = false;
        } else {
            document.getElementById("Button-" + item).disabled = true;
        }

        if (item == "Zigaretten" && Health >= 4){
            document.getElementById("Button-" + item).disabled = true;
        }
    }

    for (const npc_item in NPC_Items) {
        document.getElementById("NPC-" + npc_item).textContent = NPC_Items[npc_item] + "x";
    }
}

function UpdateRound(){
    Titel.textContent = "Round " + Round;
}




// New Objects

function New_Monition(){
    Monition_order = [];

    for (let i = 0; i < Monition; i++) {
        Monition_order.push(RN(2) === 0);
    }

    let count_t = Monition_order.filter(item => item === true).length;
    let count_f = Monition_order.filter(item => item === false).length;

    for (let i = 1; i <= 10; i++) {
        let element = document.getElementById("Monition" + i);

        if (Monition < i) {
            element.classList.add("n");
            element.classList.remove("Monition", "Platzpatrone");
            continue;
        }

        if (i <= count_t) {
            element.classList.add("Monition");
            element.classList.remove("Platzpatrone", "n");
        } 
        else if (i <= count_t + count_f) {
            element.classList.add("Platzpatrone");
            element.classList.remove("Monition", "n");
        }
    }

    Monition_Box.classList.add("t");
    Monition_Box.classList.remove("f");
    setTimeout(() => {
        Monition_Box.classList.add("f");
        Monition_Box.classList.remove("t");
    }, 5000);
}

Shoot_NPC_button.onclick = function(){
    if (Monition_order[0]){
        NPC_Health -= Damage;

        NPC_Health_box.classList.add("t");
        setTimeout(() => {
            NPC_Health_box.classList.remove("t");
        }, 2000);
    }
    
    Update_Bot("Values", Monition_order[0]);

    Damage = 1;
    Monition_order.shift();

    if (NPC_Blocked == 0){
        Turn = !Turn;
        Bot_play_Round()
    } else {
        NPC_Blocked--;
    }

    Update_Bot("Monition", false);
}

Shoot_Self_button.onclick = function(){
    if (Monition_order[0]){
        Health -= Damage;

        Health_box.classList.add("t");
        setTimeout(() => {
            Health_box.classList.remove("t");
        }, 2000);
    }
    
    Update_Bot("Values", Monition_order[0]);

    Damage = 1;
    Monition_order.shift();

    if (NPC_Blocked != 0){
        NPC_Blocked--;
    }

    Update_Bot("Monition", false);
}

function New_Round(){
    Round++;

    Monition = Math.min(10, Monition * 2);
    New_Monition();

    if (Round == 1) return;

    for (let i = 0; i < Round; i++){
        switch(Item_list[RN(Item_list.length)]){
            case "Lupe":
                Items.Lupe++;
                break;
            case "Zigaretten":
                Items.Zigaretten++;
                break;
            case "Bier":
                Items.Bier++;
                break;
            case "Handschellen":
                Items.Handschellen++;
                break;
            case "Säge":
                Items.Säge++;
                break;
        }
    }

    Item_box.classList.add("t");
    setTimeout(() => {
        Item_box.classList.remove("t");
    }, 2000);

    for (let i = 0; i < Round; i++){
        switch(Item_list[RN(Item_list.length)]){
            case "Lupe":
                NPC_Items.Lupe++;
                break;
            case "Zigaretten":
                NPC_Items.Zigaretten++;
                break;
            case "Bier":
                NPC_Items.Bier++;
                break;
            case "Handschellen":
                NPC_Items.Handschellen++;
                break;
            case "Säge":
                NPC_Items.Säge++;
                break;
        }
    }

    Update_Bot("NewRound", false)
}




// Bot

function Bot_play_Round(){
    Update_Bot("Items", false);

    setTimeout(() => {
        if (RN(100) < Bot){
            Bot_shoot_player();
        } else {
            Bot_shoot_self();
        }
    }, 1000);
}

function Update_Bot(mode, z){
    let count_t = Monition_order.filter(item => item === true).length;
    let count_f = Monition_order.filter(item => item === false).length;
    let diffrence = count_t - count_f;

    switch(mode){
        case "Values":
            if (z === true){
                Bot = Math.max(0, Bot - 10);
            } else {
                Bot = Math.min(100, Bot + 10);
            }
            break;

        case "Monition":
            if (diffrence > 0){
                Bot = Math.min(100, Bot + diffrence * 10 / Math.round(Monition_order.length));
            } else {
                Bot = Math.max(0, Bot + diffrence * 10 / Math.round(Monition_order.length));
            }
            break;

        case "NewRound":
            Bot = 50;
            
            if (diffrence === 0) return;

            if (diffrence > 0){
                Bot = Math.min(100, Bot + diffrence * 10);
            } else {
                Bot = Math.max(0, Bot + diffrence * 10);
            }
            break;
        
        case "Items":
            for (const npc_item in NPC_Items) {
                if (NPC_Items[npc_item] > 0){
                    switch(npc_item){
                        case "Lupe":
                            if (NPC_Lupe()){
                                for (let i = 0; i < NPC_Items.Säge; i++) NPC_Säge();
                                Bot = 0;
                            } else {
                                Bot = 100;
                            }
                            break;
                        
                        case "Zigaretten":
                            if (NPC_Health < 4) for (let i = 0; i < NPC_Items.Zigaretten; i++) NPC_Zigaretten();
                            break;
                        
                        case "Handschellen":
                            if (RN(2) == 0) NPC_Handschellen();
                            break;
                        
                        case "Säge":
                            if (RN(2) == 0) NPC_Säge();
                            break;

                        case "Bier":
                            if (RN(2) == 0) Update_Bot("Values", NPC_Bier());
                            break;
                    }
                }
            }
            break;
    }
}

function Bot_shoot_self(){
    if (Monition_order[0]){
        NPC_Health -= Damage;

        NPC_Health_box.classList.add("t");
        setTimeout(() => {
            NPC_Health_box.classList.remove("t");
        }, 2000);
    }

    Update_Bot("Values", Monition_order[0]);

    Damage = 1;
    Monition_order.shift();

    if (Blocked != 0){
        Blocked--;
    }

    Bot_play_Round();
    Update_Bot("Monition", false);
}

function Bot_shoot_player(){
    if (Monition_order[0]){
        Health -= Damage;

        Health_box.classList.add("t");
        setTimeout(() => {
            Health_box.classList.remove("t");
        }, 2000);
    }

    Update_Bot("Values", Monition_order[0]);

    Damage = 1;
    Monition_order.shift();

    if (Blocked == 0){
        Turn = !Turn;
    } else {
        Blocked--;
        Bot_play_Round();
    }

    Update_Bot("Monition", false);
}




// Items

function Lupe(){
    for (let i = 1; i <= 10; i++) {
        let element = document.getElementById("Monition" + i);

        element.classList.add("n");
        element.classList.remove("Monition", "Platzpatrone");
    }

    if (Monition_order[0]){
        document.getElementById("Monition1").classList.add("Monition");
        document.getElementById("Monition1").classList.remove("Platzpatrone", "n");
    } else {
        document.getElementById("Monition1").classList.add("Platzpatrone");
        document.getElementById("Monition1").classList.remove("Monition", "n");
    }
    

    Monition_Box.classList.add("t");
    Monition_Box.classList.remove("f");
    setTimeout(() => {
        Monition_Box.classList.add("f");
        Monition_Box.classList.remove("t");
    }, 5000);

    Items.Lupe--;
}

function Zigaretten(){
    Health++;
    Items.Zigaretten--;

    Health_box.classList.add("t");
    setTimeout(() => {
        Health_box.classList.remove("t");
    }, 5000);
}

function Bier(){
    for (let i = 1; i <= 10; i++) {
        let element = document.getElementById("Monition" + i);

        element.classList.add("n");
        element.classList.remove("Monition", "Platzpatrone");
    }

    if (Monition_order[0]){
        document.getElementById("Monition1").classList.add("Monition");
        document.getElementById("Monition1").classList.remove("Platzpatrone", "n");
    } else {
        document.getElementById("Monition1").classList.add("Platzpatrone");
        document.getElementById("Monition1").classList.remove("Monition", "n");
    }

    Monition_Box.classList.add("t");
    Monition_Box.classList.remove("f");
    setTimeout(() => {
        Monition_Box.classList.add("f");
        Monition_Box.classList.remove("t");
    }, 5000);

    Items.Bier--;
    Monition_order.shift();

    if (Monition_order.length > 0) {
        Update_Bot("Monition", false);
    }
}

function Handschellen(){
    NPC_Blocked++;
    Items.Handschellen--;
}

function Säge(){
    Damage++;
    Items.Säge--;
}




//NPC Items
function NPC_Lupe(){
    NPC_Items.Lupe--;
    return (Monition_order[0]);
}

function NPC_Zigaretten(){
    NPC_Health++;
    NPC_Items.Zigaretten--;

    NPC_Health_box.classList.add("t");
    setTimeout(() => {
        NPC_Health_box.classList.remove("t");
    }, 5000);
}

function NPC_Bier(){
    for (let i = 1; i <= 10; i++) {
        let element = document.getElementById("Monition" + i);

        element.classList.add("n");
        element.classList.remove("Monition", "Platzpatrone");
    }

    if (Monition_order[0]){
        document.getElementById("Monition1").classList.add("Monition");
        document.getElementById("Monition1").classList.remove("Platzpatrone", "n");
    } else {
        document.getElementById("Monition1").classList.add("Platzpatrone");
        document.getElementById("Monition1").classList.remove("Monition", "n");
    }

    Monition_Box.classList.add("t");
    Monition_Box.classList.remove("f");
    setTimeout(() => {
        Monition_Box.classList.add("f");
        Monition_Box.classList.remove("t");
    }, 5000);

    NPC_Items.Bier--;
    
    setTimeout(() => {
        Monition_order.shift();
    }, 1000)
    return (Monition_order[0]);
}

function NPC_Handschellen(){
    Blocked++;
    NPC_Items.Handschellen--;
}

function NPC_Säge(){
    Damage++;
    NPC_Items.Säge--;
}




// Game Loops

function GameLoop(){
    requestAnimationFrame(GameLoop);

    if (Health <= 0) window.location.replace("Lose.html");
    if (NPC_Health <= 0) window.location.replace("Win.html");

    if (Monition_order.length === 0) New_Round();

    if (Turn){
        Shoot_NPC_button.disabled = false;
        Shoot_Self_button.disabled = false;
    } else {
        Shoot_NPC_button.disabled = true;
        Shoot_Self_button.disabled = true;
    }
}

function UpdateGameLoop(){
    requestAnimationFrame(UpdateGameLoop);
    UpdateHealth();
    UpdateInventory();
    UpdateRound();
}

GameLoop();
UpdateGameLoop();





//Heart Animation

setInterval(() => {
        setTimeout(() => {
            document.getElementById("Heart1").classList.add("beat");
            document.getElementById("Heart4").classList.remove("beat");
        }, 1000);

        setTimeout(() => {
            document.getElementById("Heart2").classList.add("beat");
            document.getElementById("Heart1").classList.remove("beat");
        }, 2000);

        setTimeout(() => {
            document.getElementById("Heart3").classList.add("beat");
            document.getElementById("Heart2").classList.remove("beat");
        }, 3000);

        setTimeout(() => {
            document.getElementById("Heart4").classList.add("beat");
            document.getElementById("Heart3").classList.remove("beat");
        }, 4000);
    }, 4000);

    setInterval(() => {
        setTimeout(() => {
            document.getElementById("NPC-Heart1").classList.add("beat");
            document.getElementById("NPC-Heart4").classList.remove("beat");
        }, 1000);

        setTimeout(() => {
            document.getElementById("NPC-Heart2").classList.add("beat");
            document.getElementById("NPC-Heart1").classList.remove("beat");
        }, 2000);

        setTimeout(() => {
            document.getElementById("NPC-Heart3").classList.add("beat");
            document.getElementById("NPC-Heart2").classList.remove("beat");
        }, 3000);

        setTimeout(() => {
            document.getElementById("NPC-Heart4").classList.add("beat");
            document.getElementById("NPC-Heart3").classList.remove("beat");
        }, 4000);
    }, 4000);