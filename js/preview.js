/**
 * @file Модуль применений эффекта для изображения
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  var effectsList = ['effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];

  var effectsButton = document.querySelectorAll('.effects__radio');
  var imgPreview = document.querySelector('.img-upload__preview');
  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderLine = document.querySelector('.effect-level__line');
  var sliderLineDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var MAX_VALUE = 100 + '%';

  var activeFilter;

  function picturePreview () {

    activeFilter = 'effects__preview--none';
    imgPreview.classList.add(activeFilter);
    effectsButton[0].setAttribute('checked', true);
    document.querySelector('.effect-level').classList.add('hidden');

    for (var i = 0; i < effectsButton.length; i++) {

      var onChangeListener = function () {
        var j = i;

        return function () {
          imgPreview.classList.remove(activeFilter);
          sliderPin.style.left = MAX_VALUE;
          effectLevelValue.value = MAX_VALUE;
          sliderLineDepth.style.width = MAX_VALUE;
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
    console.log(activeFilter);
  }
window.preview = {
  picturePreview: picturePreview
}
  // picturePreview();

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

  function pinMoveByShift(shift) {

    var sliderMinValue = sliderPin.offsetLeft - shift;
    var sliderMaxValue = document.querySelector('.effect-level__line').offsetWidth;
    var positionByShift = ((sliderPin.offsetLeft - shift) / (sliderMaxValue / 100)) + '%';
    effectLevelValue.value = Math.round((sliderPin.offsetLeft - shift) / (sliderMaxValue / 100));

    if (sliderMinValue < 0) {
      positionByShift = 0;
      effectLevelValue.value = 0;
    } if (sliderMinValue > sliderMaxValue) {
      positionByShift = MAX_VALUE;
      effectLevelValue.value = MAX_VALUE;
    }

    sliderPin.style.left = positionByShift;
    setSliderLineWidth(positionByShift);
  }

  function pinMoveByClick(clickValue) {
    var positionByClick = Math.round(clickValue / (sliderLine.offsetWidth / 100)) + '%';
    sliderPin.style.left = positionByClick;
    effectLevelValue.value = Math.round(clickValue / (sliderLine.offsetWidth / 100));
    setSliderLineWidth(positionByClick);
  }

  function setSliderLineWidth(value) {
    sliderLineDepth.style.width = value;
  }

  function setIntensity(position, width) {

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

  function setScale () {
    var MAX_VALUE = 100;
    var SCALE_STEP = 25;
    var MIN_VALUE = 25;

    var scaleValue = document.querySelector('.scale__control--value');
    var scaleSmaller = document.querySelector('.scale__control--smaller');
    var scaleBigger = document.querySelector('.scale__control--bigger');
    var currentScaleValue = MAX_VALUE;
    scaleValue.value = currentScaleValue + '%';
    var img = document.querySelector('.img-upload__preview > img');

    function setOptions () {
      scaleValue.value = currentScaleValue + '%';
      img.style.transform = 'scale(' + currentScaleValue/100 + ')';
    }

    function getSmaller () {
      if (currentScaleValue > MIN_VALUE) {
        currentScaleValue -= SCALE_STEP;
        setOptions(currentScaleValue);
      }
    }

    function getBigger () {
      if (currentScaleValue < MAX_VALUE) {
        currentScaleValue += SCALE_STEP;
        setOptions(currentScaleValue);
      }
    }

    scaleSmaller.addEventListener('click', getSmaller);
    scaleBigger.addEventListener('click', getBigger);
  };

  setScale();
  sliderLine.addEventListener('click', onMouseClick);
  sliderPin.addEventListener('mousedown', onMouseDown);
}());
