/*
* @file Overlay display module
* author Yuriy Bevov
*/
'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeButton = document.querySelector('#upload-cancel');
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var showElem =  window.util.showElem;
  var hideElem = window.util.hideElem;

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

  var escPreventer = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  };

  commentInput.addEventListener('focus', function (evt) {
    evt.preventDefault();
    commentInput.addEventListener('keydown', escPreventer);
  });
  commentInput.addEventListener('blur', function () {
    commentInput.removeEventListener('keydown', escPreventer);
  });
}());
