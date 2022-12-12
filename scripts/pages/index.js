    async function getPhotographers() {
        // fetch les données des photographes
        const response = await fetch('../../data/photographers.json');
        //définit response comme étant du json
        const data = await response.json();
        // retour des valeurs
        return ({
            //définit photographers à partir de l'array photographers présent dans photographers.json
            photographers: data.photographers})
    }

    async function displayData(photographers) {
        //sélectionne la div avec comme classe photographer_section
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    