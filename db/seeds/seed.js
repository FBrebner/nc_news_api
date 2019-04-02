// const {  } = require('../data');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => { knex('topics').insert(topicsData).returning('*'));
    .then( => {

      //make sure to note that the author comes from created_by
      //comments require using belongs-to and matching with title to get article id
    });
};
