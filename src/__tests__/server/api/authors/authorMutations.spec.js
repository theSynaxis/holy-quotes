const knex = require('../../../../server/data/dbConfig');
const {
  addAuthor,
  updateAuthor,
  deleteAuthor,
  restoreAuthor,
} = require('../../../../server/api/authors/mutations');

describe('Author Mutations', () => {
  describe('addAuthor Mutation', () => {
    beforeAll(async () => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
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

      const result = await addAuthor.resolve(null, author);

      expect(addAuthor.name).toEqual('addAuthor Mutation');
      expect(addAuthor.args.name.type.toString()).toEqual('String!');
      expect(addAuthor.args.title.type.toString()).toEqual('String!');
      expect(addAuthor.args.born.type.toString()).toEqual('String!');
      expect(addAuthor.args.died.type.toString()).toEqual('String!');
      expect(addAuthor.args.isBC.type.toString()).toEqual('Boolean');
      expect(addAuthor.args.feastDay.type.toString()).toEqual('String!');
      expect(addAuthor.type.toString()).toEqual('AuthorType');
      expect(result).toEqual({
        id: 2,
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

    test('updateAuthor Mutation', async () => {
      const author = {
        id: 1,
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        isBC: true,
        feastDay: 'September 4',
      };

      const result = await updateAuthor.resolve(null, author);

      expect(updateAuthor.name).toEqual('updateAuthor Mutation');
      expect(updateAuthor.args.id.type.toString()).toEqual('ID!');
      expect(updateAuthor.args.name.type.toString()).toEqual('String!');
      expect(updateAuthor.args.title.type.toString()).toEqual('String!');
      expect(updateAuthor.args.born.type.toString()).toEqual('String!');
      expect(updateAuthor.args.died.type.toString()).toEqual('String!');
      expect(updateAuthor.args.isBC.type.toString()).toEqual('Boolean!');
      expect(updateAuthor.args.feastDay.type.toString()).toEqual('String!');
      expect(updateAuthor.args.life.type.toString()).toEqual('String!');
      expect(updateAuthor.type.toString()).toEqual('AuthorType');
      expect(result).toEqual({
        id: 1,
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        isBC: true,
        feastDay: 'September 4',
        life: `The New Hieromartyr Cosmas, Equal of the Apostles, in the world Constas, was a native of Aitolia. He studied at first under the guidance of the archdeacon Ananias Dervisanos, and afterwards continued his education on Mount Athos, at the Vatopedi school renowned for teachers such as Nicholas Tzartzoulios (from Metsovo) and Eugenius Voulgaris (afterwards in the years 1775-1779 the archbishop of Ekaterinoslav and the Chersonessus). Remaining on Athos at the Philotheou monastery to devote himself to spiritual labors, he was tonsured a monk with the name Cosmas, and later was ordained hieromonk. The desire to benefit his fellow Christians, to guide them upon the way of salvation and strengthen their faith, impelled Saint Cosmas to seek the blessing of his spiritual fathers and go to Constantinople. There he mastered the art of rhetoric and, having received a written permit of Patriarch Seraphim II (and later from his successor Sophronius) to preach the Holy Gospel. So the saint began to proclaim the Gospel at first in the churches of Constantinople and the surrounding villages, then in the Danube regions, in Thessalonica, in Verroia, in Macedonia, Chimaera, Akarnania, Aitolia, on the islands of Saint Maura, Kephalonia and other places. His preaching, filled with the grace of the Holy Spirit, was simple, calm, and gentle. It brought Christians great spiritual benefit. The Lord Himself assisted him and confirmed his words with signs and miracles, just as He had confirmed the preaching of the Apostles. Preaching in the remote areas of Albania, where Christian piety had almost disappeared among the rough and coarse people entrenched in sin, Saint Cosmas led them to sincere repentance and improvement with the Word of God. Under his guidance, church schools were opened in the towns and villages. The rich offered their money for the betterment of the churches, for the purchase of Holy Books (which the saint distributed to the literate), veils (which he gave women, admonishing them to come to church with covered heads),for prayer ropes and crosses (which he distributed to the common folk), and for baptismal fonts so that children could be baptized in the proper manner. Since the churches could not accommodate everyone wanting to hear the wise preacher, Saint Cosmas with forty or fifty priests served the Vigil in the fields, and in city squares, where thousands of people prayed for the living and for the dead, and were edified by his preaching. Everywhere that Saint Cosmas halted and preached, the grateful listeners set up a large wooden cross, which remained thereafter in memory of this. The apostolic service of Saint Cosmas was brought to a close by his martyric death in the year 1779. At 65 years of age, he was seized by the Turks and strangled. His body was thrown into a river, and after three days, was found by the priest Mark and buried near the village of Kolikontasi at the monastery of the Entrance into the Temple of the Most Holy Theotokos. Afterwards, part of his relics were transferred to various places as a blessing. He was glorified by the Ecumenical Patriarchate in 1961.`,
        createdAt: expect.any(Date),
        modifiedAt: expect.any(Date),
        isDeleted: false,
      });
    });

    test('deleteAuthor Mutation', async () => {
      const author = {
        id: 1,
      };
      const result = await deleteAuthor.resolve(null, author);
      expect(deleteAuthor.name).toEqual('deleteAuthor Mutation');
      expect(deleteAuthor.args.id.type.toString()).toEqual('ID!');
      expect(deleteAuthor.type.toString()).toEqual('AuthorType');
      expect(result.isDeleted).toEqual(true);
    });

    test('restoreAuthor Mutation', async () => {
      const author = {
        id: 1,
      };
      const result = await restoreAuthor.resolve(null, author);
      expect(restoreAuthor.name).toEqual('restoreAuthor Mutation');
      expect(restoreAuthor.args.id.type.toString()).toEqual('ID!');
      expect(restoreAuthor.type.toString()).toEqual('AuthorType');
      expect(result.isDeleted).toEqual(false);
    });

    afterAll(async () => {
      await knex.migrate.rollback();
      await knex.destroy();
    });
  });
});
