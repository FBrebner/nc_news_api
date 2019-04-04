const { selectSingleUser } = require('../models/users_model')


exports.getSingleUser = (req, res, next) => {
    selectSingleUser(req.params.username).then(([user]) =>res.status(200).json({ user }))
};