import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

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
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);

    if (data.hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderGallery(data.hits);

    if (currentPage * perPage < data.totalHits) {
      showLoadMoreButton();
    } else {
      showInfo("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showError(`Something went wrong: ${error.message}`);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);

    renderGallery(data.hits);

    if (currentPage * perPage >= data.totalHits) {
      showInfo("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton();
    }

    smoothScroll();
  } catch (error) {
    showError(`Something went wrong: ${error.message}`);
  } finally {
    hideLoader();
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
