const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const { AuthorType } = require('../../types');
const { addAuthor } = require('../authorsModel');

module.exports = {
  name: 'addAuthor Mutation',
  type: AuthorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    born: { type: new GraphQLNonNull(GraphQLString) },
    died: { type: new GraphQLNonNull(GraphQLString) },
    isBC: { type: GraphQLBoolean },
    feastDay: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(args) {
    return addAuthor(args);
  },
};
