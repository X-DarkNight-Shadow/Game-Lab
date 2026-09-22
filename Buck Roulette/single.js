const Health_box = document.getElementById("Health-box");
const NPC_Health_box = document.getElementById("NPC-Health-box");
const Monition_Box = document.getElementById("Wrapper-Move-Monition");
const Item_box = document.getElementById("Item-box");
const NPC_Item_box = document.getElementById("NPC_Item-box");


let Round = 1;
let Monition = 2;
let Health = 4;
let NPC_Health = 4;

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
        document.getElementById(item).textContent = String(Items[item]) + "x";
    }

    for (const npc_item in NPC_Items) {
        document.getElementById(npc_item).textContent = String(NPC_Items[npc_item]) + "x";
    }
}

function GameLoop(){
    requestAnimationFrame(GameLoop);
    UpdateHealth();
    UpdateInventory();
}

GameLoop();






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

