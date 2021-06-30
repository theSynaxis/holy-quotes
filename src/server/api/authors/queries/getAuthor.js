const { GraphQLID } = require('graphql');
const { AuthorType } = require('../../types');
const { getAuthor } = require('../authorsModel');

module.exports = {
  name: 'getAuthor Query',
  type: AuthorType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(args) {
    return getAuthor(args.id);
  },
};
