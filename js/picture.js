/**
 * @file Модуль показа полной фотографии
 * @author Yuriy Bevov
 */

'use strict';

(function () {
  var showElem = window.util.showElem;
  var hideElem = window.util.hideElem;
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var commentsLoader = window.commentsLoader;

  var picture = document.querySelector('.big-picture');
  var closeBtn = document.querySelector('.big-picture__cancel');
  var userComments = document.querySelector('.social__comments');

  var img = document.querySelector('.big-picture__img > img');
  var likes = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var description = document.querySelector('.social__caption');
  document.querySelector('.social__comment-count').classList.add('visually-hidden'); // временно
  document.querySelector('.comments-loader').classList.add('visually-hidden'); // временно

  var showFullPicture = function () {
    showElem(picture);
    document.addEventListener('keydown', function (escEvt) {
      if (escEvt.keyCode === ESC_KEYCODE) {
        hideElem(picture);
      }
    });
    closeBtn.addEventListener('click', function () {
      hideElem(picture);
    });
  };

  function fillPhotoComment(element, comment) {
    element.querySelector('.social__picture').src = comment.avatar;
    element.querySelector('.social__text').innerText = comment.message;
  }


  function createCommentsNode(photos, comments) { // xhr.response[0], xhr.response[0].comments
    var fragment = document.createDocumentFragment();
    var previousComments = document.querySelectorAll('.social__comment');
    var commentsArray = []; // *

    for (var i = 0; i < previousComments.length; i++) {
      var deleteComment = document.querySelector('.social__comment');
      userComments.removeChild(deleteComment);
    }

    img.src = photos.url;
    img.alt = photos.description;
    description.innerHTML = photos.description;
    likes.innerHTML = photos.likes;
    commentsCount.innerHTML = photos.comments.length;

    for (var j = 0; j < comments.length; j++) {
      var userComment = document.querySelector('#social').content.cloneNode(true);
      var currentComment = comments[j];

      fillPhotoComment(userComment, currentComment);

      fragment.appendChild(userComment);
      commentsArray.push(comments[j]); // *
    }
    userComments.appendChild(fragment);
    showFullPicture();

    if (commentsArray.length > 5) {
      commentsLoader();
    }
  }

  window.picture = {
    showFullPicture: showFullPicture,
    createCommentsNode: createCommentsNode
  };
}());
