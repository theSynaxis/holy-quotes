const { GraphQLObjectType } = require('graphql');
const {
  addAuthor,
  updateAuthor,
  deleteAuthor,
} = require('./authors/mutations');

module.exports = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAuthor,
    updateAuthor,
    deleteAuthor,
  },
});
