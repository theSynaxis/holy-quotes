module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'SynaxisQuotes',
      hostname: 'localhost',
    },
    migrations: {
      directory: `${__dirname}/data/migrations`,
    },
    seeds: {
      directory: `${__dirname}/data/seeds`,
    },
  },

  test: {
    client: 'pg',
    connection: {
      database: 'TestSynaxisQuotes',
      hostname: 'localhost',
    },
    migrations: {
      directory: `${__dirname}/data/migrations`,
    },
    seeds: {
      directory: `${__dirname}/data/seeds`,
    },
  },
};
