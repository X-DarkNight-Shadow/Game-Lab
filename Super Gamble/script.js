var Konto = 1000;
var aos = 0;
var HighScore = 1000;
var firstBet = false;
var winInARow = 0;
var allowWinSound = 0;
var allowWinAnimation = 0;
var aosStreakWin = 0;
var aosStreakLose = 0;
var lastGamble = 0;

const maxNumber = document.getElementById("moneyset");
maxNumber.max = Konto;

function gamble(){
    const money = document.getElementById("moneyset").value;
    lastGamble = money;

    if(isNaN(money) || money === "" || money > Konto || 0 > money){
        alert("Please enter a valid number.");
        return;
    }

    const rNumber = Math.floor(Math.random() * 2) + 1;
    
    if (rNumber === 1){
        Konto = parseInt(Konto) + parseInt(money);
        document.getElementById("Konto").innerHTML = Konto;
        aos = 1;
        firstBet = true;
        winInARow += 1;
        TotalBets++;
        TotalWins++;

        document.getElementById("TotalBets").textContent = TotalBets;
        document.getElementById("TotalWins").textContent = TotalWins;

        if (HighScore < Konto){
            HighScore = Konto;
            document.getElementById("High").innerHTML = HighScore;
            winAnimation2();
            playSound2();
        }
    } else {
        Konto = parseInt(Konto) - parseInt(money);
        document.getElementById("Konto").innerHTML = Konto;
        aos = 2;
        winInARow = 0;
        TotalBets++;
        TotalLoses++;

        document.getElementById("TotalBets").textContent = TotalBets;
        document.getElementById("TotalLoses").textContent = TotalLoses;
    }
    
    if (aos === 1){
        aosStreakLose = 0;
        aosStreakWin += 1;

        const para = document.createElement("li");
        para.style = "color: lightgreen; text-shadow: 0px 0px 5px lightgreen;"

        const text1 = document.createTextNode("(+) Konto: " + Konto + ", Money gained: " + money);
        const span = document.createElement("span");
        span.textContent = aosStreakWin;
        span.classList.add("historyStreak");

        para.appendChild(text1);
        para.appendChild(span);

        const element = document.getElementById("history2");
        element.appendChild(para);
    }else{
        aosStreakWin = 0;
        aosStreakLose += 1;

        const para = document.createElement("li");
        para.style = "color: red; text-shadow: 0px 0px 5px red;"

        const text1 = document.createTextNode("(-) Konto: " + Konto + ", Money lost: " + money);

        const span = document.createElement("span");
        span.textContent = aosStreakLose;
        span.classList.add("historyStreak2");

        para.appendChild(text1);
        para.appendChild(span);

        const element = document.getElementById("history2");
        element.appendChild(para);
    }

    const maxNumber = document.getElementById("moneyset");
    maxNumber.max = Konto;

    lose();
    achievement_check();
}

function doReset(){
    Konto = 1000;
    document.getElementById("Konto").innerHTML = Konto;
}

function lose(){
    if (Konto === 0){
       alert("You Lost :(")
    }
}

function winAnimation2() {
    if (allowWinAnimation===1) return;

    document.getElementById("body").classList.add("win");

    setTimeout(function () {
        document.getElementById("body").classList.remove("win");
    }, 4000);
}

function playSound2(){
    if (allowWinSound===1) return;
    document.getElementById("WinSound").play();
}
