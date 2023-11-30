import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { apiFetch } from './api-res';
import { createMarkup } from './markup';

const refs = {
  form: document.querySelector('.search-form'),
  loadBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

const { form, loadBtn, gallery } = refs;

loadBtn.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', handleLoadMore);

function handleSubmit(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  currentPage = 1;
  console.log(searchQuery);
  if (searchQuery === '') {
    Notiflix.Notify.failure('Please enter a search query');
    return;
  }

  realizeSearch(searchQuery, currentPage);
  e.target.reset();
  gallery.innerHTML = '';
}

function handleLoadMore() {
  currentPage += 1;
  realizeSearch(searchQuery, currentPage);
}

function showLoadMore(show) {
  loadBtn.style.display = show ? 'block' : 'none';
}

function realizeSearch(query, page) {
  apiFetch(query, page)
    .then(resp => {
      const { hits, totalHits } = resp;
      if (hits.length === 0) {
        showLoadMore(false);
        Notiflix.Notify.info("We're sorry. No more images to load.");
      } else {
        createMarkup(hits, lightbox, refs);
        showLoadMore(hits.length <= 40);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
    })
    .catch(err => {
      const errMessage = page === 1 ? 'form submit' : 'load more';
      console.error(`Error handling ${errMessage}:`, err);
      const errNotification =
        page === 1
          ? 'Oops! Something went wrong. Please try again.'
          : 'Oops! Something went wrong while loading more images. Please try again.';
      Notiflix.Notify.failure(errNotification);
    });
}
