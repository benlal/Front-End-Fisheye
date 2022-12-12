//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerMedias() {
    //getting ID
    const url = location.search;
    const id = +url.substring(url.lastIndexOf('=') + 1);
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

async function displayHeader(photographer) {
    const photographerHeader = photographerFactory(photographer).getUserHeaderDOM()
};

//ajout récent
async function displayData(medias) {
    const mediasSection = document.querySelector(".medias_section");
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        console.log(mediaCardDOM)
        mediasSection.appendChild(mediaCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographerMedias();
    displayHeader(photographer);
    // ajout récent
    const { medias } = await getPhotographerMedias();
    displayData(medias);
};

init();