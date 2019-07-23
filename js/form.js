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

  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeButton = document.querySelector('#upload-cancel');

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    showElem(uploadOverlay);

    document.addEventListener('keydown', function (escEvt) {
      if (escEvt.keyCode === ESC_KEYCODE) {
        hideElem(uploadOverlay);
      }
    });

    closeButton.addEventListener('click', function () {
      hideElem(uploadOverlay);
    });
  });

  var commentInput = document.querySelector('.text__description');

  commentInput.setAttribute('tabindex', '0');
  commentInput.setAttribute('maxlength', '140');

  preventCloseByESC(commentInput);

  var tagInput = document.querySelector('.text__hashtags');
  tagInput.setAttribute('value', '');
  var submitBtn = document.querySelector('.img-upload__submit');

  function checkValidity() {
    var MAX_COUNT_OF_TAGS = 5;
    var MAX_LENGTH_OF_TAGS = 20;

    var userTags = tagInput.value.toLowerCase().split(' ');

    for (var i = 0; i < userTags.length; i++) {

        if (userTags.toString().charAt(0) !== '#') {
          tagInput.setCustomValidity('хэш-тег должен начинаться с символа #');
        } else if (userTags.toString().length > MAX_LENGTH_OF_TAGS) {
          tagInput.setCustomValidity('хэш-тег не должен превышать 20 символов');
        } else if (userTags.toString() === '#') {
          tagInput.setCustomValidity('хэш-тег не может состоять только из #');
        } else if (userTags.length > MAX_COUNT_OF_TAGS) {
          tagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов')
        } /*else if () {
          tagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды')
        }*/ else {
          tagInput.setCustomValidity('');
        }
    }
    console.log(userTags);
  }
  submitBtn.addEventListener('click', checkValidity);
  preventCloseByESC(tagInput);
}());
