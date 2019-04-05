const endpoints = require('../endpoints.json')


exports.showAllEndpoints = (req, res, next) => {
    res.status(200).json(endpoints)
};