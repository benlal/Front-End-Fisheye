async function displayLightbox(mediaId, medias) {

    const lightbox = document.getElementById("media-lightbox");
    lightbox.style.display = "inline";

    let index = medias.findIndex((element) => {
        return element.id === mediaId;
    });

    let media = medias[index];

    const photographerList = await getPhotographerList();
    const currentPhotographer = photographerList.find(p => p.id === media.photographerId);

    displayLightboxMedia(media, currentPhotographer);

    manageLightboxEvents(index, medias, currentPhotographer);
}

async function getPhotographerList() {
    // fetch les données des photographes
    const response = await fetch('../../data/photographers.json');

    // vérifier si response est valide
    if (!response.ok) {
        throw new Error('Impossible de récupérer la liste des photographes.');
    }

    //définit response comme étant du json
    const data = await response.json();

    //vérifier si data est valide
    if (!data || !data.photographers) {
        throw new Error('Données invalides pour la liste des photographes.');
    }

    return data.photographers;
}

function closeLightbox() {
    const lightbox = document.getElementById("media-lightbox");
    lightbox.style.display = "none";
}

function displayLightboxMedia(media, photographer) {
    const mediaLightboxMedia = document.querySelector('.media-lightbox_media');
    if (media.video) {
        mediaLightboxMedia.innerHTML = `<video class="media-lightbox_img" controls><source src="assets/medias/${photographer.id}/${media.video}" aria-label="${media.title}" data-id="${media.id}"></source></video><p class="media-lightbox_title">${media.title}</p>`;
    } else {
        mediaLightboxMedia.innerHTML = `<img class="media-lightbox_img" src="assets/medias/${photographer.id}/${media.image}" alt="${media.title}" data-id="${media.id}"><p class="media-lightbox_title">${media.title}</p>`;
    }
}

function getNextMediaIndex(index, medias) {
    if (index < medias.length - 1) {
        index++;
    } else {
        index = 0;
    }
    return index;
}

function getPreviousMediaIndex(index, medias) {
    if (index > 0) {
        index--;
    } else {
        index = medias.length - 1;
    }
    return index;
}




function manageLightboxEvents(index, medias, photographer) {
    let currentLightboxIndex = index;
    document.querySelector('.previous-media').addEventListener('click', function () {
        currentLightboxIndex = getPreviousMediaIndex(currentLightboxIndex, medias);
        const newMediaToDisplay = medias[currentLightboxIndex];
        displayLightboxMedia(newMediaToDisplay, photographer);
    });

    document.querySelector('.next-media').addEventListener('click', function () {
        goToNextMedia(index, medias, photographer);
    });
}

function goToNextMedia(index, medias, photographer) {
    const currentLightboxIndex = getNextMediaIndex(currentLightboxIndex, medias);
    const newMediaToDisplay = medias[currentLightboxIndex];
    displayLightboxMedia(newMediaToDisplay, photographer);
}


async function toto() {
    const id = getPhotographerId();
    const { photographer, medias } = await getPhotographerMedias(id);
}

document.addEventListener("keydown", (event) => {
    toto()
    console.log('touche')
    if (event.key == "ArrowRight") {
        goToNextMedia(index, medias, photographer);
    }
});

// document.addEventListener("keydown", (event) => {
    
//     if (event.key === "Enter") {
//         console.log('ouverture')
//         displayLightbox();
//     }
// })