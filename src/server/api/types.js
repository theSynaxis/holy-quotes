const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
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
    feastDay: { type: GraphQLString },
    life: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    modifiedAt: { type: GraphQLDateTime },
    isDeleted: { type: GraphQLBoolean },
  }),
});

module.exports = {
  AuthorType,
};
