/**
 * @file Модуль служебных переменных и функций
 * @author Yuriy Bevov
 */

'use strict';

(function () {
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var hideElem = function (elem) {
    elem.classList.add('hidden');
  };

  var showElem = function (elem) {
    elem.classList.remove('hidden');
  };

  var ESC_KEYCODE = 27;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
    hideElem: hideElem,
    showElem: showElem
  };
})();
