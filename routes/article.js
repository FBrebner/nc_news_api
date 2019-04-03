const articlesRouter = require('express').Router();
const { getArticles, getSingleArticle, patchSingleArticle, deleteSingleArticle, getArticleComments } = require('../controllers/articles-controller');

articlesRouter.route('/').get(getArticles);
articlesRouter.route('/:article_id').get(getSingleArticle).patch(patchSingleArticle).delete(deleteSingleArticle);
articlesRouter.route('/:article_id/comments').get(getArticleComments)

module.exports =  { articlesRouter };