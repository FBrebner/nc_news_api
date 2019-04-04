const usersRouter = require('express').Router();
const {getSingleUser} = require('../controllers/users-controller');

usersRouter.route('/:username').get(getSingleUser)


module.exports =  { usersRouter };