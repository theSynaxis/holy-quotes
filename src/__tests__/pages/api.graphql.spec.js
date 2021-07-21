import supertest from 'supertest';
import server from '../../pages/api/graphql';
import knex from '../../server/data/dbConfig';

const request = supertest(server);

describe('API Server', () => {
  test('Can Connect to API', async () => {
    const result = await request.get('/');
    expect(result.status).toEqual(400);
    expect(result.text).toEqual(
      '{"errors":[{"message":"Must provide query string."}]}'
    );
  });

  test('Can Query API', async () => {
    await request
      .get('/')
      .send({ query: '{ getAuthors { id } }' })
      .then((res) => {
        expect(res.text).toContain('errors');
        expect(res.status).toEqual(200);
      });
    await knex.destroy();
  });
});
