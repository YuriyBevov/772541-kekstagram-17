/**
 * @file Модуль отправки данных формы
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var StatusMessage = window.successModal.successModal;

  var CODE = {
    SUCCESS: 200
  };

  var isSending = false;

  function sendFormData(form, onLoad) {

    if (isSending) {
      return;
    }

    isSending = true;
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.send(formData);

    xhr.addEventListener('load', function () {
      isSending = false;
      if (xhr.status === CODE.SUCCESS) {
        onLoad();
        var success = new StatusMessage('success');
        successLoad.hide();
      } else {
        onLoad();
        var error = new StatusMessage('error');
        errorLoad.hide();
      }
    });
  }
  window.send = {
    sendFormData: sendFormData
  };
})();
