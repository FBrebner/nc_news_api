const connection = require('../db/connection');

exports.selectSingleUser = ( username ) => {
    return connection('users')
    .from('users')
    .where('username', '=', username)
    .returning('*')
};