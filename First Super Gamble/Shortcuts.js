var shortcutVisibility = 0;

function shortcuts(){
    if (shortcutVisibility === 0){
        shortcutVisibility = 1
        const shortcutBox = document.getElementById("ShortcutBox");
        ShortcutBox.style = "Display: solid;"
    } else {
        shortcutVisibility = 0;
        const shortcutBox = document.getElementById("ShortcutBox");
        ShortcutBox.style = "Display: none;"
    }

}

function Short1(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "1000";
}

function Short2(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "2000";
}

function Short3(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "3000";
}

function Short4(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "4000";
}

function Short5(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "5000";
}