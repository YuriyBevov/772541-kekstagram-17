/**
 * @file Модуль показа полной фотографии
 * @author Yuriy Bevov
 */

'use strict';

(function () {
  var showElem = window.util.showElem;
  var hideElem = window.util.hideElem;
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var hideComments = window.hideComments;

  var picture = document.querySelector('.big-picture');
  var closeBtn = document.querySelector('.big-picture__cancel');
  var userComments = document.querySelector('.social__comments');

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

  var imgNode = document.querySelector('.big-picture__img > img');
  var photoLikesCount = document.querySelector('.likes-count');
  var currentCommentsCount = document.querySelector('.social__comment-count'); //  надпись количества показанных комментариев
  // var commentsCount = document.querySelector('.comments-count'); // общее количество комментариев к фото
  var photoDescription = document.querySelector('.social__caption');
  // document.querySelector('.social__comment-count').classList.add('visually-hidden'); // временно
  // document.querySelector('.comments-loader').classList.add('visually-hidden'); // временно

  var commentNode = document.querySelector('#social');

  function fillPhotoComment(element, comment) {
    element.querySelector('.social__picture').src = comment.avatar;
    element.querySelector('.social__text').innerText = comment.message;
  }

  function createCommentsNode(photos, comments) { // xhr.response[0], xhr.response[0].comments
    var VISIBLE_COMMENTS = 5;
    var fragment = document.createDocumentFragment();
    var commentsArray = []; // * для 71й строчки

    while (userComments.firstChild) {
      userComments.removeChild(userComments.firstChild);
    }

    imgNode.src = photos.url;
    imgNode.alt = photos.description;
    photoDescription.innerText = photos.description;
    photoLikesCount.innerText = photos.likes;
    // commentsCount.innerText = photos.comments.length;

    for (var i = 0; i < comments.length; i++) {
      var userComment = commentNode.content.cloneNode(true);
      var currentComment = comments[i];

      fillPhotoComment(userComment, currentComment);

      fragment.appendChild(userComment);
      commentsArray.push(comments[i]); // *
    }

    userComments.appendChild(fragment);

    var hideCommentsBtn = function () {
      if (commentsArray.length < VISIBLE_COMMENTS) {
        document.querySelector('.comments-loader').classList.add('visually-hidden');
      }
    };

    currentCommentsCount.innerText = commentsArray.length + ' из ' + photos.comments.length + ' комментариев';

    hideCommentsBtn();
    showFullPicture();

    if (commentsArray.length > VISIBLE_COMMENTS) {
      hideComments();
    }
  }

  window.picture = {
    showFullPicture: showFullPicture,
    createCommentsNode: createCommentsNode
  };
}());
