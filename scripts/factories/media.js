function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function mediaType (media) {
      if (media.video) {
        return '<video width="320" height="240" controls> <source src="/assets/medias/${photographerId}/${video}" type="video/mp4"> </video>';
      } else if (media.image) {
        return '<img src="/assets/medias/${photographerId}/${image}">';
      }
      else {
        console.log("error file type");
      }
    }

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        const media = mediaType(data);
        article.appendChild(media);
        console.log(media)




        return (article);
    }
    //return autres éléments
    return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM }
}