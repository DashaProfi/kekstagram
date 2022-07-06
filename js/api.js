import {getMiniaturePicture} from './miniatures.js';
import {showAlert} from './util.js';
import {showFilter} from './util.js';
import {sortRandomPhotos} from './util.js';
import {removeOldPhotos} from './util.js';
import {sortDiscussedPhotos} from './util.js';

let photosArray;
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

function getData() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')

    .then((response) => response.json())
    .then((photos) => {
      photosArray = photos;
      photosArray.forEach(getMiniaturePicture);
      showFilter();
    })
    .catch((err) => {
      console.error(err);
      showAlert('Не удалось загрузить данные');
    });
}

function sendData(onSuccess, onFail, onSuccessClose, body) {
  fetch('https://24.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccessClose();
        onSuccess();
      } else {
        onFail();
      }
    });
}

let timer;
const TIME = 500;

filterDefault.addEventListener('click', () => {
  clearTimeout(timer);
  timer = setTimeout(() =>{
    removeOldPhotos();
    photosArray.forEach(getMiniaturePicture);
  }, TIME);

  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
});
filterRandom.addEventListener('click', () => {
  clearTimeout(timer);
  timer = setTimeout(() =>{
    removeOldPhotos();
    sortRandomPhotos(photosArray);
  }, TIME);
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
});
filterDiscussed.addEventListener('click', ()=>{
  clearTimeout(timer);
  timer = setTimeout(() =>{
    removeOldPhotos();
    sortDiscussedPhotos(photosArray);
  }, TIME);
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');
});

export {getData};
export {sendData};
