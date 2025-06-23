export const renderGallery = images => {
    const gallery = document.querySelector('.gallery');
    const markup = images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div class='photo-card'>
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <div>
              <p>Likes</p>
              <p>${likes}</p>
            </div>
            <div>
              <p>Views</p>
              <p>${views}</p>
            </div>
            <div>
              <p>Comments</p>
              <p>${comments}</p>
            </div>
            <div>
              <p>Downloads</p>
              <p>${downloads}</p>
            </div>
          </div>
        </div>`
      )
      .join('');
  
    gallery.insertAdjacentHTML('beforeend', markup);
  };
  
  export const clearGallery = () => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
  };