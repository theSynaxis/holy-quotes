const schema = require('../../../server/api/schema');

describe('GraphQL Schema', () => {
  test('Schema', async () => {
    expect(schema.getQueryType().toString()).toEqual('RootQuery');
  });
});
