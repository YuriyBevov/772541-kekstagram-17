/**
 * @file Модуль показа полной фотографии
 * @author Yuriy Bevov
 */

'use strict';

(function () {
  var showElem = window.util.showElem;
  var hideElem = window.util.hideElem;
  var ESC_KEYCODE = window.util.ESC_KEYCODE;

  var picture = document.querySelector('.big-picture');
  var closeBtn = document.querySelector('.big-picture__cancel');
  var userComments = document.querySelector('.social__comments');

  var showFullPicture = function (photos) {
    showElem(picture);
    document.addEventListener('keydown', function (escEvt) {
      if (escEvt.keyCode === ESC_KEYCODE) {
        hideElem(picture);
      }
    });
    closeBtn.addEventListener('click', function () {
      hideElem(picture);
    });

    var previousComments = document.querySelectorAll('.social__comment');

    for (var i = 0; i < previousComments.length; i++) {
      var currentComment = document.querySelector('.social__comment');
      userComments.removeChild(currentComment);
    }

    var img = document.querySelector('.big-picture__img > img');
    var likes = document.querySelector('.likes-count');
    var commentsCount = document.querySelector('.comments-count');
    var description = document.querySelector('.social__caption');
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');

    img.src = photos.url;
    likes.innerHTML = photos.likes;
    commentsCount.innerHTML = photos.comments.length;
    description.innerHTML = photos.description;
  };

  function fillPhotoComment(element, comment) {
    element.querySelector('.social__picture').src = comment.avatar;
    element.querySelector('.social__text').innerText = comment.message;
  }

  function createCommentsNode(comments) { // xhr.response[0].comments
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var userComment = document.querySelector('#social').content.cloneNode(true);
      var currentComment = comments[i];

      fillPhotoComment(userComment, currentComment);

      fragment.appendChild(userComment);
    }
    userComments.appendChild(fragment);
  }

  window.picture = {
    showFullPicture: showFullPicture,
    createCommentsNode: createCommentsNode
  };
}());
