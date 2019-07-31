/**
 * @file Модуль применений эффекта для изображения
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var effectsButton = document.querySelectorAll('.effects__radio');
  var imgPreview = document.querySelector('.img-upload__preview');
  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderLine = document.querySelector('.effect-level__line');
  var sliderLineDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var MAX_VALUE = 100;
  var MIN_VALUE = 25;

  var activeFilter = 'effects__preview--none';

  var showPicturePreview = function () {
    imgPreview.classList.add(activeFilter);
    document.querySelector('.effect-level').classList.add('hidden');
  };

  var setPictureStyle = function (evt) {
    setPictureOptions(evt.target.value);
    var sliderControls = document.querySelector('.effect-level');

    if (activeFilter === 'effects__preview--none') {
      sliderControls.classList.add('hidden');
    } else {
      sliderControls.classList.remove('hidden');
    }
  };

  for (var i = 0; i < effectsButton.length; i++) {
    effectsButton[i].addEventListener('change', setPictureStyle);
  }

  var setPictureOptions = function (filter) {
    document.querySelector('.effects__radio:checked').removeAttribute('checked');
    effectsButton[0].setAttribute('checked', true);
    imgPreview.style.filter = '';
    sliderPin.style.left = MAX_VALUE + '%';
    sliderLineDepth.style.width = MAX_VALUE + '%';
    effectLevelValue.value = MAX_VALUE;
    imgPreview.classList.remove(activeFilter);
    imgPreview.classList.add('effects__preview--' + filter);
    activeFilter = 'effects__preview--' + filter;
  };

  var onMouseClick = function (evt) {
    evt.preventDefault();

    var sliderLineCoordsLeft = sliderLine.getBoundingClientRect().left;
    var clickCoords = evt.clientX;
    var sliderWidth = sliderLine.offsetWidth;
    var clickValue = clickCoords - sliderLineCoordsLeft;

    pinMoveByClick(clickValue);
    setIntensity(clickValue, sliderWidth);
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
      setIntensity(moveValue, sliderWidth);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var pinMoveByShift = function (shift) {
    var sliderMinValue = sliderPin.offsetLeft - shift;
    var sliderMaxValue = document.querySelector('.effect-level__line').offsetWidth;
    var levelValue = ((sliderPin.offsetLeft - shift) / (sliderMaxValue / 100));
    var positionByShift = levelValue + '%';
    effectLevelValue.value = Math.round(levelValue);

    if (sliderMinValue < 0) {
      positionByShift = 0;
      effectLevelValue.value = 0;
    } if (sliderMinValue > sliderMaxValue) {
      positionByShift = MAX_VALUE + '%';
      effectLevelValue.value = MAX_VALUE + '%';
    }

    sliderPin.style.left = positionByShift;
    setSliderLineWidth(positionByShift);
  };

  var pinMoveByClick = function (clickValue) {
    var levelValue = Math.round(clickValue / (sliderLine.offsetWidth / 100));
    var positionByClick = levelValue + '%';
    sliderPin.style.left = positionByClick;
    effectLevelValue.value = levelValue;
    setSliderLineWidth(positionByClick);
  };

  var setSliderLineWidth = function (value) {
    sliderLineDepth.style.width = value;
  };

  var setIntensity = function (position, width) {

    var PHOBOS_AUX_VALUE = 3;
    var BRIGHTNESS_FIRST_AUX_VALUE = 2;
    var BRIGHTNESS_SECOND_AUX_VALUE = 1;

    var styles = {
      'effects__preview--none': function () {
        document.querySelector('.effect-level').classList.add('hidden');
      },

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
  };

  var setScale = function () {

    var SCALE_STEP = 25;

    var scaleValue = document.querySelector('.scale__control--value');
    var scaleSmaller = document.querySelector('.scale__control--smaller');
    var scaleBigger = document.querySelector('.scale__control--bigger');
    var currentScaleValue = MAX_VALUE;
    scaleValue.value = currentScaleValue + '%';
    var img = document.querySelector('.img-upload__preview > img');

    var setScaleValue = function () {
      img.style.transform = 'scale(' + currentScaleValue / 100 + ')';
    };

    var setOptions = function () {
      scaleValue.value = currentScaleValue + '%';
      img.style.transform = 'scale(' + currentScaleValue / 100 + ')';
    };

    var getSmaller = function () {
      if (currentScaleValue > MIN_VALUE) {
        currentScaleValue -= SCALE_STEP;
      }
      setOptions(currentScaleValue);
    };

    var getBigger = function () {
      if (currentScaleValue < MAX_VALUE) {
        currentScaleValue += SCALE_STEP;
      }
      setOptions(currentScaleValue);
    };
    setScaleValue();
    scaleSmaller.addEventListener('click', getSmaller);
    scaleBigger.addEventListener('click', getBigger);
  };

  var formReset = function () {
    setPictureOptions('none');
    setScale();
    showPicturePreview();
  };

  sliderLine.addEventListener('click', onMouseClick);
  sliderPin.addEventListener('mousedown', onMouseDown);

  window.preview = {
    formReset: formReset
  };
}());
