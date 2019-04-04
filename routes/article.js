const articlesRouter = require('express').Router();
const { getArticles, getSingleArticle, patchSingleArticle, deleteSingleArticle, getArticleComments, postArticleComment } = require('../controllers/articles-controller');
const { methodNotAllowed } = require('../errors')

articlesRouter.route('/').get(getArticles).all(methodNotAllowed);
articlesRouter.route('/:article_id').get(getSingleArticle).patch(patchSingleArticle).delete(deleteSingleArticle).all(methodNotAllowed);
articlesRouter.route('/:article_id/comments').get(getArticleComments).post(postArticleComment).all(methodNotAllowed);

module.exports =  { articlesRouter };