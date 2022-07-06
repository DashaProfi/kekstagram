const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureSection.querySelector('.comments-count');
const bigPictureCancel = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureComment = bigPictureSection.querySelector('.social__comment');
const bigPictureCommentUl = bigPictureSection.querySelector('.social__comments');
const bigPictureCaption = bigPictureSection.querySelector('.social__caption');
const bigPictureCurrentCommentsCount = bigPictureSection.querySelector('.comments-count__current');
const bigPictureCommentsLoader = bigPictureSection.querySelector('.comments-loader');
const overlay = document.querySelector('.overlay');
const SLICE_ADD = 5;
let bigPictureCommentsLoaderCopy;
let commentStartSlice;


const getComments = (comment) => {
  const liComment = bigPictureComment.cloneNode(true);
  const bigPictureCommentsAvatar = liComment.querySelector('.social__picture');
  const bigPictureCommentsText = liComment.querySelector('.social__text');
  bigPictureCommentsAvatar.src = comment.avatar;
  bigPictureCommentsText.textContent = comment.message;
  bigPictureCommentsAvatar.alt = comment.name;
  bigPictureCommentUl.appendChild(liComment);
};

const getCurrentComments = (comments, commentStartSliceArg) => {
  console.log('comments', comments);
  console.log('commentStartSliceArg', commentStartSliceArg);

  const commentsSliced = comments.slice(commentStartSliceArg, commentStartSliceArg + SLICE_ADD);
  commentsSliced.forEach(getComments);

  let commentsEnd = comments.length - commentStartSliceArg - SLICE_ADD;

  if (comments.length <= 5 && bigPictureCommentsLoaderCopy) {
    bigPictureCommentsLoaderCopy.remove();
  }
  if (commentsEnd <= 0) {
    commentsEnd = 0;
    bigPictureCommentsLoaderCopy.remove();
  }
  const commentsShowed = comments.length - commentsEnd;
  bigPictureCurrentCommentsCount.textContent = `${commentsShowed}`;
};

const getBigPicture = (photoDescriptionElement) => {
  bigPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const bigPictureComments = bigPictureSection.querySelectorAll('.social__comment');
  bigPictureComments.forEach((oldLi) => {
    oldLi.remove();
  });
  bigPictureImg.src = photoDescriptionElement.url;
  bigPictureLikes.textContent = photoDescriptionElement.likes;
  bigPictureCommentsCount.textContent = String(photoDescriptionElement.comments.length);
  bigPictureCaption.textContent = photoDescriptionElement.description;

  commentStartSlice = 0;
  getCurrentComments(photoDescriptionElement.comments, commentStartSlice);

  if (photoDescriptionElement.comments.length > 5) {
    bigPictureCommentsLoaderCopy = bigPictureCommentsLoader.cloneNode(true);
    bigPictureCommentsLoaderCopy.classList.remove('hidden');
    bigPictureCommentUl.insertAdjacentElement('afterend', bigPictureCommentsLoaderCopy);
    bigPictureCommentsLoaderCopy.addEventListener('click', () => {
      commentStartSlice = commentStartSlice + SLICE_ADD;
      getCurrentComments(photoDescriptionElement.comments, commentStartSlice);
    });
  }
};


function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

bigPictureCancel.addEventListener('click', closeBigPicture);

overlay.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('overlay')) {
    closeBigPicture();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

export {getBigPicture};
