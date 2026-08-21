var Konto = 10000;
var aos = 0;
var History = 1;

const maxNumber = document.getElementById("moneyset");
maxNumber.max = Konto;

function gamble(){
    const money = document.getElementById("moneyset").value;

    if(isNaN(money) || money === "" || money > Konto || 0 > money){
    alert("Please enter a valid number.");
    return;
    }

    const rNumber = Math.floor(Math.random() * 2) + 1;
    
    if (rNumber === 1){
    Konto = parseInt(Konto) + parseInt(money);
    document.getElementById("Konto").innerHTML = Konto;
    aos = 1;
    } else {
    Konto = parseInt(Konto) - parseInt(money);
    document.getElementById("Konto").innerHTML = Konto;
    aos = 2;
    }
    
    if (aos === 1){
    const para = document.createElement("p");
    const node = document.createTextNode("(+)" + " Konto: " + Konto + ", Money gained: " + money);
    para.appendChild(node);

    const element = document.getElementById("history2");
    element.appendChild(para);
    }else{
    const para = document.createElement("p");
    const node = document.createTextNode("(-)" + " Konto: " + Konto + ", Money lost: " + money);
    para.appendChild(node);

    const element = document.getElementById("history2");
    element.appendChild(para);
    }

    const maxNumber = document.getElementById("moneyset");
    maxNumber.max = Konto;

    lose()
}

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

function doReset(){
 window.location.reload();
}

function lose(){
if (Konto === 0){
    alert("You Lost :(")
}
}