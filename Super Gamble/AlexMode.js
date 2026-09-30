var bet = 50;
var userBet = 50;
var DisabledA = 0;
let speed = 1000;


function AlexMode() {
    if (DisabledA === 0){
        DisabledA = 1;
        runAlexMode();
    } else {
        DisabledA = 0;
    }
}

function runAlexMode() {

    if (Konto <= 0 || DisabledA !== 1) return;

    var nRandom = Math.floor(Math.random() * 2);

    if (nRandom === 0) {
        Konto += bet;
        bet = parseInt(userBet);
        aos = 1;
        TotalBets++;
        TotalWins++;
        document.getElementById("TotalBets").textContent = TotalBets;
        document.getElementById("TotalWins").textContent = TotalWins;
        if (HighScore < Konto){
        HighScore = Konto;
        document.getElementById("High").innerHTML = HighScore;
    }
    } else {
        Konto -= bet;
        if (bet > 16000 || bet > Konto) {
             bet = parseInt(userBet);
        } else {
             bet *= 2;
        }
        aos = 2;
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

        const text1 = document.createTextNode("(+) Konto: " + Konto + ", Money gained: " + bet);
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

        const text1 = document.createTextNode("(-) Konto: " + Konto + ", Money lost: " + bet);

        const span = document.createElement("span");
        span.textContent = aosStreakLose;
        span.classList.add("historyStreak2");

        para.appendChild(text1);
        para.appendChild(span);

        const element = document.getElementById("history2");
        element.appendChild(para);
    }

    document.getElementById("Konto").innerHTML = Konto;

    speed = document.getElementById("speedInput").value;

    setTimeout(runAlexMode, speed);
}
runAlexMode();
