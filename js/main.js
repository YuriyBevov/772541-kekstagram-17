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

// Загрузка изображения и показ формы редактирования

function uploadFile() {

  var file = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeOverlay = document.querySelector('#upload-cancel');

  file.addEventListener('change', function(evt) {
    evt.preventDefault();
    uploadOverlay.classList.remove('hidden');

    document.addEventListener('keydown', function(evt){
      if (evt.keyCode == 27) {
        uploadOverlay.classList.add('hidden');
      }
    });
  });

  closeOverlay.addEventListener('click', function() {
    uploadOverlay.classList.add('hidden');
  });
}

uploadFile();

// Применение эффекта для изображения и Редактирование размера изображения

function changeEffects() {

  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderLine = document.querySelector('.effect-level__depth')
  var imgPreview = document.querySelector('.img-upload__preview');
  var STEP = 20;


  var effectsList = ['effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];

  var effectsButton = document.querySelectorAll('.effects__radio');

  for (let i = 0; i < effectsButton.length; i++) {
    effectsButton[i].addEventListener('click', function() {
    imgPreview.classList.add(effectsList[i]);
    sliderPin.style.left = [i] * STEP + '%';
    sliderLine.style.width = [i] * STEP + '%';
    console.log(i);
  });
 }
}

changeEffects();

var effectLevel = document.querySelector('.effect-level__value')
var sliderControl = document.querySelector('.effect-level');
/*
if (effectLevel.value == 0) {
  sliderLine.classList.add('hidden');
}

if (effectLevel.value == 20) {
  imgPreview.classList.add(effectsList[0]);
}

if (effectLevel.value == 40) {
  imgPreview.classList.add(effectsList[1]);
}

if (effectLevel.value == 60) {
  imgPreview.classList.add(effectsList[2]);
}

if (effectLevel.value == 80) {
  imgPreview.classList.add(effectsList[3]);
}

if (effectLevel.value == 100) {
  imgPreview.classList.add(effectsList[4]);
}*/
