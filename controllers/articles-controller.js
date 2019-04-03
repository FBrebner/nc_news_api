const { selectArticles, selectSingleArticle } = require('../models/articles-model')

exports.getArticles = (req, res, next) => {
    selectArticles(req.query).then(articles =>res.status(200).json({ articles }))
};

exports.getSingleArticle = (req, res, next) => {
    selectSingleArticle(req.params.article_id).then(([article]) =>res.status(200).json({ article }))
};