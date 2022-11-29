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

    //function getuserheaderdom à créer

    //return autres éléments
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}