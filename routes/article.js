const articlesRouter = require('express').Router();
const { getArticles, getSingleArticle, patchSingleArticle } = require('../controllers/articles-controller');

articlesRouter.route('/').get(getArticles);
articlesRouter.route('/:article_id').get(getSingleArticle).patch(patchSingleArticle);


module.exports =  { articlesRouter };