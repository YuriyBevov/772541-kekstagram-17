'use strict';

(function () {

  var createPhotosNode = window.gallery.createPhotosNode;

  var Code = {
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
    if (xhr.status === Code.SUCCESS) {

      createPhotosNode(xhr.response);

      (function getNewPhotoList() {

        var getRandom = window.util.getRandom;

        var imgFilters = document.querySelector('.img-filters');
        imgFilters.classList.remove('img-filters--inactive');

        var buttons = document.querySelectorAll('.img-filters__button');
        var filterDiscussed = document.getElementById('filter-discussed');
        var filterNew = document.getElementById('filter-new');
        var filterPopular = document.getElementById('filter-popular');

        var deletePreviousPictures = function () {
          var pictures = Array.from(document.querySelectorAll('.picture'));
          pictures.forEach(function (it) {
            it.parentNode.removeChild(it);
          });
        };

        var removeActiveClassOfButton = function (elem, className) {
          for (var i = 0; i < elem.length; i++) {
            elem[i].classList.remove(className);
          }
        };

        /* var deleteNodes = function (elems) {
          Array.from(elems).forEach( function (it) {
            it.parentNode.removeChild(it);
         });
       }; */

        filterDiscussed.addEventListener('click', function (evt) {
          evt.preventDefault();

          removeActiveClassOfButton(buttons, 'img-filters__button--active');
          filterDiscussed.classList.add('img-filters__button--active');

          var discussedPhotos = xhr.response.slice();

          discussedPhotos.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });

          deletePreviousPictures();
          createPhotosNode(discussedPhotos);
        });

        filterPopular.addEventListener('click', function (evt) {
          evt.preventDefault();

          removeActiveClassOfButton(buttons, 'img-filters__button--active');
          filterPopular.classList.add('img-filters__button--active');
          deletePreviousPictures();
          createPhotosNode(xhr.response);
        });

        filterNew.addEventListener('click', function (evt) {
          evt.preventDefault();

          removeActiveClassOfButton(buttons, 'img-filters__button--active');
          filterNew.classList.add('img-filters__button--active');
          deletePreviousPictures();

          var currentXhr = xhr.response.slice();
          var randomPhotos = [];

          do {
            var MAX_COUNT_OF_PHOTOS = 10;
            var newPhotosArray = [];
            var currentPhoto = currentXhr[getRandom(0, currentXhr.length - 1)];
            randomPhotos.push(currentPhoto);
            randomPhotos.filter(function (item) {
              if (newPhotosArray.indexOf(item) === -1) {
                newPhotosArray.push(item);
              }
            });
          } while (newPhotosArray.length < MAX_COUNT_OF_PHOTOS);
          createPhotosNode(newPhotosArray);
        });
      }());
    } else {
      // alert('Ошибка ' + xhr.status + xhr.statusText + ' в ответе сервера');
    }
  });
  xhr.send();
}());
