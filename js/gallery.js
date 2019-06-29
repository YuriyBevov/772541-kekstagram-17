// Модуль создания галереи фотографий
'use strict';

(function () {

  function createPhotoArray() {
    var PHOTOS_MAX = 25;
    var PHOTOS_MIN = 1;
    var LIKES_MAX = 200;
    var LIKES_MIN = 15;
    var localPhotos = [];

    for (var i = PHOTOS_MIN; i <= PHOTOS_MAX; i++) {
      var url = 'photos/' + i + '.jpg';
      var likes = window.util.getRandom(LIKES_MIN, LIKES_MAX);

      localPhotos.push({url: url, likes: likes});
    }
    return localPhotos;
  }

  function createCommentArray() {

    var localComments = [];

    for (var i = 0; i < window.data.comments.length; i++) {
      var avatar = 'url:(img/' + window.util.getRandom(1, window.data.comments.length) + '.svg)'; // случайная аватарка
      var name = window.data.names[window.util.getRandom(0, window.data.names.length - 1)]; // случайное имя из массива имен
      var comment = window.data.comments[window.util.getRandom(0, window.data.comments.length - 1)]; // случайный комментарий

      localComments.push({avatar: avatar, name: name, comment: comment});
    }
    return localComments;
  }

  function getPhotoComments() {
    var arrayComments = createCommentArray();
    var currentComment = []; // массив с комментариями к текущей фотографии
    var randomCount = window.util.getRandom(0, arrayComments.length);

    for (var i = 0; i < randomCount; i++) { // случайный выбор кол-ва комментариев, макс = длине comments
      currentComment.push(arrayComments[i]);
    }
    return currentComment.length;
  }

  function fillPhotoHtml(element, photo) {
    element.querySelector('.picture__img').setAttribute('src', photo.url);
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = getPhotoComments();
  }

  function createPhotosNode() {
    var arrayPhotos = createPhotoArray();
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

  createPhotosNode();
})();
