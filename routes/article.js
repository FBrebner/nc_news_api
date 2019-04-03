const articlesRouter = require('express').Router();
const { getArticles, getSingleArticle, patchSingleArticle, deleteSingleArticle } = require('../controllers/articles-controller');

articlesRouter.route('/').get(getArticles);
articlesRouter.route('/:article_id').get(getSingleArticle).patch(patchSingleArticle).delete(deleteSingleArticle);


module.exports =  { articlesRouter };