const knex = require('../../../server/data/dbConfig');

describe('Migration Tests', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });

  describe('Authors Migration', () => {
    test('Should Run Author Migration', async () => {
      const result = await knex('authors');
      expect(result.length).toEqual(0);
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });
});
