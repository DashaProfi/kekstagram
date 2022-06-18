import {randomInteger} from './util.js';

const MIN_NUMBER_ARRAY_ELEMENT = 0;
const MIN_NUMBER_ID = 0;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const MAX_NUMBER_ID_AVATAR = 1000000;
const MIN_NUMBER_PHOTO_DESCRIPTIONS = 1;
const MAX_NUMBER_PHOTO_DESCRIPTIONS = 25;
const MIN_NUMBER_PHOTO = 1;
const MAX_NUMBER_PHOTO = 25;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const getRandomArrayElement = (elements) => (elements[randomInteger(MIN_NUMBER_ARRAY_ELEMENT, elements.length - 1)]);

const createComment = () => (
  {
    id: randomInteger(MIN_NUMBER_ID, MAX_NUMBER_ID_AVATAR),
    avatar: `img/avatar-${randomInteger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
);


const generateCommentsArray = () => {
  const commentsArray = Array.from({length: 5}, createComment);
  return commentsArray;
};


const arrId = [];
const arrUrl = [];

const createPhotoDescription = () => {
  let randomId = randomInteger(MIN_NUMBER_PHOTO_DESCRIPTIONS, MAX_NUMBER_PHOTO_DESCRIPTIONS);
  while (arrId.includes(randomId)) {
    randomId = randomInteger(MIN_NUMBER_PHOTO_DESCRIPTIONS, MAX_NUMBER_PHOTO_DESCRIPTIONS);
  }
  let randomUrl = `photos/${randomInteger(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO)}.jpg`;
  while (arrUrl.includes(randomUrl)) {
    randomUrl = `photos/${randomInteger(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO)}.jpg`;
  }
  arrId.push(randomId);
  arrUrl.push(randomUrl);


  return {
    id: randomId,
    url: randomUrl,
    description: 'Красивая фотография',
    likes: randomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
    comments: generateCommentsArray(),
  };
};


const photoDescriptionsArray = Array.from({length: MAX_NUMBER_PHOTO}, createPhotoDescription);

console.log(photoDescriptionsArray);
export {photoDescriptionsArray};
export {generateCommentsArray};
