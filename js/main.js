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

(function() {

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

    uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    uploadOverlay.classList.remove('hidden');

    document.addEventListener('keydown', function () {
      if (evt.keyCode === ESC) {
        closeOverlay();
      }
    });

    closeButton.addEventListener('click', function () {
      closeOverlay();
    });
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
  var activeFilter = '.effects__preview--none';
  var imgPreview = document.querySelector('.img-upload__preview');
  document.querySelector('.effect-level').classList.add('hidden');

  for (var i = 0; i < effectsButton.length; i++) {

    var onChangeListener = function () {

      var j = i;

      return function () {
        // imgPreview.classList.remove('img-upload__preview');

        imgPreview.classList.remove(activeFilter);
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
    effectsButton[i].addEventListener('change', onChangeListener());
  }
}());

// Насыщенность

(function () {

  var sliderPin = document.querySelector('.effect-level__pin');

  var sliderLine = document.querySelector('.effect-level__line');

  var sliderLineDepth = document.querySelector('.effect-level__depth');

  sliderLine.addEventListener('click', function(evt){
    evt.preventDefault();

    var sliderLineCoords = sliderLine.getBoundingClientRect();

    var sliderLineCoordsLeft = sliderLineCoords.left;

    var clickCoords = {
      x: evt.clientX
    }

    var clickValue = clickCoords.x - sliderLineCoordsLeft;

    var SLIDER_LINE_WIDTH = 450;

    sliderPin.style.left = Math.floor(clickValue/(SLIDER_LINE_WIDTH/100)) + '%';

    sliderLineDepth.style.width = Math.floor(clickValue/(SLIDER_LINE_WIDTH/100)) + '%';

    // saturation

    (function saturation() {

      var chromValue = Math.floor(clickValue/(SLIDER_LINE_WIDTH/100))/100;
      var sepiaValue = Math.floor(clickValue/(SLIDER_LINE_WIDTH/100))/100;
      var brightnessValue = Math.floor(clickValue*2/(SLIDER_LINE_WIDTH/100))/100 + 1;
      var marvinValue = sliderPin.style.left;
      var phobosValue = Math.floor(clickValue*3/(SLIDER_LINE_WIDTH/100))/100 + 'px';

      /*var effectsArray = {
        none: '',
        chrome: 'grayscale(' + chromValue + ')',
        sepia: 'sepia(' + sepiaValue + ')',
        marvin: 'invert(' + marvinValue + ')',
        phobos: 'blur(' + phobosValue + ')',
        heat: 'brightness(' + brightnessValue + ')'
      }*/

      document.querySelector('.effects__preview--chrome').style.filter = 'grayscale(' + chromValue + ')';
      document.querySelector('.effects__preview--sepia').style.filter = 'sepia(' + sepiaValue + ')';
      document.querySelector('.effects__preview--marvin').style.filter = 'invert(' + marvinValue + ')';
      document.querySelector('.effects__preview--phobos').style.filter = 'blur(' + phobosValue + ')';
      document.querySelector('.effects__preview--heat').style.filter = 'brightness(' + brightnessValue + ')';

    }());
  });
}());


/*(function sliderPinMoving() {

  var sliderPin = document.querySelector('.effect-level__pin'); // пин слайдера

  sliderPin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var coordsX = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: coordsX.x - moveEvt.clientX
      };

      coordsX = {
        x: moveEvt.clientX
      };

      sliderPin.style.left = (sliderPin.offsetLeft - shift.x) + 'px';

      (function intensity() {

      var sliderLineDepth = document.querySelector('.effect-level__depth');

      sliderLineDepth.style.width = Math.floor((sliderPin.offsetLeft - shift.x)/4.5) + '%';


      var intensityValue = Math.floor((sliderPin.offsetLeft - shift.x)/4.5)/100;


      var effectChrome = document.querySelector('.effects__preview--chrome');
      var effectSepia = document.querySelector('.effects__preview--sepia');

      effectChrome.style.filter = 'grayscale(' + intensityValue + ')';
      effectSepia.style.filter = 'sepia(' + intensityValue + ')';

      console.log(effectChrome.style.filter);
      console.log(intensityValue);
      console.log(sliderLineDepth.style.width);
    }());
      // ограничения min/max

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  })
}());
*/
