//opens contact form
document.querySelector(".contact_button").addEventListener('click', function () {
    displayModal();
});

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";

    // focus by default on closing button when opening contact form
    const closeButton = document.querySelector('.close-button');
    closeButton.focus();

    const photographerName = document.querySelector(".photograph-header h1").innerText;
    document.querySelector("header h2").innerHTML = "Contactez-moi</br>" + photographerName;

    //stocks data from form in a table then closes form
    function submitForm(event) {
        event.preventDefault();
        const userData = {};
        userData.prenom = document.querySelector("#firstname").value;
        userData.nom = document.querySelector("#lastname").value;
        userData.eMail = document.querySelector("#email").value;
        userData.message = document.querySelector("#message").value;
        console.table(userData);
        closeModal();
        document.getElementById("contact-form").reset();
        document.querySelector(".modal_button").removeEventListener('click', submitForm);
    }

    document.querySelector(".modal_button").addEventListener('click', submitForm);
}

//closes contact form
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    // focus by on contact button when closing contact form
    document.querySelector(".contact_button").focus();
}

document.querySelector(".close-button").addEventListener('click', function () {
    closeModal();
});