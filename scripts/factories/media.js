function mediaFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );

        return (article);
    }
    //return autres éléments
    return { name, id, city, country, tagline, price, picture, getMediaCardDOM }
}