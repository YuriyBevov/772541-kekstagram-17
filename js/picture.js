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

  var showFullPicture = function () {
    showElem(picture);

    var closePictureWithEsc = function (escEvt) {
      if (escEvt.keyCode === ESC_KEYCODE) {
        hideElem(picture);
        commentsPointer = 0;
        document.removeEventListener('keydown', closePictureWithEsc);
      }
    };

    document.addEventListener('keydown', closePictureWithEsc);

    closeBtn.addEventListener('click', function () {
      hideElem(picture);
      commentsPointer = 0;
    });
  };

  var imgNode = document.querySelector('.big-picture__img > img');
  var photoLikesCount = document.querySelector('.likes-count');
  var currentCommentsCount = document.querySelector('.social__comment-count');
  var photoDescription = document.querySelector('.social__caption');
  var commentsLoaderBtn = document.querySelector('.comments-loader');
  var VISIBLE_COMMENTS = 5;
  var commentsPointer = 0;
  var commentNode = document.querySelector('#social');

  var fillPhotoComment = function (element, comment) {
    element.querySelector('.social__picture').src = comment.avatar;
    element.querySelector('.social__text').innerText = comment.message;
  };

  var addLike = function () {
    var LIKE = 1;
    photoLikesCount.innerText = +photoLikesCount.textContent + LIKE;
    photoLikesCount.removeEventListener('click', addLike);
  };

  var commentsList;

  var createCommentsNode = function (photos, comments) {
    commentsList = comments;

    if (comments.length <= VISIBLE_COMMENTS) {
      hideCommentBtn();
    } else {
      commentsLoaderBtn.classList.remove('hidden');
    }

    while (userComments.firstChild) {
      userComments.removeChild(userComments.firstChild);
    }

    imgNode.src = photos.url;
    imgNode.alt = photos.description;
    photoDescription.innerText = photos.description;
    photoLikesCount.innerText = photos.likes;
    photoLikesCount.addEventListener('click', addLike);
  };

  var printComments = function (comments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var userComment = commentNode.content.cloneNode(true);
      var currentComment = comments[i];

      fillPhotoComment(userComment, currentComment);

      fragment.appendChild(userComment);
    }
    userComments.appendChild(fragment);
  };

  var loadComments = function () {
    var currentCommentCount = commentsPointer + VISIBLE_COMMENTS;

    if (currentCommentCount > commentsList.length) {
      currentCommentCount = commentsList.length;
    }
    printComments(commentsList.slice(commentsPointer, currentCommentCount));
    commentsPointer = currentCommentCount;
    currentCommentsCount.innerText = currentCommentCount + ' из ' + commentsList.length + ' комментариев';
    return commentsList.length - currentCommentCount;
  };

  var hideCommentBtn = function () {
    commentsLoaderBtn.classList.add('hidden');
  };

  commentsLoaderBtn.addEventListener('click', function () {
    if (loadComments() === 0) {
      hideCommentBtn();
    }
  });

  window.picture = {
    showFullPicture: showFullPicture,
    createCommentsNode: createCommentsNode,
    loadComments: loadComments
  };
}());
