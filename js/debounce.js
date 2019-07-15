/**
 * @file Устранение эффекта дребезга
 * @author Yuriy Bevov
 */

'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var timeout;
  window.debounce = function (func) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };
})();
