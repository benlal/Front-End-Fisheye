//opens lightbox
async function displayLightbox(mediaId, medias) {
    const lightbox = document.getElementById("media-lightbox");
    lightbox.style.display = "inline";

    let index = medias.findIndex((element) => {
        return element.id === mediaId;
    });

    let media = medias[index];

    displayLightboxMedia(media);

    manageLightbox(index, medias);
}

//generates media content
function displayLightboxMedia(media) {
    const mediaLightboxMedia = document.querySelector('.media-lightbox_media');
    //gets photographer ID used in media source
    const photographerId = getPhotographerId();
    //checks media property then generates content accordingly 
    if (media.video) {
        mediaLightboxMedia.innerHTML = `<video class="media-lightbox_img" controls><source src="assets/medias/${photographerId}/${media.video}" aria-label="${media.title}" data-id="${media.id}"></source></video><p class="media-lightbox_title">${media.title}</p>`;
    } else {
        mediaLightboxMedia.innerHTML = `<img class="media-lightbox_img" src="assets/medias/${photographerId}/${media.image}" alt="${media.title}" data-id="${media.id}"><p class="media-lightbox_title">${media.title}</p>`;
    }
}

//gets index +1
function getNextMediaIndex(index, medias) {
    if (index < medias.length - 1) {
        index++;
    } else {
        index = 0;
    }
    return index;
}

//gets index -1
function getPreviousMediaIndex(index, medias) {
    if (index > 0) {
        index--;
    } else {
        index = medias.length - 1;
    }
    return index;
}

function manageLightbox(index, medias) {

    let currentLightboxIndex = index;

    // goes to next media
    const goToNextMedia = function () {
        currentLightboxIndex = getNextMediaIndex(currentLightboxIndex, medias);
        const newMediaToDisplay = medias[currentLightboxIndex];
        displayLightboxMedia(newMediaToDisplay);
    }

    // goes to previous media
    const goToPreviousMedia = function () {
        currentLightboxIndex = getPreviousMediaIndex(currentLightboxIndex, medias);
        const newMediaToDisplay = medias[currentLightboxIndex];
        displayLightboxMedia(newMediaToDisplay);
    }

    document.querySelector('.previous-media').addEventListener('click', () => {
        goToPreviousMedia();
    });
    document.querySelector('.next-media').addEventListener('click', () => {
        goToNextMedia();
    });

    // list of keys used to navigate
    const nextMediaKeyList = ["ArrowRight", "d"];
    const previousMediaKeyList = ["ArrowLeft", "q"];
    const closeLightBoxKeyList = ["Escape"];

    // checks if pressed key is in one of keys lists and calls appropriate function
    const handleKeydown = (event) => {
        if (nextMediaKeyList.includes(event.key)) {
            goToNextMedia();
        }
        if (previousMediaKeyList.includes(event.key)) {
            goToPreviousMedia();
        }
        if (closeLightBoxKeyList.includes(event.key)) {
            closeLightbox();
        }
    }

    document.body.addEventListener("keydown", handleKeydown);

    // closes lightbox
    function closeLightbox() {
        const lightbox = document.getElementById("media-lightbox");
        lightbox.style.display = "none";
        // removes events to avoid duplicating them when reopening lightbox
        document.body.removeEventListener("keydown", handleKeydown);
        document.querySelector('.previous-media').removeEventListener('click', () => {
            goToPreviousMedia();
        });
        document.querySelector('.next-media').removeEventListener('click', () => {
            goToNextMedia();
        });
    }

    const closeMedia = document.querySelector('.close-media');
    // focus by default on closing button when opening lightbox
    closeMedia.focus();
    closeMedia.addEventListener('click', function () {
        closeLightbox();
        // focus media (button) corresponding to current index when closing lightbox
        document.querySelector(`.media-button[data-id="${medias[currentLightboxIndex].id}"]`).focus();
    });
}