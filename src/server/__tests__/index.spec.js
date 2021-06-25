const server = require('../index');

describe('Server Root', () => {
  test('Should pass', async () => {
    const result = await server();
    expect(result).toEqual(true);
  });
});
