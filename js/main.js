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

function getParameters(element, photo) {
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

    getParameters(userPhoto, currentPhoto);

    fragment.appendChild(userPhoto);
  }

  var userPicture = document.querySelector('.pictures');

  userPicture.appendChild(fragment);
}

createPhotosNode();
