'use strict';

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var arrayComments = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var arrayPhotos = [];//создал массив объектов

for (var i = 1; i <= 25; i++) {
  var url = 'photos/' + i + '.jpg';
  var likes = getRandomInt(15, 200);

  var comments = [];
  var names = ['Артем', 'Юрий', 'Ирина', 'Карина', 'Руслан'];

  for (var j = 1; j <= arrayComments.length; j++) {
    var avatar = 'url:(img/' + j + '.svg)';
    var name = names[getRandomInt(0, names.length-1)];
  };

  var comment = arrayComments[getRandomInt(0, arrayComments.length-1)];

  comments.push({avatar, name, comment});
  arrayPhotos.push({url, likes, comments});
};

console.log(arrayPhotos[5]);


//не работает
var img = document.querySelector('#picture').content.querySelector('.picture__img');
img.setAttribute('src', url);
var like = document.querySelector('#picture').content.querySelector('.picture__likes');
like.textContent = likes;
var picture_comment = document.querySelector('#picture').content.querySelector('.picture__comments');
picture_comment.textContent = 'comment';


//вставка элементов на страницу
var userPicture = document.querySelector('.pictures');

var picturesContent = document.querySelector('#picture').content;
console.log(userPicture);

for (i = 0; i < arrayPhotos.length; i++) {
  var userPhoto = picturesContent.cloneNode(true);
  userPicture.appendChild(userPhoto);
};

userPicture.insertAdjacentHTML('beforeend', '<div></div>')
