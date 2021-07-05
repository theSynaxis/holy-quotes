const { GraphQLNonNull, GraphQLID } = require('graphql');
const { AuthorType } = require('../../types');
const { getAuthor } = require('../authorsModel');

module.exports = {
  name: 'getAuthor Query',
  type: AuthorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(args) {
    return getAuthor(args.id);
  },
};
