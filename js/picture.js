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

  var showFullPicture = function (photo) {
    showElem(picture);
    document.addEventListener('keydown', function (escEvt) {
      if (escEvt.keyCode === ESC_KEYCODE) {
        hideElem(picture);
      }
    });
    closeBtn.addEventListener('click', function () {
      hideElem(picture);
    });

    var img = document.querySelector('.big-picture__img').getElementsByTagName('img');
    var likes = document.querySelector('.likes-count');
    var commentsCount = document.querySelector('.comments-count');
    var description = document.querySelector('.social__caption');
    var comments = document.querySelector('.social__comments');
    var commentCount = document.querySelector('.social__comment-count').classList.add('visually-hidden');
    var commentLoader = document.querySelector('.comments-loader').classList.add('visually-hidden');


    if (picture.classList.contains('hidden') === false) {
      //img.setAttribute('src', photo[0].url);
      //img.removeAttribute('src');
      img.src = photo[0].url;
      likes.innerHTML = photo[0].likes;
      commentsCount.innerHTML = photo[0].comments.length;
      description.innerHTML = photo[0].description;

      console.log(img.src);
      console.log(likes);
      console.log(commentsCount);
    }
  };

  function createCommentsNode(photos) {
    var currentComment = document.querySelector('.social__comment').cloneNode(true);
    var commentsNode = document.querySelector('.social__comments');
    var socialPicture = document.querySelector('.social__picture');

    for (var i = 0; i < photos[0].comments.length; i++) {
      console.log(photos[0].comments[i].avatar);

      commentsNode.appendChild(currentComment);
    }
  }

  window.picture = {
   showFullPicture: showFullPicture,
   createCommentsNode: createCommentsNode
  }

}());
