const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
let id;

scaleControlSmaller.addEventListener('click', () => {
  scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - 25  }%`;
  if (parseInt(scaleControlValue.value, 10) < 25) {
    scaleControlValue.value = '25%';
  }
  previewImage.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;
});
scaleControlBigger.addEventListener('click', () => {
  scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + 25  }%`;
  if (parseInt(scaleControlValue.value, 10) > 100) {
    scaleControlValue.value = '100%';
  }
  previewImage.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;
});


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

function selectEffect (idRadio, updateOptions){
  switch (idRadio) {
    case 'effect-chrome':
      if (updateOptions === true){
        previewImage.classList.add('effects__preview--chrome');
        effectLevelSlider.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
      }
      previewImage.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'effect-sepia':
      if (updateOptions === true) {
        previewImage.classList.add('effects__preview--sepia');
        effectLevelSlider.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
      }
      previewImage.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'effect-marvin':
      if (updateOptions === true) {
        previewImage.classList.add('effects__preview--marvin');
        effectLevelSlider.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
      }
      previewImage.style.filter = `invert(${effectLevelValue.value}%)`;

      break;
    case 'effect-phobos':
      if (updateOptions === true) {
        previewImage.classList.add('effects__preview--phobos');
        effectLevelSlider.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.03,
        });
      }
      previewImage.style.filter = `blur(${effectLevelValue.value}px)`;

      break;
    case 'effect-heat':
      if (updateOptions === true) {
        previewImage.classList.add('effects__preview--heat');
        effectLevelSlider.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
      }
      previewImage.style.filter = `brightness(${effectLevelValue.value})`;

      break;
    default:
      previewImage.classList.add('effects__preview--none');
      effectLevelSlider.classList.add('hidden');
  }
}

effectLevelSlider.noUiSlider.on('update', (__, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
  previewImage.removeAttribute('style');
  selectEffect(id, false);
});

effectsList.addEventListener('click', (event) => {
  previewImage.classList.value = '';
  previewImage.removeAttribute('style');
  id = event.target.id;
  selectEffect (id, true);
});


export {previewImage};
export {effectLevelSlider};
export {scaleControlValue};

