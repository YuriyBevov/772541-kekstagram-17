/**
 * @file Модуль отправки данных формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var closeByClick = window.util.closeByClick;

  var form = document.querySelector('.img-upload__form');

  function sendRequest() {
    // evt.preventDefault();
    form.setAttribute('name', 'user');
    form.setAttribute('action', 'https://js.dump.academy/kekstagram');
    var formData = new FormData(document.forms.user);
    console.log(formData);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'form.action');

    if (xhr.status === 200) {
      console.log('success');
      var fragment = document.createDocumentFragment();
      var successMessage = document.querySelector('#success');
      var userSuccessMessage = successMessage.content.cloneNode(true);

      fragment.appendChild(userSuccessMessage);
      main.appendChild(fragment);

      var successMessage = document.querySelector('.success');
      var successBtn = document.querySelector('.success__button');
      closeByClick(successMessage);
      successBtn.addEventListener('click', function () {
        successMessage.classList.add('visually-hidden');
      });
      //document.addEventListener('keydown', function (evt) {
      //  if (evt.keyCode === ESC_KEYCODE) {
      //    successMessage.classList.add('visually-hidden');
      //  }
      //});
    } else {
      var fragment = document.createDocumentFragment();
      var errorMessage = document.querySelector('#error');
      var userErrorMessage = errorMessage.content.cloneNode(true);

      fragment.appendChild(userErrorMessage);
      main.appendChild(fragment);

      var errorMessage = document.querySelector('.error');
      var errorBtn = document.querySelectorAll('.error__button');
      closeByClick(errorMessage);

      for (var i = 0; i < errorBtn.length; i++) {
        errorBtn[i].addEventListener('click', function () {
          errorMessage.classList.add('visually-hidden');
        });
      }

      xhr.send(formData);
    }

    window.send = {
      sendRequest: sendRequest
    };
  }
})();
