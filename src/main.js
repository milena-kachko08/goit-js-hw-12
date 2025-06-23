import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const query = form.elements.search.value.trim();

  if (!query) {
    showWarning('Search query cannot be empty!');
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  toggleLoader(true);
  toggleLoadMore(false);

  try {
    const { data } = await fetchImages(currentQuery, currentPage, perPage);

    if (data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    renderGallery(data.hits);

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }

    if (currentPage * perPage >= data.totalHits) {
      showInfo("We're sorry, but you've reached the end of search results.");
    } else {
      toggleLoadMore(true);
    }
  } catch (error) {
    showError(`Something went wrong: ${error.message}`);
  } finally {
    toggleLoader(false);
  }
}

async function onLoadMore() {
  currentPage += 1;

  toggleLoadMore(false);
  toggleLoader(true);

  try {
    const { data } = await fetchImages(currentQuery, currentPage, perPage);

    renderGallery(data.hits);
    lightbox.refresh();
    if (currentPage * perPage >= data.totalHits) {
      showInfo("We're sorry, but you've reached the end of search results.");
    } else {
      toggleLoadMore(true);
    }

    smoothScroll();
  } catch (error) {
    showError(`Something went wrong: ${error.message}`);
  } finally {
    toggleLoader(false);
  }
}

function showWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message,
    position: 'topRight',
  });
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}

function showInfo(message) {
  iziToast.info({
    title: 'Info',
    message,
    position: 'topRight',
  });
}

function smoothScroll() {
  const galleryCard = document.querySelector('.photo-card');
  if (galleryCard) {
    window.scrollBy({
      top: galleryCard.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });
  }
}

function toggleLoader(isLoading) {
  loader.style.display = isLoading ? 'block' : 'none';
}

function toggleLoadMore(isDisplaying) {
  loadMore.style.display = isDisplaying ? 'block' : 'none';
}