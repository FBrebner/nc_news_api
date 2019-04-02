 const { topicsData, usersData, articlesData, commentsData } = require('../data');
 const { timestampToDate, nameAndIDs, replaceCategoryWithID } = require('/Users/northcoders/nc_news_api/utils/data_normalisation.js')

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => {
    return knex.migrate.latest()
    })
    .then(() => { return knex('topics').insert(topicsData).returning('*')
    })
    //.then((topicRows) => console.log(topicRows))
    .then(() => { return knex('users').insert(usersData).returning('*')
  })
  .then(() => {const formattedArticles = timestampToDate(articlesData)
    return knex('articles').insert(formattedArticles).returning('*')
    .then((articleRows) => {const formattedComments = timestampToDate(commentsData)
      const articleRefs = nameAndIDs(articleRows, 'title', 'article_id')
      const commentsWithIDs = replaceCategoryWithID(formattedComments, 'belongs_to', 'article_id', articleRefs)
      return knex('comments').insert(commentsWithIDs).returning(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body'])
    })
  })
  
};
