const { GraphQLNonNull, GraphQLID } = require('graphql');
const { AuthorType } = require('../../types');
const { restoreAuthor } = require('../authorsModel');

module.exports = {
  name: 'restoreAuthor Mutation',
  type: AuthorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parents, args) {
    return restoreAuthor(args.id);
  },
};
