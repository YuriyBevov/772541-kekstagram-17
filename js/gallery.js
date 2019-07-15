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


  function getNewPhotoList(serverArray) {
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

    var addActiveClassToCurrentButton = function (elem) {
      elem.classList.add('img-filters__button--active');
    };

    filterPopular.addEventListener('click', function (evt) {
      evt.preventDefault();

      removeActiveClassOfButton();
      addActiveClassToCurrentButton(filterPopular);
      deletePreviousPictures();
      createPhotosNode(serverArray);
    });

    filterNew.addEventListener('click', function (evt) {
      evt.preventDefault();

      removeActiveClassOfButton();
      addActiveClassToCurrentButton(filterNew);
      deletePreviousPictures();

      var MAX_NUMBER = 24;
      var currentXhr = serverArray.slice();
      var numbersArray = [];
      var newPhotosArray = [];

      while (numbersArray.length < 10) {
        var randomNumber = getRandom(0, MAX_NUMBER);

        if (numbersArray.indexOf(randomNumber) === -1) {
          numbersArray.push(randomNumber);
        }
      }
      numbersArray.forEach(function (item) {
        newPhotosArray.push(currentXhr[item]);
      });
      createPhotosNode(newPhotosArray);
    });

    filterDiscussed.addEventListener('click', function (evt) {
      evt.preventDefault();

      removeActiveClassOfButton();
      addActiveClassToCurrentButton(filterDiscussed);

      var discussedPhotos = serverArray.slice();

      discussedPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });

      deletePreviousPictures();
      createPhotosNode(discussedPhotos);
    });
  }

  window.gallery = {
    createPhotosNode: createPhotosNode,
    getNewPhotoList: getNewPhotoList
  };
})();
