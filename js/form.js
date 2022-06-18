const uploadFile = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const userCommentElement = document.querySelector('.text__description');
const previewImg = document.querySelector('.img-upload__preview img');
const userHashtagElement = document.querySelector('.text__hashtags');
const MAX_COMMENT = 140;
const MAX_HASHTAG = 20;
const regExp = /[^a-zA-Z0-9а-яА-Я]/;

uploadFile.addEventListener('change', () => {
  form.classList.remove('hidden');
  body.classList.add('modal-open');
  previewImg.src = URL.createObjectURL(uploadFile.files[0]);
});

uploadCancel.addEventListener('click', () => {
  form.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement !== userCommentElement && document.activeElement !== userHashtagElement) {
      form.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  }
});

function checkCommentLength(userComment, maxComment) {
  if (userComment.value.length > maxComment) {
    userComment.setCustomValidity(`Комментарий не проходит по длинне и должен быть меньше ${maxComment}`);
  }
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
    userHashtagInput.setCustomValidity('');
  }
}

userHashtagElement.addEventListener('change', () => {
  const hashtagArrayNotChecked = userHashtagElement.value.toLowerCase().split(' ');
  console.log(hashtagArrayNotChecked);
  const hashtagArray = hashtagArrayNotChecked.filter((item) =>  item !== '');
  console.log(hashtagArray);

  if (hashtagArray.length > 2) {
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


