/**
 * @file модуль данных
 * @author Yuriy Bevov
 * @deprecated
 */

'use strict';

(function () {
  var getRandom = window.util.getRandom;

  var comments = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];



  var names = ['Артем', 'Юрий', 'Ирина', 'Карина', 'Руслан'];

  var createPhotoArray = function () {
    var PHOTOS_MAX = 25;
    var PHOTOS_MIN = 1;
    var LIKES_MAX = 200;
    var LIKES_MIN = 15;
    var localPhotos = [];

    for (var i = PHOTOS_MIN; i <= PHOTOS_MAX; i++) {
      var url = 'photos/' + i + '.jpg';
      var likes = getRandom(LIKES_MIN, LIKES_MAX);

      localPhotos.push({url: url, likes: likes});
    }
    return localPhotos;
  };

  var createCommentArray = function () {

    var localComments = [];

    for (var i = 0; i < window.data.comments.length; i++) {
      var avatar = 'url:(img/' + getRandom(1, window.data.comments.length) + '.svg)'; // случайная аватарка
      var name = window.data.names[getRandom(0, window.data.names.length - 1)]; // случайное имя из массива имен
      var comment = window.data.comments[getRandom(0, window.data.comments.length - 1)]; // случайный комментарий

      localComments.push({avatar: avatar, name: name, comment: comment});
    }
    return localComments;
  };

  var getPhotoComments = function () {
    var arrayComments = createCommentArray();
    var currentComment = []; // массив с комментариями к текущей фотографии
    var randomCount = getRandom(0, arrayComments.length);

    for (var i = 0; i < randomCount; i++) { // случайный выбор кол-ва комментариев, макс = длине comments
      currentComment.push(arrayComments[i]);
    }
    return currentComment.length;
  };

  window.data = {
    names: names,
    comments: comments,
    createPhotoArray: createPhotoArray,
    getPhotoComments: getPhotoComments,
    createCommentArray: createCommentArray
  };
}());
