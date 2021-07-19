const { GraphQLObjectType } = require('graphql');
const {
  addAuthor,
  updateAuthor,
  deleteAuthor,
  restoreAuthor,
} = require('./authors/mutations');

module.exports = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAuthor,
    updateAuthor,
    deleteAuthor,
    restoreAuthor,
  },
});
