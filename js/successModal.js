/**
 * @file Модуль показа сообщения после отправки формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  // var closeByClick = window.util.closeByClick;
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var pageMain = document.querySelector('main');

  var SuccessModal = function (successID) {
    var successFragment = document.createDocumentFragment();

    var successMessageNode = document.querySelector('#success');

    var userSuccessMessage = successMessageNode.content.cloneNode(true);

    successFragment.appendChild(userSuccessMessage);

    pageMain.appendChild(successFragment);

    var modalWindow = document.querySelector(successID);
    modalWindow.classList.add('visually-hidden');

    this.show = function () {
      modalWindow.classList.remove('visually-hidden');

      var successMessage = document.querySelector(successID);
      var successBtn = document.querySelector('.success__button');

      this.hide = function () {
        // closeByClick(successMessage); // работает не корректно

        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ESC_KEYCODE) {
            successMessage.classList.add('visually-hidden');
          }
        });

        var onClickHandler = function () {
          successMessage.classList.add('visually-hidden');
          successBtn.removeEventListener('click', onClickHandler);
        };
        successBtn.addEventListener('click', onClickHandler);
      };
      this.hide();
    };
  };

  window.successModal = {
    successModal: SuccessModal
  };
})();
