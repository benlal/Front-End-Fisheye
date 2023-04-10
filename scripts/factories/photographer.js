function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    
    const picture = `assets/photographers/${portrait}`;
    const photographerPage = `./photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const a = document.createElement('a');
        a.setAttribute("href", photographerPage);
        a.setAttribute("aria-label", `Accès à la page de ${name}`);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de ${name}`);

        const h2 = document.createElement('h2');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');


        h2.textContent = name;
        p1.textContent = `${city}, ${country}`;
        p1.classList.add('photographer-location');
        p2.textContent = tagline;
        p2.classList.add('photographer-tagline');
        p3.textContent = `${price}€/jour`;
        p3.classList.add('photographer-price');

        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        return (article);
    }

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

        // ajout récent
        photographerLikes.innerHTML = `<span id="photograph-likes-value">${sumLikes}</span> likes`
        photographerLikes.classList.add('photographer-price');
        //

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

    //return autres éléments
    return { name, id, city, country, tagline, price, picture, getUserHeaderDOM, getUserCardDOM }
}