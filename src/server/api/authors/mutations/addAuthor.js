const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');
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
    feastDate: { type: new GraphQLNonNull(GraphQLInt) },
    feastMonth: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve(parent, args) {
    return addAuthor(args);
  },
};
