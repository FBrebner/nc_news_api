const endpoints = require('/Users/northcoders/nc_news_api/endpoints.json')


exports.showAllEndpoints = (req, res, next) => {
    res.status(200).json(endpoints)
};