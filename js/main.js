'use strict';

// функция для создания случайных чисел от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var arrayPhotos = [];
var PHOTOS_MAX = 25;
var PHOTOS_MIN = 1;

function createPhotoArray() {
  var url = 'photos/' + i + '.jpg';
  var likes = getRandomInt(15, 200);

  return ({url: url, likes: likes});
}

for (var i = PHOTOS_MIN; i <= PHOTOS_MAX; i++) {
  createPhotoArray();
  arrayPhotos.push(createPhotoArray());
}

var comments = [];

/*var arrayComments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function createCommentArray() {

  var names = ['Артем', 'Юрий', 'Ирина', 'Карина', 'Руслан'];
  var avatar = 'url:(img/' + getRandomInt(1, arrayComments.length) + '.svg)'; // случайная аватарка
  var name = names[getRandomInt(0, names.length - 1)]; // случайное имя из массива имен
  var comment = arrayComments[getRandomInt(0, arrayComments.length - 1)]; // случайный комментарий

  return ({avatar: avatar, name: name, comment: comment});
}

for (var j = 0; j < arrayComments.length; j++) { // количество комментариев равно длине массива с комментариями
  createCommentArray();
  comments.push(createCommentArray());
}*/

function createCommentArray() {

  var names = ['Артем', 'Юрий', 'Ирина', 'Карина', 'Руслан'];
  var arrayComments = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  for (var j = 0; j < arrayComments.length; j++) {

    var avatar = 'url:(img/' + getRandomInt(1, arrayComments.length) + '.svg)'; // случайная аватарка
    var name = names[getRandomInt(0, names.length - 1)]; // случайное имя из массива имен
    var comment = arrayComments[getRandomInt(0, arrayComments.length - 1)]; // случайный комментарий

    comments.push ({avatar: avatar, name: name, comment: comment});
  }
 // return не знаю как вывести полученный результат??
}

console.log(comments);

// вставка элементов на страницу



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

var userPicture = document.querySelector('.pictures');// поиск контейнера .pictures
var fragment = document.createDocumentFragment();// создание фрагмента

for (var t = 0; t < arrayPhotos.length; t++) { // подготовка фрагмента

  var userPhoto = document.querySelector('#picture').content.cloneNode(true);
  var currentPhoto = arrayPhotos[t];

  createPhotoComments();
  createPhotoParameters();
  fragment.appendChild(userPhoto);
}

userPicture.appendChild(fragment); //вставка готового фрагмента
