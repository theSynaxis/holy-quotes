const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const AuthorType = new GraphQLObjectType({
  name: 'AuthorType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    born: { type: GraphQLString },
    died: { type: GraphQLString },
    isBC: { type: GraphQLBoolean },
    feastDate: { type: GraphQLInt },
    feastMonth: { type: GraphQLInt },
    life: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    modifiedAt: { type: GraphQLDateTime },
    isDeleted: { type: GraphQLBoolean },
  }),
});

module.exports = {
  AuthorType,
};
