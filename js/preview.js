// Модуль применений эффекта для изображения
'use strict';

(function () {

  var effectsButton = document.querySelectorAll('.effects__radio');
  var activeFilter = 'effects__preview--none';
  var imgPreview = document.querySelector('.img-upload__preview');
  document.querySelector('.effect-level').classList.add('hidden');
  var effectsList = window.data.effectsList;
  var MAX_VALUE = 100 + '%';

  for (var i = 0; i < effectsButton.length; i++) {

    var onChangeListener = function () {
      var j = i;
      return function () {

        imgPreview.classList.remove(activeFilter);
        document.querySelector('.effect-level__pin').style.left = MAX_VALUE;
        document.querySelector('.effect-level__depth').style.width = MAX_VALUE;
        imgPreview.style.filter = '';
        imgPreview.classList.add(effectsList[j]);
        activeFilter = effectsList[j];

        var sliderControls = document.querySelector('.effect-level');

        if (activeFilter === 'effects__preview--none') {
          sliderControls.classList.add('hidden');
        } else {
          sliderControls.classList.remove('hidden');
        }
      };
    };
    effectsButton[i].addEventListener('click', onChangeListener());
  }

  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderLine = document.querySelector('.effect-level__line');
  var sliderLineDepth = document.querySelector('.effect-level__depth');

  var onMouseClick = function (evt) {
    evt.preventDefault();

    var sliderLineCoordsLeft = sliderLine.getBoundingClientRect().left;
    var clickCoords = evt.clientX;
    var sliderWidth = sliderLine.offsetWidth;
    var clickValue = clickCoords - sliderLineCoordsLeft;

    pinMoveByClick(clickValue);
    intensity(clickValue, sliderWidth);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;
    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var moveCoords = evtMove.clientX;
      var shift = startCoords - moveCoords;
      var sliderWidth = sliderLine.offsetWidth;
      var moveValue = sliderPin.offsetLeft - shift;

      startCoords = evtMove.clientX;

      pinMoveByShift(shift);
      intensity(moveValue, sliderWidth);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  function pinMoveByShift(shift) {

    var sliderMinValue = sliderPin.offsetLeft - shift;
    var sliderMaxValue = document.querySelector('.effect-level__line').offsetWidth;

    sliderDepth();
    sliderPin.style.left = ((sliderPin.offsetLeft - shift) / (sliderMaxValue / 100)) + '%';

    if (sliderMinValue < 0) {
      sliderPin.style.left = 0;
    } if (sliderMinValue > sliderMaxValue) {
      sliderPin.style.left = 100 + '%';
    }
  }

  function pinMoveByClick(clickValue) {
    sliderPin.style.left = Math.round(clickValue / (sliderLine.offsetWidth / 100)) + '%';
    sliderDepth();
  }

  function sliderDepth() {
    sliderLineDepth.style.width = sliderPin.style.left;
  }

  function intensity(position, width) {

    var PHOBOS_AUX_VALUE = 3;
    var BRIGHTNESS_FIRST_AUX_VALUE = 2;
    var BRIGHTNESS_SECOND_AUX_VALUE = 1;

    var styles = {
      'effects__preview--chrome': function () {
        var chromeValue = position / width;
        return 'grayscale(' + chromeValue + ')';
      },
      'effects__preview--sepia': function () {
        var sepiaValue = position / width;
        return 'sepia(' + sepiaValue + ')';
      },
      'effects__preview--marvin': function () {
        var marvinValue = (position / (width / 100)) + '%';
        return 'invert(' + marvinValue + ')';
      },
      'effects__preview--phobos': function () {
        var phobosValue = (position * PHOBOS_AUX_VALUE) / width + 'px';
        return 'blur(' + phobosValue + ')';
      },
      'effects__preview--heat': function () {
        var brightnessValue = (position * BRIGHTNESS_FIRST_AUX_VALUE) / width + BRIGHTNESS_SECOND_AUX_VALUE;
        return 'brightness(' + brightnessValue + ')';
      }
    };

    document.querySelector('.img-upload__preview').style.filter = styles[activeFilter]();
  }

  sliderLine.addEventListener('click', onMouseClick);
  sliderPin.addEventListener('mousedown', onMouseDown);
}());
