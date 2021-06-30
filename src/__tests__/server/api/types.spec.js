const { GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { AuthorType } = require('../../../server/api/types');

describe('GraphQL Types', () => {
  describe('Author Type', () => {
    test('Author Type', async () => {
      const fields = await AuthorType.getFields();
      expect(AuthorType.name).toEqual('Author Type');
      expect(fields.id.type).toEqual(GraphQLID);
      expect(fields.name.type).toEqual(GraphQLString);
      expect(fields.title.type).toEqual(GraphQLString);
      expect(fields.born.type).toEqual(GraphQLString);
      expect(fields.died.type).toEqual(GraphQLString);
      expect(fields.isBC.type).toEqual(GraphQLBoolean);
      expect(fields.feastDay.type).toEqual(GraphQLString);
      expect(fields.life.type).toEqual(GraphQLString);
      expect(fields.createdAt.type).toEqual(GraphQLDateTime);
      expect(fields.modifiedAt.type).toEqual(GraphQLDateTime);
      expect(fields.isDeleted.type).toEqual(GraphQLBoolean);
    });
  });
});
