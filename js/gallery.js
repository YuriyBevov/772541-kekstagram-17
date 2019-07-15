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


  var getNewPhotoList = function (serverArray) {
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

      var discussedPhotos = serverArray.slice();

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
      createPhotosNode(serverArray);
    });

    filterNew.addEventListener('click', function (evt) {
      evt.preventDefault();

      removeActiveClassOfButton();
      filterNew.classList.add('img-filters__button--active');
      deletePreviousPictures();

      var MAX_NUMBER = 24;
      var currentXhr = serverArray.slice();
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

  window.gallery = {
    createPhotosNode: createPhotosNode,
    getNewPhotoList: getNewPhotoList
  };
})();
