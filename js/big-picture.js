const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img');
const commentList = bigPicture.querySelector('.social__comments');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const commentCounter = bigPicture.querySelector('.social__comment-count');


let commentCount = 0;

const isEscapeKey = (evt) => evt.key === 'Escape';

function handleEscapeKey(event) {
  if (isEscapeKey(event)) {
    closeBigPicture();
  }
}

function showElements(comments, count) {
  Array.from(comments).forEach((comment, index) => {
    comment.style.display = index < count ? 'flex' : 'none';
  });
}

function createCommentElement({ avatar, name, message }) {
  const commentHTML = `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>
  `;
  commentList.innerHTML += commentHTML;
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', handleEscapeKey);
  closeButton.removeEventListener('click', closeBigPicture);

  commentList.innerHTML = '';
  commentCounter.textContent = '';
}

function openBigPicture(url, description, likes, comments) {
  bigPicture.classList.remove('hidden');
  bigPictureImg.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  commentCount = Math.min(comments.length, 5);

  comments.forEach((comment) => createCommentElement(comment));

  showElements(commentList.children, commentCount);
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', handleEscapeKey);
  closeButton.addEventListener('click', closeBigPicture);
}

export { openBigPicture };
