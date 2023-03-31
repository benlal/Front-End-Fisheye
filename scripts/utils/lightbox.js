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

function displayLightboxMedia(media) {
    const mediaLightboxMedia = document.querySelector('.media-lightbox_media');
    const photographerId = getPhotographerId();
    if (media.video) {
        mediaLightboxMedia.innerHTML = `<video class="media-lightbox_img" controls><source src="assets/medias/${photographerId}/${media.video}" aria-label="${media.title}" data-id="${media.id}"></source></video><p class="media-lightbox_title">${media.title}</p>`;
    } else {
        mediaLightboxMedia.innerHTML = `<img class="media-lightbox_img" src="assets/medias/${photographerId}/${media.image}" alt="${media.title}" data-id="${media.id}"><p class="media-lightbox_title">${media.title}</p>`;
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


function manageLightbox(index, medias) {
    let currentLightboxIndex = index;
    const closeMedia = document.querySelector('.close-media');
    const goToNextMedia = function() {
        currentLightboxIndex = getNextMediaIndex(currentLightboxIndex, medias);
        const newMediaToDisplay = medias[currentLightboxIndex];
        displayLightboxMedia(newMediaToDisplay);
    }
    const goToPreviousMedia = function() {
        currentLightboxIndex = getPreviousMediaIndex(currentLightboxIndex, medias);
        const newMediaToDisplay = medias[currentLightboxIndex];
        displayLightboxMedia(newMediaToDisplay);
    }

    const handleClickPreviousArrow = function() {
        goToPreviousMedia();
    };
    const handleClickNextArrow = function () {
        goToNextMedia();
    };

    document.querySelector('.previous-media').addEventListener('click', handleClickPreviousArrow);
    document.querySelector('.next-media').addEventListener('click', handleClickNextArrow);

    const nextMediaKeyList = ["ArrowRight", "d"];
    const previousMediaKeyList = ["ArrowLeft", "q"];

    const handleKeydown = (event) => {
        if (nextMediaKeyList.includes(event.key)) {
            goToNextMedia();
        }
        if (previousMediaKeyList.includes(event.key)) {
            goToPreviousMedia();
        }
    }

    document.body.addEventListener("keydown", handleKeydown);

    function closeLightbox() {
        const lightbox = document.getElementById("media-lightbox");
        lightbox.style.display = "none";
        document.body.removeEventListener("keydown", handleKeydown);
        document.querySelector('.previous-media').removeEventListener('click', handleClickPreviousArrow);
        document.querySelector('.next-media').removeEventListener('click', handleClickNextArrow);
    }

    
    closeMedia.focus();
    closeMedia.addEventListener('click', function () {
        closeLightbox();
    });

}




// document.addEventListener("keydown", (event) => {
    
//     if (event.key === "Enter") {
//         console.log('ouverture')
//         displayLightbox();
//     }
// })