function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function mediaType (media) {
      if (media.video) {
        const vid = document.createElement("video");
        vid.setAttribute("width", `320`)
        vid.setAttribute("height", `240`)
        const vidsrc = document.createElement("source");
        vidsrc.setAttribute("src", `/assets/medias/${photographerId}/${video}`);
        vidsrc.setAttribute("type", `video/mp4`);
        vid.appendChild(vidsrc);
        vid.controls = "controls";
        console.log(vid)
        return vid
      } else if (media.image) {
        const img = document.createElement("img");
        img.setAttribute("src", `/assets/medias/${photographerId}/${image}`);
        return img
      }
      else {
        console.log("error file type");
      }
    }

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        const media = mediaType(data);
        console.log(media)
        article.appendChild(media);
        console.log(media)




        return (article);
    }
    //return autres éléments
    return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM }
} 