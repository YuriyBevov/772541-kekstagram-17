'use strict';

(function () {

  var createPhotosNode = window.gallery.createPhotosNode;
  var getNewPhotoList = window.gallery.getNewPhotoList;

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
      getNewPhotoList(xhr.response);
    } else {
      // alert('Ошибка ' + xhr.status + xhr.statusText + ' в ответе сервера');
    }
  });
  xhr.send();
}());
