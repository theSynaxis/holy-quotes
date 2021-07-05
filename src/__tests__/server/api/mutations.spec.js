const mutations = require('../../../server/api/mutations');

describe('GraphQL Mutations', () => {
  test('Mutations', async () => {
    const fields = await mutations.getFields();

    expect(mutations.name).toEqual('Mutations');
    expect(fields.addAuthor.name).toEqual('addAuthor');
  });
});
