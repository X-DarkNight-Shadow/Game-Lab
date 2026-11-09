var History = 1;
var TotalBets = 0;
var TotalWins = 0;
var TotalLoses = 0;

function showHistory(){

    if (History === 1){
        const disabledHistory = document.getElementById("history");
        disabledHistory.style = "display: solid;"
        document.getElementById("historyToggle").innerHTML = "History: On";
        History = 2;
    } else {
        const disabledHistory = document.getElementById("history");
        disabledHistory.style = "display: none;"
        document.getElementById("historyToggle").innerHTML = "History: Off";
        History = 1;
    }
}