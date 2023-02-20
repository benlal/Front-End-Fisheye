
async function displayLightbox(elt) {
    const id = await getPhotographerId();

    const { photographer, medias } = await getPhotographerMedias(id);


    const mediaId = elt.getAttribute('data-id');

    const lightbox = document.getElementById("media-lightbox");
    lightbox.style.display = "inline";

    console.log(photographer)
    console.log(medias)


    displayLightboxMedia(medias);
}


function closeLightbox() {
    const lightbox = document.getElementById("media-lightbox");
    lightbox.style.display = "none";
}

// Brouillon

function displayLightboxMedia(globalMedias) {


    let index = globalMedias.findIndex((element) => {
        return element.id == globalMedias.dataset.id;
    });

    let media = medias[index];
    let title = medias[index].title;

    if (media.tagName === "VIDEO") {
        innerHTML = `<video controls><source src="assets/photographers/${photographer.name}/${media.video}" aria-label=${media.title}></source></video>`;
    } else {
        innerHTML = `<img src="assets/photographers/${photographer.name}/${media.image}" alt=${media.title}>`;
    }

    function nextMedia() {
        if (index < medias.length - 1) {
            index++;
        } else {
            index = 0;
        }
    }

    function previousMedia() {
        if (index > 0) {
            index--;
        } else {
            index = medias.length - 1;
        }
    }
}