const { selectSingleUser } = require('../models/users_model')


exports.getSingleUser = (req, res, next) => {
    selectSingleUser(req.params.username).then(([user]) =>{
        if (!user) {next({ status: 404})} else{ res.status(200).json({ user })}})
};