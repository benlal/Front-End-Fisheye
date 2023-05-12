import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/media.js';
import { displayLightbox } from '../utils/lightbox.js';

//gets photographer ID
export function getPhotographerId() {
    const url = new URL(window.location.href);
    const id = parseInt(url.searchParams.get("id"));
    return id;
}

// fetches medias from a photographer
async function getPhotographerMedias(id) {
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();
    return ({
        //gets photographer with corresponding ID
        photographer: data.photographers.find(p => p.id === id),
        //filters medias by ID
        medias: data.media.filter(m => m.photographerId === id)
    })
}

// creates photographer's header
async function displayHeader(photographer, sumLikes) {
    photographerFactory(photographer).getUserHeaderDOM(sumLikes)
}

//creates medias galery
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
    getAllHearts().then(hearts => {
        setEventToHearts(hearts);
    });
}

//sorts medias by popularity (number of likes) when page opens
function initialSort(medias) {
    medias.sort((mediaA, mediaB) => {
        return mediaA.likes - mediaB.likes
    }).reverse()
}

//deletes current galery
function galeryCleaner() {
    const mediasSection = document.querySelector(".medias_section");
    mediasSection.innerHTML = '';
}

//gets all heart icons
async function getAllHearts() {
    let hearts = document.querySelectorAll(".like-button");
    return hearts
}

//listens click on heart icons
async function setEventToHearts(faHeart) {
    faHeart.forEach(function (heart) {
        heart.addEventListener("click", likesCount);
    });
}

//adds or substracts likes on medias and total
function likesCount() {
    let elt = this;
    //targets number element close to heart icon
    let likesNumberElt = elt.closest(".media-likes-counter").getElementsByClassName("media-likes")[0];
    let likesNumber = parseInt(likesNumberElt.textContent, 10);
    //gets initial total likes value
    let photographLikesValueElt = document.getElementById('photograph-likes-value');
    let photographLikesValue = parseInt(photographLikesValueElt.textContent, 10);
    //checks if like is already given, adds or subtracts a like accordingly
    if (elt.classList.contains("selected")) {
        photographLikesValue--;
        likesNumber--;
        elt.ariaLabel = 'Ajouter un like';
        elt.classList.remove("selected");
    } else {
        photographLikesValue++;
        likesNumber++;
        elt.ariaLabel = 'Retirer le like';
        elt.classList.add("selected");
    }
    //replaces both elements by new values
    photographLikesValueElt.textContent = photographLikesValue;
    likesNumberElt.textContent = likesNumber;
}

//adds up likes on each medias
function getSumLikes(medias) {
    const sumLikes = medias.reduce(
        (accumulator, currentMedia) => accumulator + currentMedia.likes,
        0
    );
    return sumLikes
}

//sorts medias by popularity, date or title
function sortMedias(medias) {
    let firstOption = document.querySelector(".first-option");
    let secondOption = document.querySelector(".second-option");
    let thirdOption = document.querySelector(".third-option");

    //deletes current galery and creates a new one
    function handleGaleryUpdate() {
        galeryCleaner();
        displayData(medias);
        closeList();
    }

    //sorts medias by popularity
    function sortByPopularity() {
        initialSort(medias);
        handleGaleryUpdate();
    }

    //sorts medias by date
    function sortByDate() {
        medias.sort((mediaA, mediaB) => {
            return new Date().valueOf(mediaA.likes) - new Date().valueOf(mediaB.likes)
        }).reverse()

        handleGaleryUpdate();
    }

    //sorts medias by title
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

        handleGaleryUpdate();
    }

    //changes name and aria of second option
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

        let newLabel = secondOption.ariaLabel;
        let oldLabel = firstOption.ariaLabel;
        firstOption.ariaLabel = newLabel;
        secondOption.ariaLabel = oldLabel;
    });

    //changes name and aria of third option
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

        let newLabel = thirdOption.ariaLabel;
        let oldLabel = firstOption.ariaLabel;
        firstOption.ariaLabel = newLabel;
        thirdOption.ariaLabel = oldLabel;
    });
}

//closes list of filters
function closeList() {
    const sortButton = document.querySelector(".sort-button");
    const sortList = document.querySelector(".sort-list");
    const sortArrow = document.querySelector(".fa-angle-down");

    sortButton.classList.add("closed-button");
    sortList.classList.add("closed-list");
    sortArrow.style.transform = 'rotate(0deg)';
    sortArrow.classList.remove("reverted-arrow");

    sortButton.focus();
}

//opens list of filters
document.querySelector(".sort-button").addEventListener('click', function () {
    displayList();
});

function displayList() {
    const sortButton = document.querySelector(".sort-button");
    const sortList = document.querySelector(".sort-list");
    const sortArrow = document.querySelector(".fa-angle-down");

    //checks if list is closed the opens it
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
    const id = await getPhotographerId();
    const { photographer, medias } = await getPhotographerMedias(id);
    displayHeader(photographer, getSumLikes(medias));
    initialSort(medias);
    displayData(medias);
    sortMedias(medias);
}

init();