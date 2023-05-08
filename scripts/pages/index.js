import { photographerFactory } from '../factories/photographer.js';

// fetches photographers data
async function getPhotographers() {
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();
    return ({
        photographers: data.photographers
    })
}

// creates photographers galery
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
