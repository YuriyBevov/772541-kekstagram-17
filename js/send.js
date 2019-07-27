/**
 * @file Модуль отправки данных формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var closeByClick = window.util.closeByClick;
  var ESC_KEYCODE = window.util.ESC_KEYCODE;

  var CODE = {
    SUCCESS: 200
  };

  function sendFormData(form, onLoad) {

    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);

    xhr.send(formData);

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE.SUCCESS) {
        onLoad();
        var successFragment = document.createDocumentFragment();
        var successMessageNode = document.querySelector('#success');
        var userSuccessMessage = successMessageNode.content.cloneNode(true);

        successFragment.appendChild(userSuccessMessage);
        document.body.appendChild(successFragment);

        var successMessage = document.querySelector('.success');
        var successBtn = document.querySelector('.success__button');
        closeByClick(successMessage);
        successBtn.addEventListener('click', function () {
          successMessage.classList.add('visually-hidden');
        });

        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ESC_KEYCODE) {
            successMessage.classList.add('visually-hidden');
          }
        });
      } else {
        onLoad();
        var errorFragment = document.createDocumentFragment();
        var errorMessageNode = document.querySelector('#error');
        var userErrorMessage = errorMessageNode.content.cloneNode(true);

        errorFragment.appendChild(userErrorMessage);
        document.body.appendChild(errorFragment);

        var errorMessage = document.querySelector('.error');
        var errorBtn = document.querySelectorAll('.error__button');
        closeByClick(errorMessage);

        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ESC_KEYCODE) {
            errorMessage.classList.add('visually-hidden');
          }
        });

        for (var i = 0; i < errorBtn.length; i++) {
          errorBtn[i].addEventListener('click', function () {
            errorMessage.classList.add('visually-hidden');
          });
        }
      }
    });
  }
  window.send = {
    sendFormData: sendFormData
  };
})();
