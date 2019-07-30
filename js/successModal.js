/**
 * @file Модуль показа сообщения после отправки формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var pageMain = document.querySelector('main');

  var SuccessModal = function (templateType) {

    var template = document.querySelector('#' + templateType).content.cloneNode(true);

    pageMain.appendChild(template);

    this.messageNode = pageMain.querySelector('.' + templateType);
    this.closeBtn = pageMain.querySelectorAll('.' + templateType + '__button');
  };

  SuccessModal.prototype.show = function () {

    var _this = this;

    var onClickHandler = function () {
      _this.messageNode.classList.add('visually-hidden');
      _this.messageNode.parentNode.removeChild(_this.messageNode);
    };

    for (var i = 0; i < this.closeBtn.length; i++) {
      this.closeBtn[i].addEventListener('click', onClickHandler);
    }

    var onPressEsc = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onClickHandler();
        document.removeEventListener('keydown', onPressEsc);
      }
    };

    document.addEventListener('keydown', onPressEsc);

    var closeByClick = function (evt) {
      if (evt.target === _this.messageNode) {
        onClickHandler();
        document.removeEventListener('click', closeByClick);
      }
    };
    document.addEventListener('click', closeByClick);
  };

  window.successModal = {
    successModal: SuccessModal
  };
})();
