const { GraphQLSchema } = require('graphql');
const query = require('./rootQuery');

module.exports = new GraphQLSchema({
  query,
});
