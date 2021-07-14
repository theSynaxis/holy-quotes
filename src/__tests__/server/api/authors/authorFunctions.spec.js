const {
  verifyAuthorInfo,
  GqlToDBAuthorData,
  DBToGqlAuthorData,
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

  describe('Transform Author Data', () => {
    test('GqlToDBAuthorData: GraphQL Schema to Database Schema', async () => {
      const author = {
        name: 'Name',
        title: 'Title',
        born: 'Born',
        died: 'Died',
        isBC: true,
        feastDay: 'Feast Day',
        isDeleted: false,
        createdAt: new Date(Date.now()),
        modifiedAt: new Date(Date.now()),
      };
      const result = await GqlToDBAuthorData(author);
      expect(result).not.toEqual(author);
      expect(result.name).toEqual(author.name);
      expect(result.title).toEqual(author.title);
      expect(result.born).toEqual(author.born);
      expect(result.died).toEqual(author.died);
      expect(result.is_bc).toEqual(author.isBC);
      expect(result.feast_day).toEqual(author.feastDay);
      expect(result.is_deleted).toEqual(author.isDeleted);
      expect(result.created_at).toEqual(author.createdAt);
      expect(result.modified_at).toEqual(author.modifiedAt);
    });

    test('GqlToDBAuthorData: GraphQL Schema to Database Schema with ID', async () => {
      const author = {
        id: 1,
        name: 'Name',
        title: 'Title',
        born: 'Born',
        died: 'Died',
        isBC: true,
        feastDay: 'Feast Day',
        isDeleted: false,
        createdAt: new Date(Date.now()),
        modifiedAt: new Date(Date.now()),
      };
      const result = await GqlToDBAuthorData(author);
      expect(result).not.toEqual(author);
      expect(result.id).toEqual(author.id);
      expect(result.name).toEqual(author.name);
      expect(result.title).toEqual(author.title);
      expect(result.born).toEqual(author.born);
      expect(result.died).toEqual(author.died);
      expect(result.is_bc).toEqual(author.isBC);
      expect(result.feast_day).toEqual(author.feastDay);
      expect(result.is_deleted).toEqual(author.isDeleted);
      expect(result.created_at).toEqual(author.createdAt);
      expect(result.modified_at).toEqual(author.modifiedAt);
    });

    test('DBToGqlAuthorData: Database Schema to GraphQL Schema', async () => {
      const author = {
        name: 'Name',
        title: 'Title',
        born: 'Born',
        died: 'Died',
        is_bc: true,
        feast_day: 'Feast Day',
        is_deleted: false,
        created_at: new Date(Date.now()),
        modified_at: new Date(Date.now()),
      };
      const result = await DBToGqlAuthorData(author);
      expect(result).not.toEqual(author);
      expect(result.name).toEqual(author.name);
      expect(result.title).toEqual(author.title);
      expect(result.born).toEqual(author.born);
      expect(result.died).toEqual(author.died);
      expect(result.is_bc).toEqual(author.isBC);
      expect(result.feast_day).toEqual(author.feastDay);
      expect(result.is_deleted).toEqual(author.isDeleted);
      expect(result.created_at).toEqual(author.createdAt);
      expect(result.modified_at).toEqual(author.modifiedAt);
    });
  });
});
