const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./api/schema');

const server = express();

server.use(
  '/',
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
  }))
);

module.exports = server;
