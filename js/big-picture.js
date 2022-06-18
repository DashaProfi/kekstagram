const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureSection.querySelector('.comments-count');
const bigPictureCancel = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureComment = bigPictureSection.querySelector('.social__comment');
const bigPictureCommentUl = bigPictureSection.querySelector('.social__comments');
const bigPictureCaption = bigPictureSection.querySelector('.social__caption');
const bigPictureCommentsCountBlock = bigPictureSection.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPictureSection.querySelector('.comments-loader');


const getComments = (comment) => {

  const liComment = bigPictureComment.cloneNode(true);
  const bigPictureCommentsAvatar = liComment.querySelector('.social__picture');
  const bigPictureCommentsText = liComment.querySelector('.social__text');
  bigPictureCommentsAvatar.src =comment.avatar;
  bigPictureCommentsText.textContent = comment.message;
  bigPictureCommentsAvatar.alt = comment.name;
  bigPictureCommentUl.appendChild(liComment);
};


const getBigPicture = (photoDescriptionElement) => {
  bigPictureSection.classList.remove('hidden');
  bigPictureCommentsCountBlock.classList.add ('hidden');
  bigPictureCommentsLoader.classList.add ('hidden');
  document.body.classList.add ('modal-open');
  const bigPictureComments = bigPictureSection.querySelectorAll('.social__comment');
  bigPictureComments.forEach((oldLi) => {
    oldLi.remove();
  });
  bigPictureImg.src = photoDescriptionElement.url;
  bigPictureLikes.textContent = photoDescriptionElement.likes;
  bigPictureCommentsCount.textContent = photoDescriptionElement.comments.length;
  bigPictureCaption.textContent = photoDescriptionElement.description;
  photoDescriptionElement.comments.forEach(getComments);
};


bigPictureCancel.addEventListener('click', () => {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPictureSection.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

export {getBigPicture};
