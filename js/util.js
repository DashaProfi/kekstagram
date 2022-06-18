const MIN_NUMBER = 0;
const MAX_NUMBER = 5;

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

export {randomInteger};

