import { fetchImg } from "./fetch-img";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const userInput = document.querySelector('.search-form');
const galley = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more'),

function fetchImgDetails(imgArray) {
  const dataArray = imgArray
    .map
    (
      (
        {
         webformatURL,
         largeImageUR,
         tags,
         likes,
         views,
        comments,
          downloads }
      ) => { return `<div class="photo-card">
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
      }
    )
    .join('');
  galley.insertAdjacentHTML('beforeend', dataArray);
  lightbox.refresh();
};




userInput.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(imgArray) {
  imgArray.preventDefault();
  galley.innerHTML = '';

}

