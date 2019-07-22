/**
 * @file Модуль загрузки комментари
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  window.hideComments = function () {

    /* var currentCommentsCount = document.querySelector('.social__comment-count'); //  надпись количества показанных комментариев
    var allCommentsCount = document.querySelector('.comments-count'); // надпись общего кол-ва комментариев
    var commentsLoaderBtn = document.querySelector('.comments-loader'); // кнопка загрузки комментариев
    var commentsArray = document.querySelectorAll('.social__comment'); // массив комментариев к фото
    // document.querySelector('.comments-loader').classList.remove('visually-hidden');

    var visibleComments = 5;
    var hiddenComments = [];
    allCommentsCount = commentsArray.length;
    currentCommentsCount.innerText = visibleComments + ' из ' + allCommentsCount + ' комментариев';
    console.log(allCommentsCount);

    var showComments = function () {
      for (var i = visibleComments; i < commentsArray.length; i++) {
        commentsArray[i].classList.add('visually-hidden');
        hiddenComments.push(commentsArray[i]);
      }
    };

    commentsLoaderBtn.addEventListener('click', function () {
      var iterations = 0;
      if (hiddenComments.length > 5) {
        iterations = 5;
        visibleComments += 5;
        currentCommentsCount.innerText = visibleComments + ' из ' + allCommentsCount + ' комментариев';
      } else if (hiddenComments.length < 5) {
        iterations = hiddenComments.length;
        visibleComments += hiddenComments.length;
        currentCommentsCount.innerText = visibleComments + ' из ' + allCommentsCount + ' комментариев';
      }
      for (var i = 0; i < iterations; i++) {
        hiddenComments[i].classList.remove('visually-hidden');
      }
      hiddenComments.splice(0, iterations);
    });
    showComments(); */
  };
}());
