const { GraphQLObjectType } = require('graphql');
const { getAuthor, getAuthors } = require('./authors/queries');

module.exports = new GraphQLObjectType({
  name: 'Root Query',
  fields: {
    getAuthor,
    getAuthors,
  },
});
