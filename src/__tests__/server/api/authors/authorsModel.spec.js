const knex = require('../../../../server/data/dbConfig');
const {
  getAuthors,
  getAuthor,
} = require('../../../../server/api/authors/authorsModel');

describe('Authors Data Model Functions', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe('GET functions', () => {
    test('getAuthors', async () => {
      const authors = await getAuthors();
      expect(authors.length).toEqual(1);
    });

    test('getAuthor', async () => {
      const id = 1;
      const author = await getAuthor(id);
      expect(author.id).toEqual(id);
    });

    test('getAuthor: Missing ID failure', async () => {
      await expect(() => getAuthor()).rejects.toThrow('Missing Author ID');
    });

    test('getAuthor: ID Does Not Exist failure', async () => {
      const id = 101;
      await expect(() => getAuthor(id)).rejects.toThrow(
        'Author Does Not Exist'
      );
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });
});
