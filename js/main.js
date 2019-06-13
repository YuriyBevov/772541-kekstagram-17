'use strict';

// функция для создания случайных чисел от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var arrayPhotos = createPhotoArray();
var arrayComments = createCommentArray();

function createPhotoArray() {
  var PHOTOS_MAX = 25;
  var PHOTOS_MIN = 1;
  var localPhotos = [];

  for (var i = PHOTOS_MIN; i <= PHOTOS_MAX; i++) {
    var url = 'photos/' + i + '.jpg';
    var likes = getRandomInt(15, 200);

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

function createElement() {
  var userPicture = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment(); // создание фрагмента

  function getPhotoParameters() {
    userPhoto.querySelector('.picture__img').setAttribute('src', currentPhoto.url);
    userPhoto.querySelector('.picture__likes').textContent = currentPhoto.likes;
  }

  function getPhotoComments() { // не корректно работает ?!
    var currentComment = []; // массив с комментариями к текущей фотографии

    for (var i = 0; i < getRandomInt(0, arrayComments.length); i++) { // случайный выбор кол-ва комментариев, макс = длине comments
      currentComment.push(arrayComments[i]);
    }
    userPhoto.querySelector('.picture__comments').textContent = currentComment.length;
  }

  for (var i = 0; i < arrayPhotos.length; i++) {
    var userPhoto = document.querySelector('#picture').content.cloneNode(true);
    var currentPhoto = arrayPhotos[i];

    getPhotoComments();
    getPhotoParameters();
    fragment.appendChild(userPhoto);
  }
  userPicture.appendChild(fragment);
  // return ??
}

createElement();
