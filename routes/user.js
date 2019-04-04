const usersRouter = require('express').Router();
const {getSingleUser} = require('../controllers/users-controller');
const { methodNotAllowed } = require('../errors')

usersRouter.route('/:username').get(getSingleUser).all(methodNotAllowed);


module.exports =  { usersRouter };