//Mettre le code JavaScript lié à la page photographer.html

function getPhotographerId() {
    //getting ID
    const url = new URL(window.location.href);
    const id = parseInt(url.searchParams.get("id"));
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

async function displayData(medias) {
    const mediasSection = document.querySelector(".medias_section");
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaCardDOM.querySelector('.media').addEventListener('click', function () {
            displayLightbox(media.id, medias);
        });
        mediasSection.appendChild(mediaCardDOM);
    });

}


function initialSort(medias) {
    medias.sort((mediaA, mediaB) => {
        return mediaA.likes - mediaB.likes
    }).reverse()
}

function galeryCleaner() {
    const mediasSection = document.querySelector(".medias_section");
    mediasSection.innerHTML = '';
}

async function getAllHearts() {
    let hearts = document.querySelectorAll(".like-button");
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


function getSumLikes(medias) {
    const sumLikes = medias.reduce(
        (accumulator, currentMedia) => accumulator + currentMedia.likes,
        0
    );
    return sumLikes
}



function sortMedias(medias) {
    let firstOption = document.querySelector(".first-option");
    let secondOption = document.querySelector(".second-option");
    let thirdOption = document.querySelector(".third-option");

    function sortByPopularity() {

        medias.sort((mediaA, mediaB) => {
            return mediaA.likes - mediaB.likes
        }).reverse()

        galeryCleaner();
        displayData(medias);
        closeList();
    }

    function sortByDate() {

        medias.sort((mediaA, mediaB) => {
            return new Date().valueOf(mediaA.likes) - new Date().valueOf(mediaB.likes)
        }).reverse()

        galeryCleaner();
        displayData(medias);
        closeList();
    }

    function sortByTitle() {

        medias.sort((mediasA, mediasB) => {
            if (mediasA.title > mediasB.title) {
                return 1;
            }
            else if (mediasA.title < mediasB.title) {
                return -1;
            }
            else {
                return 0;
            }
        })

        galeryCleaner();
        displayData(medias);
        closeList();
    }


    secondOption.addEventListener('click', function () {

        let newOption = '';
        let oldOption = firstOption.innerHTML;

        if (secondOption.innerHTML === 'Popularité') {
            sortByPopularity();
        }
        else if (secondOption.innerHTML === 'Date') {
            sortByDate();
        }
        else if (secondOption.innerHTML === 'Titre') {
            sortByTitle();
        }

        newOption = secondOption.innerHTML;
        firstOption.innerHTML = newOption;
        secondOption.innerHTML = oldOption;

    });

    thirdOption.addEventListener('click', function () {

        let newOption = '';
        let oldOption = firstOption.innerHTML;

        if (thirdOption.innerHTML === 'Popularité') {
            sortByPopularity();
        }
        else if (thirdOption.innerHTML === 'Date') {
            sortByDate();
        }
        else if (thirdOption.innerHTML === 'Titre') {
            sortByTitle();
        }

        newOption = thirdOption.innerHTML;
        firstOption.innerHTML = newOption;
        thirdOption.innerHTML = oldOption;

    });
}


function closeList() {
    const sortButton = document.querySelector(".sort-button");
    const sortList = document.querySelector(".sort-list");
    const sortArrow = document.querySelector(".fa-angle-down");

    sortButton.classList.add("closed-button");
    sortList.classList.add("closed-list");
    sortArrow.style.transform = 'rotate(0deg)';
    sortArrow.classList.remove("reverted-arrow");
}


function displayList() {

    const sortButton = document.querySelector(".sort-button");
    const sortList = document.querySelector(".sort-list");
    const sortArrow = document.querySelector(".fa-angle-down");

    if (sortButton.classList.contains("closed-button")) {
        sortButton.classList.remove("closed-button");
        sortList.classList.remove("closed-list");
        sortArrow.style.transform = 'rotate(180deg)';
        sortArrow.classList.add("reverted-arrow");
    }
    else {
        closeList();
    }

}


async function init() {
    // Récupère les datas des photographes
    const id = await getPhotographerId();
    const { photographer, medias } = await getPhotographerMedias(id);
    displayHeader(photographer, getSumLikes(medias));
    initialSort(medias);
    displayData(medias);
    const faHeart = await getAllHearts();
    setEventToHearts(faHeart);
    sortMedias(medias);

};

init();