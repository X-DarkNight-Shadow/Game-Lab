var Settings = 0;

function settingsVisibility(){
    if (Settings===0){
        document.getElementById("Settings").style = "Display: solid;";
        Settings = 1;
    } else {
        document.getElementById("Settings").style = "Display: none;";
        Settings = 0;
    }
}

function WinSoundAllow(){
    if (allowWinSound===0){
        allowWinSound = 1;
        document.getElementById("SButtonWinSound").innerHTML = "Win Sound: Off";
    } else {
        allowWinSound = 0;
        document.getElementById("SButtonWinSound").innerHTML = "Win Sound: On";
    }
}

function WinAnimationAllow(){
    if (allowWinAnimation===0){
        allowWinAnimation = 1;
        document.getElementById("SButtonWinAnimation").innerHTML = "Win Animation: Off";
    } else {
        allowWinAnimation = 0;
        document.getElementById("SButtonWinAnimation").innerHTML = "Win Animation: On";
    }
}

function color1() {
    const color = document.getElementById("colorPicker1").value;
    document.body.style.color = color;
    document.body.style.textShadow = "0px 0px 5px " + color;

    
    const hr = document.querySelector("hr");
    hr.style.backgroundColor = color;
    hr.style.color = color;
    hr.style.boxShadow = "0px 0px 10px " + color;
    hr.style.border = "solid 3px " + color;

    const SHr = document.getElementById("SettingsHr");
    SHr.style.backgroundColor = color;
    SHr.style.color = color;
    SHr.style.boxShadow = "0px 0px 10px " + color;
    SHr.style.border = "solid 3px " + color;

    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
       button.style.color = color;
       button.style.textShadow = "0px 0px 5px " + color;
    });
}

function color2() {
    const color = document.getElementById("colorPicker2").value;
    document.body.style.backgroundColor = color;
}