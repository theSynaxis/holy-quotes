const {
  verifyAuthorInfo,
} = require('../../../../server/api/authors/authorFunctions');

describe('Author Business Logic Helper Functions', () => {
  describe('verifyAuthorInfo', () => {
    test('verifyAuthorInfo: Success', async () => {
      const author = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        is_bc: true,
        feast_day: 'September 4',
      };
      const result = await verifyAuthorInfo(author);
      expect(result).toEqual(author);
    });

    describe('verifyAuthorInfo: Failures', () => {
      test('verifyAuthorInfo: Missing Author Name', async () => {
        const author = {
          title: 'Prophet',
          born: '1689',
          died: '1569',
          is_bc: true,
          feast_day: 'September 4',
        };
        await expect(() => verifyAuthorInfo(author)).rejects.toThrow(
          'Missing Author Name'
        );
      });

      test('verifyAuthorInfo: Missing Author Title', async () => {
        const author = {
          name: 'Moses the Godseer',
          born: '1689',
          died: '1569',
          is_bc: true,
          feast_day: 'September 4',
        };
        await expect(() => verifyAuthorInfo(author)).rejects.toThrow(
          'Missing Author Title'
        );
      });

      test('verifyAuthorInfo: Missing Author Born Date', async () => {
        const author = {
          name: 'Moses the Godseer',
          title: 'Prophet',
          died: '1569',
          is_bc: true,
          feast_day: 'September 4',
        };
        await expect(() => verifyAuthorInfo(author)).rejects.toThrow(
          'Missing Author Born Date'
        );
      });

      test('verifyAuthorInfo: Missing Author Died Date', async () => {
        const author = {
          name: 'Moses the Godseer',
          title: 'Prophet',
          born: '1689',
          is_bc: true,
          feast_day: 'September 4',
        };
        await expect(() => verifyAuthorInfo(author)).rejects.toThrow(
          'Missing Author Died Date'
        );
      });

      test('verifyAuthorInfo: Missing Author BC Boolean', async () => {
        const author = {
          name: 'Moses the Godseer',
          title: 'Prophet',
          born: '1689',
          died: '1569',
          feast_day: 'September 4',
        };
        await expect(() => verifyAuthorInfo(author)).rejects.toThrow(
          'Missing Author BC Boolean'
        );
      });

      test('verifyAuthorInfo: Missing Author Feast Day', async () => {
        const author = {
          name: 'Moses the Godseer',
          title: 'Prophet',
          born: '1689',
          died: '1569',
          is_bc: true,
        };
        await expect(() => verifyAuthorInfo(author)).rejects.toThrow(
          'Missing Author Feast Day'
        );
      });
    });
  });
});
