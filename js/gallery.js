/**
 * @file Модуль создания галереи фотографий
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var getRandom = window.util.getRandom;
  var debounce = window.debounce;

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



  function showPopularPhoto(photos) {
    return photos;
  }

  function showNewPhotos(photos) {

    var numbersArray = [];
    var newPhotosArray = [];

    while (numbersArray.length < 10) {
      var randomNumber = getRandom(0, photos.length - 1);

      if (numbersArray.indexOf(randomNumber) === -1) {
        numbersArray.push(randomNumber);
      }
    }

    numbersArray.forEach(function (item) {
      newPhotosArray.push(photos[item]);
    });
    return newPhotosArray;
  }

  function showDiscussedPhotos(photos) {
    var discussedPhotos = photos.slice();
    discussedPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPhotos;
  }

  function changePhotoFilters(photos) {

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

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

    var handleFilterBtnClick = function (evt) {
      evt.preventDefault();
      var currentButton = evt.currentTarget;

      removeActiveClassOfButton();
      addActiveClassToCurrentButton(currentButton);

      var filteringFunction = null;
      if (currentButton.id === 'filter-discussed') {
        filteringFunction = showDiscussedPhotos;
      } else if (currentButton.id === 'filter-new') {
        filteringFunction = showNewPhotos;
      } else if (currentButton.id === 'filter-popular') {
        filteringFunction = showPopularPhoto;
      }
      debounce(function () {
        deletePreviousPictures();
        createPhotosNode(filteringFunction(photos));
      });
    };
    var filterBtns = document.querySelectorAll('.img-filters__button');
    filterBtns.forEach(function (filterBtn) {
      filterBtn.addEventListener('click', handleFilterBtnClick);
    });
  }

  window.gallery = {
    createPhotosNode: createPhotosNode,
    changePhotoFilters: changePhotoFilters
  };
})();
