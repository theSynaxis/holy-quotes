const knex = require('../../../../server/data/dbConfig');
const { addAuthor } = require('../../../../server/api/authors/mutations');

describe('Author Mutations', () => {
  describe('addAuthor Mutation', () => {
    beforeAll(async () => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
    });

    test('addAuthor Mutation', async () => {
      const author = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        isBC: true,
        feastDay: 'September 4',
      };

      const result = await addAuthor.resolve(author);

      expect(addAuthor.name).toEqual('addAuthor Mutation');
      expect(addAuthor.args.name.type.toString()).toEqual('String!');
      expect(addAuthor.args.title.type.toString()).toEqual('String!');
      expect(addAuthor.args.born.type.toString()).toEqual('String!');
      expect(addAuthor.args.died.type.toString()).toEqual('String!');
      expect(addAuthor.args.isBC.type.toString()).toEqual('Boolean');
      expect(addAuthor.args.feastDay.type.toString()).toEqual('String!');
      expect(addAuthor.type.toString()).toEqual('AuthorType');
      expect(result).toEqual({
        id: 1,
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        isBC: true,
        feastDay: 'September 4',
        life: null,
        isDeleted: false,
        createdAt: expect.any(Date),
        modifiedAt: expect.any(Date),
      });
    });

    afterAll(async () => {
      await knex.migrate.rollback();
      await knex.destroy();
    });
  });
});
