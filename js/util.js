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

  /* var deleteNodes = function (elems) {
    Array.from(elems).forEach( function (it) {
      it.parentNode.removeChild(it);
    });
  };

  var classRemove = function (elem, className) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].classList.remove(className);
    }
  }; */

  var ESC_KEYCODE = 27;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
    hideElem: hideElem,
    showElem: showElem
    // deleteNodes: deleteNodes,
    // classRemove: classRemove
  };
})();
