const MIN_NUMBER = 0;
const MAX_NUMBER = 5;
const COMMENT = 'kkkkkkkkk';
const MAX_COMMENT = 140;


function randomInteger(minNumber, maxNumber) {
  if (MIN_NUMBER > MAX_NUMBER) {
    throw new Error('Минимальное число диапазона должно быть больше либо равно максимальному числу диапазона');
  }
  const rand = minNumber + Math.random() * (1 + maxNumber - minNumber);
  return Math.floor(rand);
}

randomInteger(MIN_NUMBER, MAX_NUMBER);
console.log(randomInteger(MIN_NUMBER, MAX_NUMBER));


function checkCommentLength(comment, maxComment) {
  if (comment.length <= maxComment) {
    console.log('Комментарий проходит по длинне');
  } else {
    console.log(`Комментарий не проходит по длинне и должен быть меньше ${maxComment}`);
  }
}

checkCommentLength(COMMENT, MAX_COMMENT);

export { randomInteger };
