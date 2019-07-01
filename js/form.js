// Модуль показа формы редактирования
'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeButton = document.querySelector('#upload-cancel');
  var ESC_KEYCODE = window.util.ESC_KEYCODE;

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.showElem(uploadOverlay);

    document.addEventListener('keydown', function (escEvt) {
      if (escEvt.keyCode === ESC_KEYCODE) {
        window.util.hideElem(uploadOverlay);
      }
    });

    closeButton.addEventListener('click', function () {
      window.util.hideElem(uploadOverlay);
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
