function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const photographerPage = `./photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const a = document.createElement( 'a' );
        a.setAttribute("href", photographerPage );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de ${name}`);
        
        const h2 = document.createElement( 'h2' );
        const p1 = document.createElement( 'p' );  
        const p2 = document.createElement( 'p' );
        const p3 = document.createElement( 'p' );
        

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
    
    function getUserHeaderDOM() {
        
        const photographerHeader = document.querySelector('.photograph-header');
        const photographerInformations = document.createElement( 'div' );

        const h1 = document.createElement('h1');
        const p1 = document.createElement('p');  
        const p2 = document.createElement('p');

        const contactButton = document.querySelector('.contact_button');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de ${name}`);
        
        h1.textContent = name;
        p1.textContent = `${city}, ${country}`;
        p1.classList.add('photographer-location');
        p2.textContent = tagline;
        p2.classList.add('photographer-tagline');

        //

        const secondaryInformations = document.createElement('div');
        secondaryInformations.classList.add('secondary_informations');

        const p3 = document.createElement('p');
        const p4 = document.createElement('p');

        p3.textContent = `${price}€/jour`;
        p3.classList.add('photographer-price');

        p4.textContent = `88 likes`
        p4.classList.add('photographer-price');

        //

        photographerHeader.appendChild(photographerInformations);
        photographerInformations.appendChild(h1);
        photographerInformations.appendChild(p1);
        photographerInformations.appendChild(p2);

        photographerHeader.appendChild(contactButton);

        photographerHeader.appendChild(img);
        
        //
        
        photographerHeader.appendChild(secondaryInformations);
        secondaryInformations.appendChild(p4);
        secondaryInformations.appendChild(p3);

        //

        return (photographerHeader);
    }

    //return autres éléments
    return { name, id, city, country, tagline, price, picture, getUserHeaderDOM, getUserCardDOM }
}