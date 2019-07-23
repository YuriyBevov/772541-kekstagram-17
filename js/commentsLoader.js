/**
 * @file Модуль загрузки комментари
 * @author Yuriy Bevov
 */

'use strict';

(function () {

  window.hideComments = function () {

    var currentCommentsCount = document.querySelector('.social__comment-count'); //  надпись количества показанных комментариев
    var commentsCount = document.querySelector('.comments-count'); // надпись общего кол-ва комментариев
    var commentsLoaderBtn = document.querySelector('.comments-loader'); // кнопка загрузки комментариев
    var commentsArray = document.querySelectorAll('.social__comment'); // массив комментариев к фото
    document.querySelector('.comments-loader').classList.remove('visually-hidden');

    var VISIBLE_COMMENTS_STEP = 5;
    var visibleComments = 5;
    var hiddenComments = [];
    commentsCount = commentsArray.length;
    currentCommentsCount.innerText = visibleComments + ' из ' + commentsCount + ' комментариев';

    var showComments = function () {
      for (var i = visibleComments; i < commentsArray.length; i++) {
        commentsArray[i].classList.add('visually-hidden');
        hiddenComments.push(commentsArray[i]);
      }
    };

    commentsLoaderBtn.addEventListener('click', function () {
      var addComments = 0;
      if (hiddenComments.length > VISIBLE_COMMENTS_STEP) {
        addComments = VISIBLE_COMMENTS_STEP;
        visibleComments += VISIBLE_COMMENTS_STEP;
        currentCommentsCount.innerText = visibleComments + ' из ' + commentsCount + ' комментариев';
      } else if (hiddenComments.length < VISIBLE_COMMENTS_STEP && hiddenComments.length > 0) {
        addComments = hiddenComments.length;
        visibleComments += hiddenComments.length;
        currentCommentsCount.innerText = visibleComments + ' из ' + commentsCount + ' комментариев';
        document.querySelector('.comments-loader').classList.add('visually-hidden');
      }
      for (var i = 0; i < addComments; i++) {
        hiddenComments[i].classList.remove('visually-hidden');
      }
      hiddenComments.splice(0, addComments);
    });
    showComments();
  };
}());
