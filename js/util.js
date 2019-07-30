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

  var escPreventer = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  };

  var preventCloseByESC = function (elem) {
    elem.addEventListener('focus', function (evt) {
      evt.preventDefault();
      elem.addEventListener('keydown', escPreventer);
    });
    elem.addEventListener('blur', function () {
      elem.removeEventListener('keydown', escPreventer);
    });
  };

  var errorBorder = function (elem, message) {
    elem.style.border = '2px solid red';
    elem.setCustomValidity(message);
  };

  var ESC_KEYCODE = 27;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
    hideElem: hideElem,
    showElem: showElem,
    preventCloseByESC: preventCloseByESC,
    errorBorder: errorBorder
    // closeByClick: closeByClick
  };
})();
