'use strict';

// функция для создания случайных чисел от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPhotoArray() {
  var PHOTOS_MAX = 25;
  var PHOTOS_MIN = 1;
  var LIKES_MAX = 200;
  var LIKES_MIN = 15;
  var localPhotos = [];

  for (var i = PHOTOS_MIN; i <= PHOTOS_MAX; i++) {
    var url = 'photos/' + i + '.jpg';
    var likes = getRandomInt(LIKES_MIN, LIKES_MAX);

    localPhotos.push({url: url, likes: likes});
  }
  return localPhotos;
}

function createCommentArray() {
  var names = ['Артем', 'Юрий', 'Ирина', 'Карина', 'Руслан'];
  var comments = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var localComments = [];

  for (var i = 0; i < comments.length; i++) {
    var avatar = 'url:(img/' + getRandomInt(1, comments.length) + '.svg)'; // случайная аватарка
    var name = names[getRandomInt(0, names.length - 1)]; // случайное имя из массива имен
    var comment = comments[getRandomInt(0, comments.length - 1)]; // случайный комментарий

    localComments.push({avatar: avatar, name: name, comment: comment});
  }
  return localComments;
}

// вставка элементов на страницу

(function () {

  function getPhotoComments() {
    var arrayComments = createCommentArray();
    var currentComment = []; // массив с комментариями к текущей фотографии
    var randomCount = getRandomInt(0, arrayComments.length);

    for (var i = 0; i < randomCount; i++) { // случайный выбор кол-ва комментариев, макс = длине comments
      currentComment.push(arrayComments[i]);
    }
    return currentComment.length;
  }

  function fillPhotoHtml(element, photo) {
    element.querySelector('.picture__img').setAttribute('src', photo.url);
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = getPhotoComments();
  }

  function createPhotosNode() {
    var arrayPhotos = createPhotoArray();
    var fragment = document.createDocumentFragment();// создание фрагмента

    for (var i = 0; i < arrayPhotos.length; i++) {
      var userPhoto = document.querySelector('#picture').content.cloneNode(true);
      var currentPhoto = arrayPhotos[i];

      fillPhotoHtml(userPhoto, currentPhoto);

      fragment.appendChild(userPhoto);
    }
    var userPicture = document.querySelector('.pictures');

    userPicture.appendChild(fragment);
  }

  createPhotosNode();

})();

// Загрузка изображения и показ формы редактирования

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeButton = document.querySelector('#upload-cancel');
  var ESC = 27;

  function closeOverlay() {
    uploadOverlay.classList.add('hidden');
  }

  function showOverlay() {
    uploadOverlay.classList.remove('hidden');
  }

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    showOverlay();

    document.addEventListener('keydown', function (escEvt) {
      if (escEvt.keyCode === ESC) {
        closeOverlay();
      }
    });

    closeButton.addEventListener('click', function () {
      closeOverlay();
    });
  });

  var commentInput = document.querySelector('.text__description');

  commentInput.setAttribute('tabindex', '0');
  commentInput.setAttribute('maxlength', '140');

  var escPreventer = function (evt) {
    if (evt.keyCode === ESC) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  };

  commentInput.addEventListener('focus', function (evt) {
    evt.preventDefault();
    commentInput.addEventListener('keydown', escPreventer);
  });
  commentInput.addEventListener('blur', function () {
    commentInput.removeEventListener('keydown', escPreventer);
  });
}());

// Применение эффекта для изображения и Редактирование размера изображения

(function () {

  var effectsList = ['effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];

  var effectsButton = document.querySelectorAll('.effects__radio');
  var activeFilter = 'effects__preview--none';
  var imgPreview = document.querySelector('.img-upload__preview');
  document.querySelector('.effect-level').classList.add('hidden');

  for (var i = 0; i < effectsButton.length; i++) {

    var onChangeListener = function () {
      var j = i;
      return function () {
        var MAX_VALUE = 100 + '%';
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
  sliderLineDepth.style.width = sliderPin.style.left;

  var onMouseClick = function (evt) {
    evt.preventDefault();

    var sliderLineCoordsLeft = sliderLine.getBoundingClientRect().left;
    var clickCoords = evt.clientX;
    var sliderWidth = sliderLine.offsetWidth;
    var clickValue = clickCoords - sliderLineCoordsLeft;

    sliderPin.style.left = Math.round(clickValue / (sliderWidth / 100)) + '%';

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

      pinMove(shift);
      intensity(moveValue, sliderWidth);
    }

      var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  function pinMove(shift) {

    var sliderMinValue = sliderPin.offsetLeft - shift;
    var sliderMaxValue = document.querySelector('.effect-level__line').offsetWidth;

    sliderPin.style.left = ((sliderPin.offsetLeft - shift) / (sliderMaxValue / 100)) + '%';

    if (sliderMinValue < 0) {
      sliderPin.style.left = 0;
    } if(sliderMinValue > sliderMaxValue) {
      sliderPin.style.left = 100 + '%';
    }
  }

  function intensity(position, width) {

    var PHOBOS_AUX_VALUE = 3;
    var BRIGHTNESS_FIRST_AUX_VALUE = 2;
    var BRIGHTNESS_SECOND_AUX_VALUE = 1;

    var styles = {
      'effects__preview--chrome': function () {
        var chromeValue = Math.round(position / (width / 100)) / 100;
        return 'grayscale(' + chromeValue + ')';
      },
      'effects__preview--sepia': function () {
        var sepiaValue = Math.round(position / (width / 100)) / 100;
        return 'sepia(' + sepiaValue + ')';
      },
      'effects__preview--marvin': function () {
        var marvinValue = Math.round(position / (width / 100)) + '%';
        return 'invert(' + marvinValue + ')';
      },
      'effects__preview--phobos': function () {
        var phobosValue = Math.round(position * PHOBOS_AUX_VALUE / (width / 100)) / 100 + 'px';
        return 'blur(' + phobosValue + ')';
      },
      'effects__preview--heat': function () {
        var brightnessValue = Math.round(position * BRIGHTNESS_FIRST_AUX_VALUE / (width / 100)) / 100 + BRIGHTNESS_SECOND_AUX_VALUE;
        return 'brightness(' + brightnessValue + ')';
      }
    };

    var effectsPreview = document.querySelector('.img-upload__preview');

    if (activeFilter !== 'effects__preview--none') {
      if (typeof styles[activeFilter] === 'string') {
        effectsPreview.style.filter = styles[activeFilter];
      } else {
        effectsPreview.style.filter = styles[activeFilter]();
      }
    }
  }

 sliderLine.addEventListener('click', onMouseClick);
 sliderPin.addEventListener('mousedown', onMouseDown);
}());
