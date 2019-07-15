'use strict';

(function () {

  var createPhotosNode = window.gallery.createPhotosNode;

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

      var getNewPhotoList = function () {
        var getRandom = window.util.getRandom;

        var imgFilters = document.querySelector('.img-filters');
        imgFilters.classList.remove('img-filters--inactive');

        var filterDiscussed = document.getElementById('filter-discussed');
        var filterNew = document.getElementById('filter-new');
        var filterPopular = document.getElementById('filter-popular');

        var deletePreviousPictures = function () {
          var pictures = document.querySelectorAll('.picture');
          pictures.forEach(function (it) {
            it.parentNode.removeChild(it);
          });
        };

        var removeActiveClassOfButton = function () {
          var btn = document.querySelector('.img-filters__button--active');
          btn.classList.remove('img-filters__button--active');
        };

        filterDiscussed.addEventListener('click', function (evt) {
          evt.preventDefault();

          removeActiveClassOfButton();
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

          removeActiveClassOfButton();
          filterPopular.classList.add('img-filters__button--active');
          deletePreviousPictures();
          createPhotosNode(xhr.response);
        });

        filterNew.addEventListener('click', function (evt) {
          evt.preventDefault();

          removeActiveClassOfButton();
          filterNew.classList.add('img-filters__button--active');
          deletePreviousPictures();

          var MAX_NUMBER = 24;
          var currentXhr = xhr.response.slice();
          var numbersArray = []; // записываю в этот массив рандомные числа
          var newPhotosArray = []; // массив случайных фото

          while (numbersArray.length < 10) {
            var randomNumber = getRandom(0, MAX_NUMBER); // создадим случайное число

            if (numbersArray.indexOf(randomNumber) === -1) { // проверяю есть оно  у нас или нет
              numbersArray.push(randomNumber);
            }
          }
          numbersArray.forEach(function (item) {
            newPhotosArray.push(currentXhr[item]);
          });
          createPhotosNode(newPhotosArray);
        });
      };
      getNewPhotoList();
    } else {
      // alert('Ошибка ' + xhr.status + xhr.statusText + ' в ответе сервера');
    }
  });
  xhr.send();
}());
