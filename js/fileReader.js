/**
 * @file Модуль загрузки фотографии пользователя
 * @author Yuriy Bevov
 */

'use strict';

(function () {
  var fileReader = function () {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var fileChooser = document.querySelector('.img-upload__start input[type=file]');
    var preview = document.querySelector('.img-upload__preview > img');
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };
  window.fileReader = {
    fileReader: fileReader
  };
})();
