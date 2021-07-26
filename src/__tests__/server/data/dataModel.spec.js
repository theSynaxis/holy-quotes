const knex = require('../../../server/data/dbConfig');
const {
  findOne,
  findAll,
  addOne,
  updateOne,
  deleteOne,
  restoreOne,
} = require('../../../server/data/dataModel');

describe('Data Access Model Layer', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe('GET data', () => {
    test('findOne: success', async () => {
      const id = 1;
      const author = await findOne('authors', id);
      expect(author.id).toEqual(1);
    });

    test('findOne: Missing database failure', async () => {
      const id = 1;
      await expect(() => findOne(id)).rejects.toThrow('Error finding item:');
    });

    test('findOne: ID does not exist failure', async () => {
      const id = 10;
      await expect(() => findOne('authors', id)).rejects.toThrow(
        'Item does not exist'
      );
    });

    test('findAll', async () => {
      const authors = await findAll('authors');
      expect(authors.length).toEqual(1);
    });

    test('findAll: Missing database failure', async () => {
      await expect(() => findAll()).rejects.toThrow('Error finding item:');
    });
  });

  describe('POST data', () => {
    test('addOne: success', async () => {
      const newAuthor = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        is_bc: true,
        feast_date: 4,
        feast_month: 9,
      };
      const author = await addOne('authors', newAuthor);
      expect(author.id).toEqual(2);
    });

    test('addOne: Missing database failure', async () => {
      const newAuthor = {};
      await expect(() => addOne(newAuthor)).rejects.toThrow(
        'Error adding item:'
      );
    });
  });

  describe('PUT data', () => {
    test('updateOne: success', async () => {
      const updatedAuthor = {
        id: 1,
        name: 'Dionysios the Areopagite',
      };
      const author = await updateOne('authors', updatedAuthor);
      expect(author.name).toEqual(updatedAuthor.name);
      expect(author.created_at).not.toEqual(author.modified_at);
    });

    test('updateOne: Missing database failure', async () => {
      const updatedAuthor = {
        id: 1,
        name: 'Dionysios the Areopagite',
      };
      await expect(() => updateOne(updatedAuthor)).rejects.toThrow(
        'Missing Data'
      );
    });

    test('updateOne: missing ID failure', async () => {
      const updatedAuthor = {
        name: 'Dionysios the Areopagite',
      };
      await expect(() => updateOne('authors', updatedAuthor)).rejects.toThrow(
        `Missing Item ID`
      );
    });

    test('updateOne: ID does not exist failure', async () => {
      const updatedAuthor = {
        id: 101,
        name: 'Dionysios the Areopagite',
      };
      await expect(() => updateOne('authors', updatedAuthor)).rejects.toThrow(
        'Item does not exist'
      );
    });
  });

  describe('DELETE', () => {
    describe('Soft Delete', () => {
      test('deleteOne: success', async () => {
        const id = 2;
        const author = await deleteOne('authors', id);
        expect(author.is_deleted).toEqual(true);
        expect(author.modified_at).not.toEqual(author.created_at);
      });

      test('deletedOne: Missing all arguments failure', async () => {
        await expect(() => deleteOne()).rejects.toThrow('Missing Data');
      });

      test('deletedOne: Missing database failure', async () => {
        const id = 2;
        await expect(() => deleteOne(id)).rejects.toThrow('Missing Data');
      });

      test('deletedOne: Missing ID failure', async () => {
        await expect(() => deleteOne('authors')).rejects.toThrow(
          'Missing Data'
        );
      });

      test('deletedOne: ID does not exist failure', async () => {
        const id = 101;
        await expect(() => deleteOne('authors', id)).rejects.toThrow(
          'Error finding item:'
        );
      });
    });

    describe('Restore Deleted', () => {
      test('restoreOne: success', async () => {
        const id = 1;
        const author = await restoreOne('authors', id);
        expect(author.is_deleted).toEqual(false);
        expect(author.modified_at).not.toEqual(author.created_at);
      });

      test('restoreOne: Missing all arguments failure', async () => {
        await expect(() => restoreOne()).rejects.toThrow('Missing Data');
      });

      test('restoreOne: Missing database failure', async () => {
        const id = 2;
        await expect(() => restoreOne(id)).rejects.toThrow('Missing Data');
      });

      test('restoreOne: Missing ID failure', async () => {
        await expect(() => restoreOne('authors')).rejects.toThrow(
          'Missing Data'
        );
      });
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });
});
