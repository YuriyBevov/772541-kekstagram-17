// Модуль служебных переменных и функций
'use strict';

(function () {
  var getRandom = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var hideElem = function closeElement(elem) {
    elem.classList.add('hidden');
  };

  var showElem = function showElement(elem) {
    elem.classList.remove('hidden');
  };

  var ESC_KEYCODE = 27;
  var MAX_VALUE = 100 + '%';

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    MAX_VALUE: MAX_VALUE,
    getRandom: getRandom,
    hideElem: hideElem,
    showElem: showElem
  };
})();
