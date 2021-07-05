const { GraphQLObjectType } = require('graphql');
const { addAuthor } = require('./authors/mutations');

module.exports = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAuthor,
  },
});
