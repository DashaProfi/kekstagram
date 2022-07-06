import {getMiniaturePicture} from './miniatures.js';

const MIN_NUMBER = 0;
const MAX_NUMBER = 5;
const ALERT_SHOW_TIME = 5000;
const filter = document.querySelector('.img-filters');


function randomInteger(minNumber, maxNumber) {
  if (MIN_NUMBER > MAX_NUMBER) {
    throw new Error('Минимальное число диапазона должно быть меньше либо равно максимальному числу диапазона');
  }
  if (MIN_NUMBER || MAX_NUMBER < 0) {
    throw new Error('Минимальное и максимальное число диапазона должно быть больше либо равно 0');
  }
  const rand = minNumber + Math.random() * (1 + maxNumber - minNumber);
  return Math.floor(rand);
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function showFilter() {
  filter.classList.remove('img-filters--inactive');
}

function sortRandomPhotos(array) {
  const sortedArray = [];
  for (let index = 0; index < 10; index++) {
    const randomPhoto = randomInteger(MIN_NUMBER, array.length - 1);
    const photo = array[randomPhoto];
    if (sortedArray.includes(photo)) {
      index--;
      continue;
    }
    sortedArray.push(photo);
  }

  sortedArray.forEach(getMiniaturePicture);
}

function removeOldPhotos() {
  const oldPhotos = document.querySelectorAll('.picture');
  oldPhotos.forEach((photo) => {
    photo.remove();
  });
}

function sortDiscussedPhotos(array) {
  const copyArray = JSON.parse(JSON.stringify(array));
  copyArray.sort((first, second) => second.comments.length - first.comments.length);
  copyArray.forEach(getMiniaturePicture);
}

export {showAlert};
export {showFilter};
export {sortRandomPhotos};
export {removeOldPhotos};
export {sortDiscussedPhotos};
