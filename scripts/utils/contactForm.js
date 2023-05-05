//opens contact form
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
    const photographerName = document.querySelector(".photograph-header h1").innerText;
    document.querySelector("header h2").innerHTML = "Contactez-moi</br>" + photographerName;

    const sendButton = document.querySelector(".modal_button");

    sendButton.addEventListener('click', function (event) {
        event.preventDefault();
        const userData = {};
        userData.prenom = document.querySelector("#firstname").value;
        userData.nom = document.querySelector("#lastname").value;
        userData.eMail = document.querySelector("#email").value;
        userData.message = document.querySelector("#message").value;
        console.table(userData);
    });
}

//closes contact form
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
