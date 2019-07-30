/**
 * @file Модуль отправки данных формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var SucessModal = window.successModal.successModal;
  // var errorModalShow = window.modal.errorModalShow;

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
        var success = new SucessModal('success');
        success.show();
      } else {
        onLoad();
        var error = new SucessModal('error');
        error.show();
      }
    });
  }
  window.send = {
    sendFormData: sendFormData
  };
})();
