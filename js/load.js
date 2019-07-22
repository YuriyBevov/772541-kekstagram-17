'use strict';

(function () {

  var createPhotosNode = window.gallery.createPhotosNode;
  var changePhotoFilters = window.gallery.changePhotoFilters;
  // var showFullPicture = window.picture.showFullPicture;
  var createCommentsNode = window.picture.createCommentsNode;

  var CODE = {
    SUCCESS: 200,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500,
    CACHED: 302
  };

  var URL = 'https://js.dump.academy/kekstagram/data';
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.open('GET', URL);

  xhr.addEventListener('load', function () {
    if (xhr.status === CODE.SUCCESS) {
      createPhotosNode(xhr.response);
      changePhotoFilters(xhr.response);
      // showFullPicture(xhr.response[0]);
      createCommentsNode(xhr.response[0], xhr.response[0].comments);
    } else {
      // alert('Ошибка ' + xhr.status + xhr.statusText + ' в ответе сервера');
    }
  });
  xhr.send();
}());
