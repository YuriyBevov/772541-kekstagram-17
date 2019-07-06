'use strict';

(function () {

  var createPhotoNode = window.gallery.createPhotosNode;

  var URL = 'https://js.dump.academy/kekstagram/dta';
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.open('GET', URL);

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
        createPhotoNode(xhr.response);
    } else {
      console.error('Ошибка ' + xhr.status + xhr.statusText + ' в ответе сервера');
    }
  });
  xhr.send();
}());
