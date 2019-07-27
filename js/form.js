/**
 * @file Модуль показа формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {
  var showElem = window.util.showElem;
  var hideElem = window.util.hideElem;
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var preventCloseByESC = window.util.preventCloseByESC;
  var error = window.util.errorBorder;
  var sendFormData = window.send.sendFormData;

  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeButton = document.querySelector('#upload-cancel');

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    showElem(uploadOverlay);
  });

  document.addEventListener('keydown', function (escEvt) {
    if (escEvt.keyCode === ESC_KEYCODE) {
      hideElem(uploadOverlay);
    }
  });

  closeButton.addEventListener('click', function () {
    hideElem(uploadOverlay);
  });

  var commentInput = document.querySelector('.text__description');

  commentInput.setAttribute('tabindex', '0');
  commentInput.setAttribute('maxlength', '140');

  preventCloseByESC(commentInput);

  var tagInput = document.querySelector('.text__hashtags');
  var submitBtn = document.querySelector('.img-upload__submit');

  function checkValidity() {

    var MAX_COUNT_OF_TAGS = 5;
    var MAX_LENGTH_OF_TAG = 20;

    var inputValue = tagInput.value.toLowerCase().split(' ');
    var userTags = inputValue.filter(function (item) {
      return item.trim();
    });

    var uniqueTestArray = [];

    if (userTags.length > MAX_COUNT_OF_TAGS) {
      error(tagInput, 'нельзя указать больше пяти хэш-тегов');
      return;
    }

    for (var i = 0; i < userTags.length; i++) {

      if (uniqueTestArray.indexOf(userTags[i]) === -1) {
        uniqueTestArray.push(userTags[i]);
      }
      if (userTags[i].charAt(0) !== '#') {
        error(tagInput, 'хэш-тег должен начинаться с символа #');
        return;
      } else if (userTags[i].charAt(1) === '#') {
        error(tagInput, 'после # должно идти название хэш-тега');
        return;
      } else if (userTags[i].length > MAX_LENGTH_OF_TAG) {
        error(tagInput, 'хэш-тег не должен превышать ' + MAX_LENGTH_OF_TAG + ' символов');
        return;
      } else if (userTags[i] === '#') {
        error(tagInput, 'хэш-тег не может состоять только из #');
        return;
      } else if (uniqueTestArray[i] !== userTags[i]) {
        error(tagInput, 'один и тот же хэш-тег не может быть использован дважды');
        return;
      }
    }
    tagInput.setCustomValidity('');
  }

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    sendFormData(form, function () {
      hideElem(uploadOverlay);
    });
  });
  submitBtn.addEventListener('click', checkValidity);
  preventCloseByESC(tagInput);
}());
