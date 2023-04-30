function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  // generates content based on media type
  function mediaType(media) {
    if (media.video) {
      const vid = document.createElement("video");
      vid.setAttribute("width", `350`)
      vid.setAttribute("height", `300`)
      // vid.controls = "controls";
      const vidsrc = document.createElement("source");
      vidsrc.setAttribute("src", `/assets/medias/${photographerId}/${video}`);
      vidsrc.setAttribute("type", `video/mp4`);
      vidsrc.setAttribute("aria-label", `Vidéo intitulée ${media.title}`);
      vid.appendChild(vidsrc);
      return vid
    } else if (media.image) {
      const img = document.createElement("img");
      img.setAttribute("width", `350`)
      img.setAttribute("height", `300`)
      img.setAttribute("src", `/assets/medias/${photographerId}/${image}`);
      img.setAttribute("data-id", media.id);
      img.setAttribute("alt", `Photographie intitulée ${media.title}`);
      return img
    }
    else {
      console.log("error file type");
    }
  }

  // media card template
  function getMediaCardDOM() {
    const article = document.createElement('article');
    const mediaButton = document.createElement('button');
    mediaButton.setAttribute("aria-label", `Aggrandissement du média ${title}`);
    mediaButton.setAttribute("data-id", data.id);
    mediaButton.classList.add('media-button');
    // calls mediaType function 
    const media = mediaType(data);
    mediaButton.classList.add('media');

    const mediaInfos = document.createElement('div');
    mediaInfos.classList.add('media-infos');
    const mediaTitle = document.createElement('p');
    mediaTitle.classList.add('media-title');
    mediaTitle.textContent = `${title}`;
    const mediaLikes = document.createElement('p');
    mediaLikes.classList.add('media-likes');
    const heartButton = document.createElement('button');
    heartButton.setAttribute("aria-label", `Bouton d'ajout ou de soustraction d'un like`);
    heartButton.classList.add('like-button');

    const mediaHeart = document.createElement('i');
    mediaHeart.classList.add('fa-regular', 'fa-heart');
    mediaLikes.textContent = `${likes}`;
    const mediaLikesCounter = document.createElement('div');
    mediaLikesCounter.classList.add('media-likes-counter');

    article.appendChild(mediaButton);
    mediaButton.appendChild(media);
    article.appendChild(mediaInfos);
    mediaInfos.appendChild(mediaTitle);
    mediaInfos.appendChild(mediaLikesCounter);
    mediaLikesCounter.appendChild(mediaLikes);
    mediaLikesCounter.appendChild(heartButton);
    heartButton.appendChild(mediaHeart);

    return (article);
  }

  return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM }
}