//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographerId() {
    //getting ID
    const url = location.search;
    const id = +url.substring(url.lastIndexOf('=') + 1);

    return id;
}


async function getPhotographerMedias(id) {

    // fetch les données des photographes + des médias
    const response = await fetch('../../data/photographers.json');

    //définit response comme étant du json
    const data = await response.json();

    // retour des valeurs
    return ({
        //trouve dans photographers le premier photographe dont la propriété id est strictement égale à l'id déclarée dans la constante
        photographer: data.photographers.find(p => p.id === id),
        //trouve TOUS les médias filtrés en fonction de l'id
        medias: data.media.filter(m => m.photographerId === id)
    })
}

async function displayHeader(photographer, sumLikes) {
    const photographerHeader = photographerFactory(photographer).getUserHeaderDOM(sumLikes)
};

async function displayData(medias, id) {
    const mediasSection = document.querySelector(".medias_section");
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaCardDOM.querySelector('.media').addEventListener('click', function () {
            displayLightbox(media.id, medias);
        });
        mediasSection.appendChild(mediaCardDOM);


        // media.setAttribute("onclick", `displayLightbox(${id})`);
    });
}

async function getAllHearts() {
    let hearts = document.querySelectorAll(".fa-heart");
    return hearts
}

async function setEventToHearts(faHeart) {
    faHeart.forEach(function (heart) {
        heart.addEventListener("click", likesCount);
    });
}

function likesCount() {
    let elt = this;
    let likesNumberElt = elt.closest(".media-likes-counter").getElementsByClassName("media-likes")[0];
    let likesNumber = parseInt(likesNumberElt.textContent, 10);
    let photographLikesValueElt = document.getElementById('photograph-likes-value');
    let photographLikesValue = parseInt(photographLikesValueElt.textContent, 10);
    if (elt.classList.contains("selected")) {
        photographLikesValue--;
        likesNumber--;
        elt.classList.remove("selected");
    } else {
        photographLikesValue++;
        likesNumber++;
        elt.classList.add("selected");
    }
    photographLikesValueElt.textContent = photographLikesValue;
    likesNumberElt.textContent = likesNumber;
}

//ajout récent
function getSumLikes(medias) {
    const sumLikes = medias.reduce(
        (accumulator, currentMedia) => accumulator + currentMedia.likes,
        0
    );
    return sumLikes
}
//ajout récent

async function init() {
    // Récupère les datas des photographes
    const id = await getPhotographerId();

    const { photographer, medias } = await getPhotographerMedias(id);

    displayHeader(photographer, getSumLikes(medias));
    displayData(medias);
    const faHeart = await getAllHearts();
    setEventToHearts(faHeart);
};

init();