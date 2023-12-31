import { fetchImg } from "./fetch-img";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchQuery = document.querySelector('.searchQuery');
const perPage = 40;

let galleryLightbox = new SimpleLightbox('.gallery a');

let page;
let totalHits;
resetPaginator()

loadMoreBtn.classList.add('is-hidden');

function requestAndDisplay() {
  loadMoreBtn.classList.add('is-hidden');

  if (!searchValueIsCorrect()) {
    Notify.failure("Search request is required")
    resetPaginator()
    return
  }

  if (!hasNextPage()) {
    Notify.failure("We're sorry, but you've reached the end of search results.")
    return;
  }

  fetchImg(searchValueIsCorrect(), page, perPage)
    .then(response => {
      const isSearchRequest = totalHits === -1

      totalHits = parseInt(response.totalHits)

      if (isSearchRequest) {
        Notify.info(`Hooray! We found ${totalHits} images.`)
      }

      if (hasNextPage()) {
        loadMoreBtn.classList.remove('is-hidden');
      }

      const htmlForRender = response.hits.map(({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads
        }) => {
        return `<div class="photo-card">

    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
  })
      .join('')

      gallery.insertAdjacentHTML('beforeend', htmlForRender);

      galleryLightbox.refresh();

      const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight,
  behavior: "smooth",
});

    }
  )
    .catch(error => 'Please enter correct value');
}

function resetPaginator() {
  page = 1;
  totalHits = -1
}

function searchValueIsCorrect() {
  const value = searchQuery.value.trim()

  if (value.length  === 0) {
    return false;
  }

  return value;
}

function hasNextPage() {
  const result = totalHits >= perPage * page

  return result || totalHits == -1;
}

function onFormSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  resetPaginator()
  requestAndDisplay()

}


searchForm.addEventListener('submit', onFormSubmit);

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore(event) {
  page += 1;
  requestAndDisplay();
}

