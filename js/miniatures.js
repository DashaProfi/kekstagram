import {photoDescriptionsArray} from './data.js';
import {getBigPicture} from './big-picture.js';

const pictureContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');


const getMiniaturePictures = (photoDescriptionElement) => {
  const userPictureLink = templateFragment.cloneNode(true);
  const pictureImg = userPictureLink.querySelector('.picture__img');
  const likes = userPictureLink.querySelector('.picture__likes');
  const comments = userPictureLink.querySelector('.picture__comments');

  pictureImg.src = photoDescriptionElement.url;
  likes.textContent = photoDescriptionElement.likes;
  comments.textContent = photoDescriptionElement.comments.length;

  userPictureLink.addEventListener('click', (event) => getBigPicture(photoDescriptionElement));
  pictureContainer.appendChild(userPictureLink);
};

photoDescriptionsArray.forEach(getMiniaturePictures);



// const getBigPictureContaner = (event) => {
//   console.log ('Contaner event.target', event.target);
//   console.log ('Contanerevent.currentTarget', event.currentTarget);
//   console.log('Contaner this', this);
// }
//
// pictureContainer.addEventListener('click', getBigPictureContaner);
