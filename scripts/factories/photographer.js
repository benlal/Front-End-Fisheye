export function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const photographerPage = `./photographer.html?id=${id}`;

    // photographer card template (index page)
    function getUserCardDOM() {
        const article = document.createElement('article');

        const a = document.createElement('a');
        a.setAttribute("href", photographerPage);
        a.setAttribute("aria-label", `Accéder à la page de ${name}`);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de ${name}`);

        const photographerName = document.createElement('h2');
        const photographerLocation = document.createElement('p');
        const photographerTagline = document.createElement('p');
        const photographerPrice = document.createElement('p');

        photographerName.textContent = name;
        photographerLocation.textContent = `${city}, ${country}`;
        photographerLocation.classList.add('photographer-location');
        photographerTagline.textContent = tagline;
        photographerTagline.classList.add('photographer-tagline');
        photographerPrice.textContent = `${price}€/jour`;
        photographerPrice.classList.add('photographer-price');

        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(photographerName);
        a.appendChild(photographerLocation);
        a.appendChild(photographerTagline);
        a.appendChild(photographerPrice);
        return (article);
    }

    // generates header for the photographer page
    function getUserHeaderDOM(sumLikes) {

        const photographerHeader = document.querySelector('.photograph-header');

        const photographerInformations = document.createElement('div');
        const photographerName = document.createElement('h1');
        const photographerLocation = document.createElement('h2');
        const photographerTagline = document.createElement('p');

        const contactButton = document.querySelector('.contact_button');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de ${name}`);

        photographerName.textContent = name;
        photographerLocation.textContent = `${city}, ${country}`;
        photographerLocation.classList.add('photographer-location');
        photographerTagline.textContent = tagline;
        photographerTagline.classList.add('photographer-tagline');

        const secondaryInformations = document.createElement('div');
        secondaryInformations.classList.add('secondary_informations');

        const photographerPrice = document.createElement('p');
        const photographerLikes = document.createElement('p');

        photographerPrice.textContent = `${price}€/jour`;
        photographerPrice.classList.add('photographer-price');

        photographerLikes.innerHTML = `<span id="photograph-likes-value">${sumLikes}</span> likes`
        photographerLikes.classList.add('photographer-price');

        photographerHeader.appendChild(photographerInformations);
        photographerInformations.appendChild(photographerName);
        photographerInformations.appendChild(photographerLocation);
        photographerInformations.appendChild(photographerTagline);

        photographerHeader.appendChild(contactButton);

        photographerHeader.appendChild(img);

        photographerHeader.appendChild(secondaryInformations);
        secondaryInformations.appendChild(photographerLikes);
        secondaryInformations.appendChild(photographerPrice);

        return (photographerHeader);
    }

    return { name, id, city, country, tagline, price, picture, getUserHeaderDOM, getUserCardDOM }
}