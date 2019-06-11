'use strict';

// функция для создания случайных чисел от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var arrayComments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var comments = [];
var arrayPhotos = [];
var names = ['Артем', 'Юрий', 'Ирина', 'Карина', 'Руслан'];

function createPhotoArray() {
  var url = 'photos/' + i + '.jpg';
  var likes = getRandomInt(15, 200);

  return ({url: url, likes: likes});
}

for (var i = 1; i <= 25; i++) {
  createPhotoArray();
  arrayPhotos.push(createPhotoArray());
}

function createCommentArray() {
  var avatar = 'url:(img/' + getRandomInt(0, j) + '.svg)'; // случайная аватарка
  var name = names[getRandomInt(0, names.length - 1)]; // случайное имя из массива имен
  var comment = arrayComments[getRandomInt(0, arrayComments.length - 1)]; // случайный комментарий

  return ({avatar: avatar, name: name, comment: comment});
}

for (var j = 1; j <= arrayComments.length; j++) { // количество комментариев равно длине массива с комментариями
  createCommentArray();
  comments.push(createCommentArray());
}

// вставка элементов на страницу

var userPicture = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();


function createPhotoParameters() {
  userPhoto.querySelector('.picture__img').setAttribute('src', currentPhoto.url);
  userPhoto.querySelector('.picture__likes').textContent = currentPhoto.likes;
}

function createPhotoComments() {
  var currentComment = []; // массив с комментариями к текущей фотографии

  for (var k = 0; k < getRandomInt(0, comments.length); k++) { // случайный выбор кол-ва комментариев, макс = длине comments
    currentComment.push(comments[k]);
  }
  userPhoto.querySelector('.picture__comments').textContent = currentComment.length;
}

for (var t = 0; t < arrayPhotos.length; t++) {

  var userPhoto = document.querySelector('#picture').content.cloneNode(true);
  var currentPhoto = arrayPhotos[t];

  createPhotoComments();
  createPhotoParameters();
  fragment.appendChild(userPhoto);
}

userPicture.appendChild(fragment);
