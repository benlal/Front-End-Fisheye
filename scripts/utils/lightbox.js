async function displayLightbox(mediaId, medias) {

    const lightbox = document.getElementById("media-lightbox");
    lightbox.style.display = "inline";

    let index = medias.findIndex((element) => {
        return element.id === mediaId;
    });

    let media = medias[index];

    const photographerList = await getPhotographerList();
    console.log(photographerList)
    const currentPhotographer = photographerList.find(p => p.id === media.photographerId);

    displayLightboxMedia(media, medias, currentPhotographer);

    manageLightboxEvents(index, medias, currentPhotographer);
}

function manageLightboxEvents(index, medias, photographer) {
    document.querySelector('.previous-media').addEventListener('click', function () {
        const newLightboxIndex = getPreviousMediaIndex(index, medias);
        const newMediaToDisplay = medias[newLightboxIndex];
        displayLightboxMedia(newMediaToDisplay, medias, photographer);
    });

    document.querySelector('.next-media').addEventListener('click', function () {
        const newLightboxIndex = getNextMediaIndex(index, medias);
        const newMediaToDisplay = medias[newLightboxIndex];
        displayLightboxMedia(newMediaToDisplay, medias, photographer);
    });
}

async function getPhotographerList() {
    // fetch les données des photographes
    const response = await fetch('../../data/photographers.json');

    //définit response comme étant du json
    return await response.json().photographers;
}


function closeLightbox() {
    const lightbox = document.getElementById("media-lightbox");
    lightbox.style.display = "none";
}

function displayLightboxMedia(media, medias, photographer) {
    const mediaLightboxMedia = document.querySelector('.media-lightbox_media');
    if (media.tagName === "VIDEO") {
        mediaLightboxMedia.innerHTML = `<video controls><source src="assets/photographers/${photographer.name}/${media.video}" aria-label=${media.title}></source></video><p class="media-lightbox_title">${media.title}</p>`;
    } else {
        mediaLightboxMedia.innerHTML = `<img src="assets/photographers/${photographer.name}/${media.image}" alt=${media.title}><p class="media-lightbox_title">${media.title}</p>`;
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