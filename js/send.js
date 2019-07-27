/**
 * @file Модуль отправки данных формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var closeByClick = window.util.closeByClick;

  var form = document.querySelector('.img-upload__form');
  form.setAttribute('name', 'user');
  form.setAttribute('action', 'https://js.dump.academy/kekstagram');

  function sendRequest() {
    // evt.preventDefault();

    var formData = new FormData(document.forms.user);
    // console.log(formData);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    // console.log(xhr.status);

    xhr.send(formData); // '/formData'

    if (xhr.status === 200) {
      // console.log('success');
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
      // document.addEventListener('keydown', function (evt) {
      //  if (evt.keyCode === ESC_KEYCODE) {
      //    successMessage.classList.add('visually-hidden');
      //  }
      // });
    } else {
      var errorFragment = document.createDocumentFragment();
      var errorMessageNode = document.querySelector('#error');
      var userErrorMessage = errorMessageNode.content.cloneNode(true);

      errorFragment.appendChild(userErrorMessage);
      document.body.appendChild(errorFragment);

      var errorMessage = document.querySelector('.error');
      var errorBtn = document.querySelectorAll('.error__button');
      closeByClick(errorMessage);

      for (var i = 0; i < errorBtn.length; i++) {
        errorBtn[i].addEventListener('click', function () {
          errorMessage.classList.add('visually-hidden');
        });
      }
    }
  }
  window.send = {
    sendRequest: sendRequest
  };
})();
