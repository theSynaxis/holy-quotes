const supertest = require('supertest');
const moment = require('moment');
const server = require('../../../../server');
const knex = require('../../../../server/data/dbConfig');

const request = supertest(server);
const today = moment(new Date()).format('DD MMMM, YYYY');

describe('End to End Server API Tests: Authors', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });

  describe('Get Author Requests', () => {
    test('Get All Authors', async () => {
      const query = `{
          getAuthors {
            id
          }
        }`;
      const result = await request.get('/').send({ query });
      const { data } = JSON.parse(result.text);
      expect(data.getAuthors).toEqual([]);
    });

    describe('Get Single Author', () => {
      test('Get Single Author: Failure', async () => {
        const id = 1;
        const query = `{
            getAuthor(id: ${id}) {
              id
              name
              title
              born
              died
              isBC
              feastDate
              feastMonth
              life
              createdAt
              modifiedAt
              isDeleted
            }
          }`;
        const result = await request.get('/').send({ query });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual('Author Does Not Exist');
      });
    });
  });

  describe('Add New Author', () => {
    describe('Add New Author: Success', () => {
      test('Add New Author Success', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `
        mutation {
          addAuthor(${variables}) {
            id
            name
            title
            born
            died
            isBC
            feastDate
            feastMonth
            life
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
        const result = await request.post('/').send({ query: `${query}` });
        const { data } = JSON.parse(result.text);
        const { createdAt, modifiedAt } = data.addAuthor;
        expect(data.addAuthor).toEqual({
          id: '1',
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
          life: null,
          createdAt: expect.any(String),
          modifiedAt: expect.any(String),
          isDeleted: false,
        });
        expect(moment(createdAt).format('DD MMMM, YYYY')).toEqual(today);
        expect(moment(modifiedAt).format('DD MMMM, YYYY')).toEqual(today);
      });
    });

    describe('Add New Author: Failure', () => {
      test('Missing Name', async () => {
        const author = {
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { addAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "addAuthor" argument "name" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing Title', async () => {
        const author = {
          name: 'Paisios the Athonite',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `name: "${author.name}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { addAuthor(${variables}) { id } }`;
        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "addAuthor" argument "title" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing Born Date', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `name: "${author.name}", title: "${author.title}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { addAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "addAuthor" argument "born" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing Died Date', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { addAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "addAuthor" argument "died" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing BC Boolean', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { addAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual('Missing Author BC Boolean');
      });

      test('Missing Feast Date', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastMonth: 7,
        };

        const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { addAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "addAuthor" argument "feastDate" of type "Int!" is required, but it was not provided.'
        );
      });

      test('Missing Feast Month', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
        };

        const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}`;

        const query = `mutation { addAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "addAuthor" argument "feastMonth" of type "Int!" is required, but it was not provided.'
        );
      });

      test('Incorrect Author Object', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
          bestFriend: 'Moses the Fool',
        };

        const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}, bestFriend: "${author.bestFriend}"`;

        const query = `mutation { addAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Unknown argument "bestFriend" on field "addAuthor" of type "Mutations".'
        );
      });
    });
  });

  describe('Update All Author Data Points', () => {
    describe('Update Author: Success', () => {
      test('Update Author Success', async () => {
        const author = {
          id: 1,
          name: 'Paisios the New of Athos',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
          life: '',
        };

        const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}, life: "${author.life}"`;

        const query = `
        mutation {
          updateAuthor(${variables}) {
            id
            name
            title
            born
            died
            isBC
            feastDate
            feastMonth
            life
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
        const result = await request.post('/').send({ query: `${query}` });
        const { data } = JSON.parse(result.text);
        const { createdAt, modifiedAt } = data.updateAuthor;
        expect(data.updateAuthor).toEqual({
          id: '1',
          name: 'Paisios the New of Athos',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
          life: '',
          createdAt: expect.any(String),
          modifiedAt: expect.any(String),
          isDeleted: false,
        });
        expect(createdAt).not.toEqual(modifiedAt);
      });
    });

    describe('Update Author: Failure', () => {
      test('Missing ID', async () => {
        const author = {
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "id" of type "ID!" is required, but it was not provided.'
        );
      });

      test('Missing Name', async () => {
        const author = {
          id: 1,
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `id: ${author.id}, title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "name" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing Title', async () => {
        const author = {
          id: 1,
          name: 'Paisios the Athonite',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `id: ${author.id}, name: "${author.name}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "title" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing Born Date', async () => {
        const author = {
          id: 1,
          name: 'Paisios the Athonite',
          title: 'Saint',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "born" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing Died Date', async () => {
        const author = {
          id: 1,
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", born: "${author.born}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "died" of type "String!" is required, but it was not provided.'
        );
      });

      test('Missing BC Boolean', async () => {
        const author = {
          id: 1,
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          feastDate: 12,
          feastMonth: 7,
        };

        const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "isBC" of type "Boolean!" is required, but it was not provided.'
        );
      });

      test('Missing Feast Date', async () => {
        const author = {
          id: 1,
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastMonth: 7,
        };

        const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastMonth: ${author.feastMonth}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "feastDate" of type "Int!" is required, but it was not provided.'
        );
      });

      test('Missing Feast Month', async () => {
        const author = {
          id: 1,
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
        };

        const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Field "updateAuthor" argument "feastMonth" of type "Int!" is required, but it was not provided.'
        );
      });

      test('Incorrect Author Object', async () => {
        const author = {
          id: 1,
          name: 'Paisios the Athonite',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
          bestFriend: 'Moses the Fool',
        };

        const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}, bestFriend: "${author.bestFriend}"`;

        const query = `mutation { updateAuthor(${variables}) { id } }`;

        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual(
          'Unknown argument "bestFriend" on field "updateAuthor" of type "Mutations".'
        );
      });
    });
  });

  describe('Delete and Restore Author', () => {
    test('Delete Author Success', async () => {
      const id = 1;
      const query = `
      mutation {
          deleteAuthor(id: ${id}) {
            id
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
      const result = await request.post('/').send({ query: `${query}` });
      const { data } = JSON.parse(result.text);
      expect(data.deleteAuthor).toEqual({
        id: '1',
        createdAt: expect.any(String),
        modifiedAt: expect.any(String),
        isDeleted: true,
      });
      expect(data.deleteAuthor.createdAt).not.toEqual(
        data.deleteAuthor.modifiedAt
      );
    });

    test('Delete Author Failure: Already Deleted', async () => {
      const id = 1;
      const query = `
      mutation {
          deleteAuthor(id: ${id}) {
            id
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
      const result = await request.post('/').send({ query: `${query}` });
      const { errors } = JSON.parse(result.text);
      expect(errors[0].message).toEqual('Author Already Deleted');
    });

    test('Restore Author Success', async () => {
      const id = 1;
      const query = `
      mutation {
          restoreAuthor(id: ${id}) {
            id
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
      const result = await request.post('/').send({ query: `${query}` });
      const { data } = JSON.parse(result.text);
      expect(data.restoreAuthor).toEqual({
        id: '1',
        createdAt: expect.any(String),
        modifiedAt: expect.any(String),
        isDeleted: false,
      });
      expect(data.restoreAuthor.createdAt).not.toEqual(
        data.restoreAuthor.modifiedAt
      );
    });

    test('Restore Author Failure: Not Deleted', async () => {
      const id = 1;
      const query = `
      mutation {
          restoreAuthor(id: ${id}) {
            id
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
      const result = await request.post('/').send({ query: `${query}` });
      const { errors } = JSON.parse(result.text);
      expect(errors[0].message).toEqual('Author Not Deleted');
    });
  });

  describe('Get Author Requests', () => {
    test('Get All Authors', async () => {
      const query = `{
          getAuthors {
            id
          }
        }`;
      const result = await request.post('/').send({ query: `${query}` });
      const { data } = JSON.parse(result.text);
      expect(data.getAuthors).toEqual([
        {
          id: '1',
        },
      ]);
    });

    describe('Get Single Author', () => {
      test('Get Single Author: Success', async () => {
        const id = 1;
        const query = `{
          getAuthor(id: ${id}) {
            id
            name
            title
            born
            died
            isBC
            feastDate
            feastMonth
            life
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
        const result = await request.post('/').send({ query: `${query}` });
        const { data } = JSON.parse(result.text);
        expect(data.getAuthor).toEqual({
          id: '1',
          name: 'Paisios the New of Athos',
          title: 'Saint',
          born: '25 July 1924',
          died: '12 July 1994',
          isBC: false,
          feastDate: 12,
          feastMonth: 7,
          life: '',
          createdAt: expect.any(String),
          modifiedAt: expect.any(String),
          isDeleted: false,
        });
      });

      test('Get Single Author: Failure', async () => {
        const id = 10009;
        const query = `{
          getAuthor(id: ${id}) {
            id
            name
            title
            born
            died
            isBC
            feastDate
            feastMonth
            life
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
        const result = await request.post('/').send({ query: `${query}` });
        const { errors } = JSON.parse(result.text);
        expect(errors[0].message).toEqual('Author Does Not Exist');
      });
    });
  });

  describe('Duplicate Author Life Error', () => {
    beforeAll(async () => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
    });

    test('Add New Author Success', async () => {
      const author = {
        name: 'Paisios the Athonite',
        title: 'Saint',
        born: '25 July 1924',
        died: '12 July 1994',
        isBC: false,
        feastDate: 12,
        feastMonth: 7,
      };

      const variables = `name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}`;

      const query = `
        mutation {
          addAuthor(${variables}) {
            id
            name
            title
            born
            died
            isBC
            feastDate
            feastMonth
            life
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
      const result = await request.post('/').send({ query: `${query}` });
      const { data } = JSON.parse(result.text);
      const { createdAt, modifiedAt } = data.addAuthor;
      expect(data.addAuthor).toEqual({
        id: '2',
        name: 'Paisios the Athonite',
        title: 'Saint',
        born: '25 July 1924',
        died: '12 July 1994',
        isBC: false,
        feastDate: 12,
        feastMonth: 7,
        life: null,
        createdAt: expect.any(String),
        modifiedAt: expect.any(String),
        isDeleted: false,
      });
      expect(moment(createdAt).format('DD MMMM, YYYY')).toEqual(today);
      expect(moment(modifiedAt).format('DD MMMM, YYYY')).toEqual(today);
    });

    test('Duplicate Life Data', async () => {
      const author = {
        id: 2,
        name: 'Paisios the New of Athos',
        title: 'Saint',
        born: '25 July 1924',
        died: '12 July 1994',
        isBC: false,
        feastDate: 12,
        feastMonth: 7,
        life: `The New Hieromartyr Cosmas, Equal of the Apostles, in the world Constas, was a native of Aitolia. He studied at first under the guidance of the archdeacon Ananias Dervisanos, and afterwards continued his education on Mount Athos, at the Vatopedi school renowned for teachers such as Nicholas Tzartzoulios (from Metsovo) and Eugenius Voulgaris (afterwards in the years 1775-1779 the archbishop of Ekaterinoslav and the Chersonessus). Remaining on Athos at the Philotheou monastery to devote himself to spiritual labors, he was tonsured a monk with the name Cosmas, and later was ordained hieromonk. The desire to benefit his fellow Christians, to guide them upon the way of salvation and strengthen their faith, impelled Saint Cosmas to seek the blessing of his spiritual fathers and go to Constantinople. There he mastered the art of rhetoric and, having received a written permit of Patriarch Seraphim II (and later from his successor Sophronius) to preach the Holy Gospel. So the saint began to proclaim the Gospel at first in the churches of Constantinople and the surrounding villages, then in the Danube regions, in Thessalonica, in Verroia, in Macedonia, Chimaera, Akarnania, Aitolia, on the islands of Saint Maura, Kephalonia and other places. His preaching, filled with the grace of the Holy Spirit, was simple, calm, and gentle. It brought Christians great spiritual benefit. The Lord Himself assisted him and confirmed his words with signs and miracles, just as He had confirmed the preaching of the Apostles. Preaching in the remote areas of Albania, where Christian piety had almost disappeared among the rough and coarse people entrenched in sin, Saint Cosmas led them to sincere repentance and improvement with the Word of God. Under his guidance, church schools were opened in the towns and villages. The rich offered their money for the betterment of the churches, for the purchase of Holy Books (which the saint distributed to the literate), veils (which he gave women, admonishing them to come to church with covered heads),for prayer ropes and crosses (which he distributed to the common folk), and for baptismal fonts so that children could be baptized in the proper manner. Since the churches could not accommodate everyone wanting to hear the wise preacher, Saint Cosmas with forty or fifty priests served the Vigil in the fields, and in city squares, where thousands of people prayed for the living and for the dead, and were edified by his preaching. Everywhere that Saint Cosmas halted and preached, the grateful listeners set up a large wooden cross, which remained thereafter in memory of this. The apostolic service of Saint Cosmas was brought to a close by his martyric death in the year 1779. At 65 years of age, he was seized by the Turks and strangled. His body was thrown into a river, and after three days, was found by the priest Mark and buried near the village of Kolikontasi at the monastery of the Entrance into the Temple of the Most Holy Theotokos. Afterwards, part of his relics were transferred to various places as a blessing. He was glorified by the Ecumenical Patriarchate in 1961.`,
      };

      const variables = `id: ${author.id}, name: "${author.name}", title: "${author.title}", born: "${author.born}", died: "${author.died}", isBC: ${author.isBC}, feastDate: ${author.feastDate}, feastMonth: ${author.feastMonth}, life: "${author.life}"`;

      const query = `
        mutation {
          updateAuthor(${variables}) {
            id
            name
            title
            born
            died
            isBC
            feastDate
            feastMonth
            life
            createdAt
            modifiedAt
            isDeleted
          }
        }`;
      const result = await request.post('/').send({ query: `${query}` });
      const { errors } = JSON.parse(result.text);
      expect(errors[0].message).toEqual('Duplicate Author Info');
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });
});
