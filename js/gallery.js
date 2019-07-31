/**
 * @file Модуль создания галереи фотографий
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var getRandom = window.util.getRandom;
  var debounce = window.debounce;

  var fillPhotoHtml = function (element, photo) {
    element.querySelector('.picture__img').setAttribute('src', photo.url);
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
  };

  var createPhotosNode = function (arrayPhotos) {
    var fragment = document.createDocumentFragment();
    var photoNode = document.querySelector('#picture');

    for (var i = 0; i < arrayPhotos.length; i++) {
      var userPhoto = photoNode.content.cloneNode(true);
      var currentPhoto = arrayPhotos[i];

      fillPhotoHtml(userPhoto, currentPhoto);

      var getOnClick = function () {
        var showFullPicture = window.picture.showFullPicture;
        var createCommentsNode = window.picture.createCommentsNode;
        var loadComments = window.picture.loadComments;
        var photo = currentPhoto;
        return function (evt) {
          evt.preventDefault();
          createCommentsNode(photo, photo.comments);
          showFullPicture();
          loadComments();
        };
      };
      userPhoto.firstElementChild.addEventListener('click', getOnClick());
      fragment.appendChild(userPhoto);
    }

    var userPicture = document.querySelector('.pictures');
    userPicture.appendChild(fragment);
  };

  var showPopularPhoto = function (photos) {
    return photos;
  };

  var showNewPhotos = function (photos) {

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
  };

  var showDiscussedPhotos = function (photos) {
    var discussedPhotos = photos.slice();
    discussedPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPhotos;
  };

  var changePhotoFilters = function (photos) {

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
  };

  window.gallery = {
    createPhotosNode: createPhotosNode,
    changePhotoFilters: changePhotoFilters,
  };
})();
