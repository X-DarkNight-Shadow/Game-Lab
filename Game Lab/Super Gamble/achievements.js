var Achievements = 0;
var Lucky = 0;

function achievements(){
    if (Achievements===0){
        document.getElementById("Achievements").style = "Display: solid;";
        Achievements = 1;
        document.getElementById("AchievementsToggle").innerHTML = "Achievements: On";
    } else {
        document.getElementById("Achievements").style = "Display: none;";
        Achievements = 0;
        document.getElementById("AchievementsToggle").innerHTML = "Achievements: Off";
    }
}

function achievement_check(){
    if (firstBet = true){
        document.getElementById("1").classList.remove("locked");
        document.getElementById("1").classList.add("unlocked");
        document.getElementById("Input1").checked = true;
    }

    if (winInARow >= 10){
        document.getElementById("2").classList.remove("locked");
        document.getElementById("2").classList.add("unlocked");
        document.getElementById("Input2").checked = true;
    }

    if (winInARow >= 15){
        document.getElementById("3").classList.remove("locked");
        document.getElementById("3").classList.add("unlocked");
        document.getElementById("Input3").checked = true;
    }
    
    if (Konto >= 100000){
        document.getElementById("4").classList.remove("locked");
        document.getElementById("4").classList.add("unlocked");
        document.getElementById("Input4").checked = true;
    }

    if (Konto === 0){
        document.getElementById("5").classList.remove("locked");
        document.getElementById("5").classList.add("unlocked");
        document.getElementById("Input5").checked = true;
    }

    if (Konto >= 1000000){
        document.getElementById("6").classList.remove("locked");
        document.getElementById("6").classList.add("unlocked");
        document.getElementById("Input6").checked = true;
    }

    if (Konto === lastGamble * 2 && aos === 1){
        document.getElementById("7").classList.remove("locked");
        document.getElementById("7").classList.add("unlocked");
        document.getElementById("Input7").checked = true;
    }

    if (10 >= Konto){
        Lucky = 1;
    }

    if (Konto >= 100 && Lucky === 1){
            document.getElementById("8").classList.remove("locked");
            document.getElementById("8").classList.add("unlocked");
            document.getElementById("Input8").checked = true;
    }

    if (Konto === 67){
        document.getElementById("9").classList.remove("locked");
        document.getElementById("9").classList.add("unlocked");
        document.getElementById("Input9").checked = true;
    }

    if (Konto >= 100000 && lastGamble >= Konto/2 && aos === 2){
        document.getElementById("10").classList.remove("locked");
        document.getElementById("10").classList.add("unlocked");
        document.getElementById("Input10").checked = true;
    }
}

for (let i = 1; i <= 10; i++) {
    const checkbox = document.getElementById(`Input${i}`);
    
    checkbox.addEventListener("change", function() {
        const target = document.getElementById(`${i}`);
        if (checkbox.checked) {
            target.classList.remove("locked");
            target.classList.add("unlocked");
        } else {
            target.classList.remove("unlocked");
            target.classList.add("locked");
        }
    });
}
