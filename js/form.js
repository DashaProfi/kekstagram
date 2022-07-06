import {previewImage} from './scale_&_effects.js';
import {effectLevelSlider} from './scale_&_effects.js';
import {scaleControlValue} from './scale_&_effects.js';
import {sendData} from './api.js';

const uploadFile = document.querySelector('#upload-file');
const formWindow = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const userCommentElement = document.querySelector('.text__description');
const previewImg = document.querySelector('.img-upload__preview img');
const userHashtagElement = document.querySelector('.text__hashtags');
const effectRadioOriginal = document.querySelector('.effects__radio');
const form = document.querySelector('#upload-select-image');
const successTemplateFragment = document.querySelector('#success').content.querySelector('.success');
const errorTemplateFragment = document.querySelector('#error').content.querySelector('.error');


const MAX_COMMENT = 140;
const MAX_HASHTAG = 20;
const regExp = /[^a-zA-Z0-9а-яА-Я]/;

uploadFile.addEventListener('change', () => {
  formWindow.classList.remove('hidden');
  body.classList.add('modal-open');
  previewImg.src = URL.createObjectURL(uploadFile.files[0]);
});

function showSuccessMessage() {
  const successMessage = successTemplateFragment.cloneNode(true);
  body.appendChild(successMessage);
  const successButton = document.querySelector('.success__button');
  function closeSuccessMessage() {
    const oldSuccessMessage = document.querySelector('.success');
    oldSuccessMessage.remove();
  }
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  });
  document.addEventListener('click', (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains('success')) {
      closeSuccessMessage();
    }
  });

}

function showErrorMessage() {
  const errorMessage = errorTemplateFragment.cloneNode(true);
  body.appendChild(errorMessage);
  const errorButton = document.querySelector('.error__button');
  console.log(errorMessage);
  function closeErrorMessage() {
    const oldErrorMessage = document.querySelector('.error');
    oldErrorMessage.remove();
  }
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  });
  document.addEventListener('click', (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains('error')) {
      closeErrorMessage();
    }
  });
}


function closeForm() {
  formWindow.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  previewImage.classList.value = '';
  previewImage.classList.add('effects__preview--none');
  previewImage.removeAttribute('style');
  effectLevelSlider.classList.add('hidden');
  effectRadioOriginal.checked = true;
  scaleControlValue.value = '100%';
  userCommentElement.value = '';
  userHashtagElement.value = '';
}

uploadCancel.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement !== userCommentElement && document.activeElement !== userHashtagElement) {
      closeForm();
    }
  }
});

function checkCommentLength(userComment, maxComment) {
  if (userComment.value.length > maxComment) {
    userComment.setCustomValidity(`Комментарий не проходит по длинне и должен быть меньше ${maxComment}`);
  }
  userComment.style.border = 'solid red 2px';
  userComment.style.outline = 'none';
  userComment.reportValidity();
}

userCommentElement.addEventListener('change', () => {
  checkCommentLength(userCommentElement, MAX_COMMENT);
});


function checkHashtags(userHashtagText, maxHashtag, userHashtagInput) {
  if (userHashtagText[0] !== '#') {
    userHashtagInput.setCustomValidity('Xэш-тег начинается с символа # (решётка)');
    return true;
  } else if (regExp.test(userHashtagText.slice(1))) {
    userHashtagInput.setCustomValidity('Хэш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
    return true;
  } else if (userHashtagText.length > maxHashtag || userHashtagText.length === 1) {
    userHashtagInput.setCustomValidity(`Xэш-тег не может состоять только из одной решётки, а максимальная длина одного хэш-тега должна быть ${maxHashtag} символов, включая решётку`);
    return true;
  } else {
    userHashtagInput.style.border = 'solid red 2px';
    userHashtagInput.style.outline = 'none';
    userHashtagInput.setCustomValidity('');
  }
}

userHashtagElement.addEventListener('change', () => {
  const hashtagArrayNotChecked = userHashtagElement.value.toLowerCase().split(' ');
  console.log(hashtagArrayNotChecked);
  const hashtagArray = hashtagArrayNotChecked.filter((item) => item !== '');
  console.log(hashtagArray);

  if (hashtagArray.length > 5) {
    userHashtagElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else {
    userHashtagElement.setCustomValidity('');
    for (let index = 0; index < hashtagArray.length; index++) {
      const isError = checkHashtags(hashtagArray[index], MAX_HASHTAG, userHashtagElement);
      if (isError) {
        break;
      }
    }
  }
  userHashtagElement.reportValidity();
});


function formSubmit (){
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(showSuccessMessage, showErrorMessage, closeForm, new FormData(evt.target));
  });
}

export {formSubmit};
export {closeForm};
