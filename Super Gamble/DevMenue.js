var defMenueVisibility = 0;

function Def(){
    let Code = prompt("Hint: I-Pad Code");
    if (!Code || Code !== "070611") {
        return;
    }

    if (defMenueVisibility===0){
        document.getElementById("AlexModeBox").style = "Display: solid;";
        defMenueVisibility = 1;
        document.getElementById("DevMenueToggle").innerHTML = "Dev Menu: On";
    } else {
        document.getElementById("AlexModeBox").style = "Display: none;";
        defMenueVisibility = 0;
        document.getElementById("DevMenueToggle").innerHTML = "Dev Menu: Off";
    }
}

function UpdateRange(value){
  document.getElementById("speedLabel").innerHTML = value;
}

function setKontoDef(){
    Konto = prompt("Set the Konto value:", Konto);
    document.getElementById("Konto").innerHTML = Konto;
}

function alexGambleValue(){
    userBet = prompt("Set the new standard bet for Alex Mode:", userBet);
}

function setHighScoreDef(){
    HighScore = prompt("Set the Konto value:", HighScore);
    document.getElementById("High").innerHTML = HighScore;
}

function winAnimation() {
    document.getElementById("body").classList.add("win");

    setTimeout(function () {
        document.getElementById("body").classList.remove("win");
    }, 4000);
}

function playSound(){
    document.getElementById("WinSound").play();
}
