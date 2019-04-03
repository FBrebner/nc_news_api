const articlesRouter = require('express').Router();
const { getArticles, getSingleArticle } = require('../controllers/articles-controller');

articlesRouter.route('/').get(getArticles);
articlesRouter.route('/:article_id').get(getSingleArticle);


module.exports =  { articlesRouter };