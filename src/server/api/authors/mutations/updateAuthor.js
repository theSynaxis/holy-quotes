const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');
const { AuthorType } = require('../../types');
const { updateAuthor } = require('../authorsModel');

module.exports = {
  name: 'updateAuthor Mutation',
  type: AuthorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    born: { type: new GraphQLNonNull(GraphQLString) },
    died: { type: new GraphQLNonNull(GraphQLString) },
    isBC: { type: new GraphQLNonNull(GraphQLBoolean) },
    feastDate: { type: new GraphQLNonNull(GraphQLInt) },
    feastMonth: { type: new GraphQLNonNull(GraphQLInt) },
    life: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    return updateAuthor(args);
  },
};
