export function createMarkup(arrImg, lightbox, refs) {
  const imgMarkup = arrImg
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<a href="${largeImageURL}" class="lightbox">
           <div class="photo-card">
             <img src="${webformatURL}" alt="${tags}" loading="lazy" />
             <div class="info">
              <p class="info-item">
                 <b>Likes</b> ${likes}
               </p>
               <p class="info-item">
                 <b>Views</b> ${views}
               </p>
              <p class="info-item">
                 <b>Comments</b> ${comments}
               </p>
               <p class="info-item">
                 <b>Downloads</b> ${downloads}
               </p>
            </div>
           </div>
         </a>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', imgMarkup);

  lightbox.refresh();
}
