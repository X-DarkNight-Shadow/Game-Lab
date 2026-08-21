var shortcutVisibility = 0;

function shortcuts(){
    if (shortcutVisibility === 0){
        shortcutVisibility = 1
        const shortcutBox = document.getElementById("ShortcutBox");
        ShortcutBox.style = "Display: solid;"
        document.getElementById("ShortcutsToggle").innerHTML = "Shortcuts: On";
    } else {
        shortcutVisibility = 0;
        const shortcutBox = document.getElementById("ShortcutBox");
        ShortcutBox.style = "Display: none;"
        document.getElementById("ShortcutsToggle").innerHTML = "Shortcuts: Off";
    }

}

function Short1(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "100";
}

function Short2(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "200";
}

function Short3(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "300";
}

function Short4(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "400";
}

function Short5(){
    const setShortcut = document.getElementById("moneyset");
    setShortcut.value = "500";
}

function ShortAdd(){
            const value = document.getElementById("shortV").value;
            const Name = document.getElementById("shortN").value;
            
            if (!value) return;
             if (!Name) return;

            if (document.getElementById(Name)){
                alert("This Button already exists");
                return;
            }
            const nButton = document.createElement("button");
            nButton.innerText = Name;
            nButton.id = Name;
            nButton.onclick = () => document.getElementById("moneyset").value = parseInt(value);
            nButton.classList.add("Shortcut");
            const target = document.getElementById("ShortcutBox");
            target.appendChild(nButton);

            document.getElementById("shortV").value = "";
            document.getElementById("shortN").value = "";
        }

function ShortRemove(){
            const targetC = document.getElementById("shortRemoveInput").value;

            if (!targetC) return;

            const targetD = document.getElementById(targetC);

            if (!targetD) {
                alert("Button not found");
                return;
            }

            if (!targetD.classList.contains("Shortcut")) {
                alert("This is not a Button");
                return;
            }

            targetD.remove();

            document.getElementById("shortRemoveInput").value = "";
        }

        function shortEdit(){
            const targetC = document.getElementById("shortEditInput");

            if (!targetC) return;

            const targetD = document.getElementById(targetC.value);

            if (!targetD) {
                alert("Button not found");
                return;
            }

            if (!targetD.classList.contains("Shortcut")) {
                alert("This is not a Button");
                return;
            }

            const newName = document.getElementById("shortEditInput2").value;
            const newValue = document.getElementById("shortEditInput3").value;

            if (!newName) return;
            if (!newValue) return;

            targetD.innerText = newName;
            targetD.id = newName;
            targetD.onclick = () => document.getElementById("moneyset").value = parseInt(newValue);

            document.getElementById("shortEditInput").value = "";
            document.getElementById("shortEditInput2").value = "";
            document.getElementById("shortEditInput3").value = "";
        }