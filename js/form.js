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
  var submitBtn = document.querySelector('.img-upload__submit');

  function checkValidity() {
    var MAX_COUNT_OF_TAGS = 5;
    var MAX_LENGTH_OF_TAG = 20;

    var inputValue = tagInput.value.toLowerCase().split(' ');
    var userTags = inputValue.filter(function (item) {
      return item.trim();
    });

    var uniqueTestArray = [];

    if (userTags.length <= MAX_COUNT_OF_TAGS) {

      for (var i = 0; i < userTags.length; i++) {

        if (uniqueTestArray.indexOf(userTags[i]) === -1) {
          uniqueTestArray.push(userTags[i]);
          // console.log(uniqueTestArray);
        }

        if (userTags[i].charAt(0) !== '#') {
          tagInput.setCustomValidity('хэш-тег должен начинаться с символа #');
          break;
        } else if (userTags[i].charAt(1) === '#') {
          tagInput.setCustomValidity('после # должно идти название хэш-тега');
          break;
        } else if (userTags[i].length > MAX_LENGTH_OF_TAG) {
          tagInput.setCustomValidity('хэш-тег не должен превышать ' + MAX_LENGTH_OF_TAG + ' символов');
          break;
        } else if (userTags[i] === '#') {
          tagInput.setCustomValidity('хэш-тег не может состоять только из #');
          break;
        } else if (uniqueTestArray[i] !== userTags[i]) {
          tagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды;');
          break;
        } else {
          tagInput.setCustomValidity('');
        }
      }
    } else {
      tagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
  }
  submitBtn.addEventListener('click', checkValidity);
  preventCloseByESC(tagInput);
}());

// else if () {
// tagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды')
// }
