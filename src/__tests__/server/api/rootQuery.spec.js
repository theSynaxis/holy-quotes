const rootQuery = require('../../../server/api/rootQuery');

describe('GraphQL Root Query', () => {
  test('rootQuery', async () => {
    const fields = await rootQuery.getFields();

    expect(rootQuery.name).toEqual('RootQuery');
    expect(fields.getAuthor.name).toEqual('getAuthor');
    expect(fields.getAuthors.name).toEqual('getAuthors');
  });
});
