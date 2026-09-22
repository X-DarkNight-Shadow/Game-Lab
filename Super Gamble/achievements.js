var Achievements = 0;
var Achievements_count = 13;

var Lucky = 0;
var firstBet = false;
var winInARow = 0;
var loseInARow = 0;
var aosStreakWin = 0;
var aosStreakLose = 0;
var lastGamble = 0;

var Achievements_names = ["First-time","Loser","Lucky","Blessed","67-kid","Rich","Addicted","Crazy","Danger","Unlucky","Streak","Fighter"
    ,"Reversed?"];

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
        document.getElementById("First-time").classList.remove("locked");
        document.getElementById("First-time").classList.add("unlocked");
        document.getElementById("Input1").checked = true;
    }

    if (winInARow >= 5){
        document.getElementById("Streak").classList.remove("locked");
        document.getElementById("Streak").classList.add("unlocked");
        document.getElementById("Input11").checked = true;
    }

    if (winInARow >= 10){
        document.getElementById("Lucky").classList.remove("locked");
        document.getElementById("Lucky").classList.add("unlocked");
        document.getElementById("Input2").checked = true;
    }

    if (winInARow >= 15){
        document.getElementById("Blessed").classList.remove("locked");
        document.getElementById("Blessed").classList.add("unlocked");
        document.getElementById("Input3").checked = true;
    }
    
    if (Konto >= 100000){
        document.getElementById("Rich").classList.remove("locked");
        document.getElementById("Rich").classList.add("unlocked");
        document.getElementById("Input4").checked = true;
    }

    if (Konto === 0){
        document.getElementById("Loser").classList.remove("locked");
        document.getElementById("Loser").classList.add("unlocked");
        document.getElementById("Input5").checked = true;
    }

    if (Konto >= 1000000){
        document.getElementById("Addicted").classList.remove("locked");
        document.getElementById("Addicted").classList.add("unlocked");
        document.getElementById("Input6").checked = true;
    }

    if (Konto === lastGamble * 2 && aos === 1){
        document.getElementById("Crazy").classList.remove("locked");
        document.getElementById("Crazy").classList.add("unlocked");
        document.getElementById("Input7").checked = true;
    }

    if (10 >= Konto){
        Lucky = 1;
    }

    if (Konto >= 100 && Lucky === 1){
            document.getElementById("Danger").classList.remove("locked");
            document.getElementById("Danger").classList.add("unlocked");
            document.getElementById("Input8").checked = true;
    }

    if (Konto === 67){
        document.getElementById("67-kid").classList.remove("locked");
        document.getElementById("67-kid").classList.add("unlocked");
        document.getElementById("Input9").checked = true;
    }

    if (Konto >= 100000 && lastGamble >= Konto/2 && aos === 2){
        document.getElementById("Unlucky").classList.remove("locked");
        document.getElementById("Unlucky").classList.add("unlocked");
        document.getElementById("Input10").checked = true;
    }

    if (TotalBets >= 1000){
        document.getElementById("Fighter").classList.remove("locked");
        document.getElementById("Fighter").classList.add("unlocked");
        document.getElementById("Input12").checked = true;
    }

    if (loseInARow >= 5){
        document.getElementById("Reversed?").classList.remove("locked");
        document.getElementById("Reversed?").classList.add("unlocked");
        document.getElementById("Input13").checked = true;
    }
}

for (let i = 1; i <= Achievements_count; i++) {
    const checkbox = document.getElementById(`Input${i}`);
    
    checkbox.addEventListener("change", function() {
        const target = document.getElementById(checkbox.value);
        if (checkbox.checked) {
            target.classList.remove("locked");
            target.classList.add("unlocked");
        } else {
            target.classList.remove("unlocked");
            target.classList.add("locked");
        }
    });
}
