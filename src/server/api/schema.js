const { GraphQLSchema } = require('graphql');
const rootQuery = require('./rootQuery');
const mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation,
});
