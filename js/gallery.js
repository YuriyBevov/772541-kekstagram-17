/**
 * @file Модуль создания галереи фотографий
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  function fillPhotoHtml(element, photo) {
    element.querySelector('.picture__img').setAttribute('src', photo.url);
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
  }

  function createPhotosNode(arrayPhotos) {
    var fragment = document.createDocumentFragment();// создание фрагмента

    for (var i = 0; i < arrayPhotos.length; i++) {
      var userPhoto = document.querySelector('#picture').content.cloneNode(true);
      var currentPhoto = arrayPhotos[i];

      fillPhotoHtml(userPhoto, currentPhoto);

      fragment.appendChild(userPhoto);
    }
    var userPicture = document.querySelector('.pictures');

    userPicture.appendChild(fragment);
  }

  window.gallery = {
    createPhotosNode: createPhotosNode
  }
})();
