const { GraphQLNonNull, GraphQLID } = require('graphql');
const { AuthorType } = require('../../types');
const { deleteAuthor } = require('../authorsModel');

module.exports = {
  name: 'deleteAuthor Mutation',
  type: AuthorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return deleteAuthor(args.id);
  },
};
