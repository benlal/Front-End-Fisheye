function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    const photographerName = document.querySelector(".photograph-header h2").innerText;
    document.querySelector("header h2").innerHTML = "Contactez-moi</br>"+photographerName; 


}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
