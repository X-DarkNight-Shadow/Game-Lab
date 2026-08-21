var Money = 0;

var locked = true;

var MaterialUnlocked = 0;

var MaterialName = ["Rocks", "Coal", "Copper", "Iron", "Silver", "Gold", "Platinum", "Diamond", "Emerald", "Ruby", "Sapphire", "Mythril", "Ancient_Crystal", "Dragon_Gem", "Void_Crystal"];

var MaterialValue = {
    Rocks: 0,
    Coal: 0,
    Copper: 0,
    Iron: 0,
    Silver: 0,
    Gold: 0,
    Platinum: 0,
    Diamond: 0,
    Emerald: 0,
    Ruby: 0,
    Sapphire: 0,
    Mythril: 0,
    Ancient_Crystal: 0,
    Dragon_Gem: 0,
    Void_Crystal: 0
};

var MaterialChance = {
    Rocks: 90,
    Coal: 70,
    Copper: 50,
    Iron: 40,
    Silver: 30,
    Gold: 10,
    Platinum: 7,
    Diamond: 5,
    Emerald: 3,
    Ruby: 2,
    Sapphire: 1,
    Mythril: 0.08,
    Ancient_Crystal: 0.04,
    Dragon_Gem: 0.009,
    Void_Crystal: 0.001
};

var MaterialPrice = {
    Rocks: 0.001,
    Coal: 0.005,
    Copper: 0.01,
    Iron: 0.04,
    Silver: 0.08,
    Gold: 0.25,
    Platinum: 0.75,
    Diamond: 2.50,
    Emerald: 5,
    Ruby: 10,
    Sapphire: 50,
    Mythril: 150,
    Ancient_Crystal: 500,
    Dragon_Gem: 1000,
    Void_Crystal: 50000
};

var Upgrade = {
    Stamina: 5,
    Luck: 1,
    Efficiency: 1,
    Quality: 1,
    NewMaterial: 0
};

var UpgradePrice = {
    Stamina:     [0.01, 0.08, 0.5, 2, 10, false],
    Luck:        [0.5, 1, 2, 4, 7, 11, 16, 22, 30, 40, 55, 75, 100, 140, 200, false],
    Efficiency:  [0.5, 0.8, 1.5, 3, 5, 8, 12, 18, 26, 36, 50, 70, 95, 130, 150, false],
    Quality:     [0.05, 0.15, 0.4, 1, 2, 4, 7, 11, 16, 22, 30, 42, 58, 80, 100, false],
    NewMaterial: [0.1, 0.5, 1.5, 3, 5, 8, 12, 18, 26, 36, 50, 70, 95, 130, 160, false]
};

var UpgradePriceLevel = {
    Stamina: 0,
    Luck: 0,
    Efficiency: 0,
    Quality: 0,
    NewMaterial: 0
};

var ShopItem = {
    TNT: 0,
    Grenade: 0,
    C4: 0,
    Artillery_Shell: 0,
    Anti_Tank_Guided_Missile: 0,
    Heavy_Tank_Cannon_Round: 0,
    Worker: 0
};

var ShopItemPrice = {
    TNT: 1,
    Grenade: 5,
    C4: 10,
    Artillery_Shell: 50,
    Anti_Tank_Guided_Missile: 100,
    Heavy_Tank_Cannon_Round: 250,
    Worker: 10
};

var ShopItemMax = {
    TNT: 15,
    Grenade: 10,
    C4: 8,
    Artillery_Shell: 5,
    Anti_Tank_Guided_Missile: 2,
    Heavy_Tank_Cannon_Round: 1,
    Worker: 20
};

var Random = 0;

function RandomNumber(max){
    Random = Math.floor(Math.random() * max);
    return Random;
}

function UpdateMoney(){
    document.getElementById("Money").textContent = Math.round(Money * 1000) / 1000 + " €";
}

function UpdateMaterialUI(){
    for (const Material in MaterialValue){
        document.getElementById("Target" + Material).textContent = Material + ": " + MaterialValue[Material];
        document.getElementById("Result" + Material).textContent = "(+" + (MaterialValue[Material] * MaterialPrice[Material] * Upgrade.Quality).toFixed(3) + " €)";
    }
}

function UpdateShopUI(){
    for (const item in ShopItem){
        document.getElementById("ShopAmount" + item).textContent = "(" + ShopItem[item] + "/" + ShopItemMax[item] + ")";
    }
}

function UpdateUpgradeUI(){
    for (const upgrade in UpgradePriceLevel){
        const level = UpgradePriceLevel[upgrade];
        const cost = UpgradePrice[upgrade][level];
        const text = (cost === false) ? "(MAX)" : "(" + cost + "€)";
        document.getElementById("UpgradeCost" + upgrade).textContent = text;
    }
}

function MineOnce(){
    for (let i = 0; i <= MaterialUnlocked; i++) {
        const Material = MaterialName[i];

        const roll = Math.random() * 100;
        const chance = MaterialChance[Material] * Upgrade.Luck;

        if (roll <= chance){
            const amount = Math.max(1, RandomNumber(6 * Upgrade.Efficiency));
            MaterialValue[Material] += amount;
        }
    }

    UpdateMaterialUI();
}

function SwingPickaxe(worker = false){
    MineOnce();

    if (!worker){
        Delay();
    }
}

function SellAll(){
    for (const Material in MaterialValue){
        Money += MaterialValue[Material] * MaterialPrice[Material] * Upgrade.Quality;
        MaterialValue[Material] = 0;
    }

    UpdateMaterialUI();
    UpdateMoney();
}

function BuyUpgrade(upgrade){
    const level = UpgradePriceLevel[upgrade];
    const cost = UpgradePrice[upgrade][level];

    if (cost === false){
        return;
    }

    if (Money < cost){
        return;
    }

    Money -= cost;
    UpgradePriceLevel[upgrade]++;

    switch(upgrade){
        case "Stamina":
            Upgrade.Stamina = Math.max(0, Upgrade.Stamina - 1);
            break;
        case "Luck":
            Upgrade.Luck += 0.1;
            break;
        case "Efficiency":
            Upgrade.Efficiency += 1;
            break;
        case "Quality":
            Upgrade.Quality += 0.25;
            break;
        case "NewMaterial":
            if (MaterialUnlocked < MaterialName.length - 1){
                MaterialUnlocked++;

                const material = MaterialName[MaterialUnlocked];
                const row = document.querySelector("." + material);
                if (row && row.parentElement){
                    row.parentElement.style.display = "flex";
                }
            }
            break;
    }

    UpdateMoney();
    UpdateUpgradeUI();
}

function BuyShopItem(SelectedItem){
    const cost = ShopItemPrice[SelectedItem];

    if (Money < cost){
        return;
    }

    if (ShopItem[SelectedItem] >= ShopItemMax[SelectedItem]){
        return;
    }

    Money -= cost;
    ShopItem[SelectedItem] += 1;

    UpdateMoney();
    UpdateShopUI();
}

function UseShopItem(SelectedItem){
    if (ShopItem[SelectedItem] <= 0){
        return;
    }

    ShopItem[SelectedItem] -= 1;
    UpdateShopUI();

    ActionShopItem(SelectedItem);
}

function ActionShopItem(SelectedItem){
    switch(SelectedItem){
        case "TNT":
            for (let i = 0; i < 25; i++) MineOnce();
            break;
        case "Grenade":
            for (let i = 0; i < 75; i++) MineOnce();
            break;
        case "C4":
            for (let i = 0; i < 150; i++) MineOnce();
            break;
        case "Artillery_Shell":
            for (let i = 0; i < 500; i++) MineOnce();
            break;
        case "Anti_Tank_Guided_Missile":
            for (let i = 0; i < 1000; i++) MineOnce();
            break;
        case "Heavy_Tank_Cannon_Round":
            for (let i = 0; i < 2500; i++) MineOnce();
            break;
    }

    UpdateMaterialUI();
}

function lock() {
    let sellLocked = true;

    for (const check in MaterialValue) {
        if (MaterialValue[check] > 0) {
            sellLocked = false;
            break;
        }
    }

    document.getElementById("SellAll").disabled = sellLocked;

    for (const lockedUpgrade in Upgrade){
        const level = UpgradePriceLevel[lockedUpgrade];
        const cost = UpgradePrice[lockedUpgrade][level];
        const button = document.getElementById("UpgradeButton" + lockedUpgrade);

        if (!button) continue;

        if (cost === false){
            button.disabled = true;
            continue;
        }

        button.disabled = Money < cost;
    }

    for (const lockedItem in ShopItem){
        const buyButton = document.getElementById("ShopButton" + lockedItem);
        const useButton = document.getElementById("ShopButtonUse" + lockedItem);

        if (buyButton){
            buyButton.disabled = Money < ShopItemPrice[lockedItem] || ShopItem[lockedItem] >= ShopItemMax[lockedItem];
        }

        if (useButton){
            useButton.disabled = ShopItem[lockedItem] <= 0;
        }
    }

    requestAnimationFrame(lock);
}

function Delay(){
    document.getElementById("SwingButton").disabled = true;

    setTimeout(() => {
        document.getElementById("SwingButton").disabled = false;
    }, Upgrade.Stamina * 1000);
}

function StartWorkerLoop(){
    setInterval(() => {
        for (let i = 0; i < ShopItem.Worker; i++){
            SwingPickaxe(true);
        }
    }, 5000);
}

function Win(){
    if (Money > 1000000000000000){
        window.location.href = 'Won.html';
    }
    requestAnimationFrame(Win);
}

Win();
lock();
UpdateMoney();
UpdateMaterialUI();
UpdateShopUI();
UpdateUpgradeUI();
StartWorkerLoop();