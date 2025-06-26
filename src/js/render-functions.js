import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

export const renderGallery = images => {
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
            <div><p>Likes</p><p>${likes}</p></div>
            <div><p>Views</p><p>${views}</p></div>
            <div><p>Comments</p><p>${comments}</p></div>
            <div><p>Downloads</p><p>${downloads}</p></div>
          </div>
        </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const showLoader = () => {
  document.querySelector('.loader')?.classList.remove('hidden');
};

export const hideLoader = () => {
  document.querySelector('.loader')?.classList.add('hidden');
};

export const showLoadMoreButton = () => {
  document.querySelector('.load-more')?.classList.remove('hidden');
};

export const hideLoadMoreButton = () => {
  document.querySelector('.load-more')?.classList.add('hidden');
};
