const { GraphQLList } = require('graphql');
const { AuthorType } = require('../../types');
const { getAuthors } = require('../authorsModel');

module.exports = {
  name: 'getAuthors Query',
  type: new GraphQLList(AuthorType),
  args: {},
  resolve() {
    return getAuthors();
  },
};
