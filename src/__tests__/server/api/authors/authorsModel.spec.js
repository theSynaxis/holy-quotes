const knex = require('../../../../server/data/dbConfig');
const {
  getAuthors,
  getAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  restoreAuthor,
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

    test('getAuthor: Success', async () => {
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

  describe('addAuthor', () => {
    test('addAuthor: Success', async () => {
      const newAuthor = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        is_bc: true,
        feast_day: 'September 4',
      };
      const author = await addAuthor(newAuthor);
      expect(author).toEqual({
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

    test('addAuthor: Missing Author Name failure', async () => {
      const author = {
        title: 'Prophet',
        born: '1689',
        died: '1569',
        is_bc: true,
        feast_day: 'September 4',
      };
      await expect(() => addAuthor(author)).rejects.toThrow(
        'Missing Author Name'
      );
    });

    test('addAuthor: Missing Author Title failure', async () => {
      const author = {
        name: 'Moses the Godseer',
        born: '1689',
        died: '1569',
        is_bc: true,
        feast_day: 'September 4',
      };
      await expect(() => addAuthor(author)).rejects.toThrow(
        'Missing Author Title'
      );
    });

    test('addAuthor: Missing Author Born Date failure', async () => {
      const author = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        died: '1569',
        is_bc: true,
        feast_day: 'September 4',
      };
      await expect(() => addAuthor(author)).rejects.toThrow(
        'Missing Author Born Date'
      );
    });

    test('addAuthor: Missing Author Died Date failure', async () => {
      const author = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        is_bc: true,
        feast_day: 'September 4',
      };
      await expect(() => addAuthor(author)).rejects.toThrow(
        'Missing Author Died Date'
      );
    });

    test('addAuthor: Missing Author BC Boolean failure', async () => {
      const author = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        feast_day: 'September 4',
      };
      await expect(() => addAuthor(author)).rejects.toThrow(
        'Missing Author BC Boolean'
      );
    });

    test('addAuthor: Missing Author Feast Day failure', async () => {
      const author = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        is_bc: true,
      };
      await expect(() => addAuthor(author)).rejects.toThrow(
        'Missing Author Feast Day'
      );
    });

    test('addAuthor: Duplicate Author Info failure: life', async () => {
      const author = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        is_bc: true,
        feast_day: 'September 4',
        life: `The New Hieromartyr Cosmas, Equal of the Apostles, in the world Constas, was a native of Aitolia. He studied at first under the guidance of the archdeacon Ananias Dervisanos, and afterwards continued his education on Mount Athos, at the Vatopedi school renowned for teachers such as Nicholas Tzartzoulios (from Metsovo) and Eugenius Voulgaris (afterwards in the years 1775-1779 the archbishop of Ekaterinoslav and the Chersonessus). Remaining on Athos at the Philotheou monastery to devote himself to spiritual labors, he was tonsured a monk with the name Cosmas, and later was ordained hieromonk. The desire to benefit his fellow Christians, to guide them upon the way of salvation and strengthen their faith, impelled Saint Cosmas to seek the blessing of his spiritual fathers and go to Constantinople. There he mastered the art of rhetoric and, having received a written permit of Patriarch Seraphim II (and later from his successor Sophronius) to preach the Holy Gospel. So the saint began to proclaim the Gospel at first in the churches of Constantinople and the surrounding villages, then in the Danube regions, in Thessalonica, in Verroia, in Macedonia, Chimaera, Akarnania, Aitolia, on the islands of Saint Maura, Kephalonia and other places. His preaching, filled with the grace of the Holy Spirit, was simple, calm, and gentle. It brought Christians great spiritual benefit. The Lord Himself assisted him and confirmed his words with signs and miracles, just as He had confirmed the preaching of the Apostles. Preaching in the remote areas of Albania, where Christian piety had almost disappeared among the rough and coarse people entrenched in sin, Saint Cosmas led them to sincere repentance and improvement with the Word of God. Under his guidance, church schools were opened in the towns and villages. The rich offered their money for the betterment of the churches, for the purchase of Holy Books (which the saint distributed to the literate), veils (which he gave women, admonishing them to come to church with covered heads),for prayer ropes and crosses (which he distributed to the common folk), and for baptismal fonts so that children could be baptized in the proper manner. Since the churches could not accommodate everyone wanting to hear the wise preacher, Saint Cosmas with forty or fifty priests served the Vigil in the fields, and in city squares, where thousands of people prayed for the living and for the dead, and were edified by his preaching. Everywhere that Saint Cosmas halted and preached, the grateful listeners set up a large wooden cross, which remained thereafter in memory of this. The apostolic service of Saint Cosmas was brought to a close by his martyric death in the year 1779. At 65 years of age, he was seized by the Turks and strangled. His body was thrown into a river, and after three days, was found by the priest Mark and buried near the village of Kolikontasi at the monastery of the Entrance into the Temple of the Most Holy Theotokos. Afterwards, part of his relics were transferred to various places as a blessing. He was glorified by the Ecumenical Patriarchate in 1961.`,
      };
      await expect(() => addAuthor(author)).rejects.toThrow(
        'Duplicate Author Info'
      );
    });

    test('addAuthor: Incorrect Author Object failure', async () => {
      const newAuthor = {
        name: 'Moses the Godseer',
        title: 'Prophet',
        born: '1689',
        died: '1569',
        is_bc: true,
        feast_day: 'September 4',
        best_friend: 'Bob?',
      };

      await expect(addAuthor(newAuthor)).rejects.toThrow(
        'Error Adding New Author'
      );
    });

    describe('updateAuthor', () => {
      test('updateAuthor: Success', async () => {
        const updatedAuthor = {
          id: 2,
          name: 'Moses the Godseer',
          title: 'Holy Prophet',
          born: '1689',
          died: '1569',
          is_bc: true,
          feast_day: 'September 4',
        };
        const author = await updateAuthor(updatedAuthor);
        expect(author.name).toEqual(updatedAuthor.name);
        expect(author.createdAt).not.toEqual(author.modifiedAt);
      });

      describe('updateAuthor: Failures', () => {
        test('updateAuthor: Missing Author ID', async () => {
          const author = {
            name: 'Moishe',
            title: 'Prophet',
            born: '1689',
            died: '1569',
            is_bc: true,
            feast_day: 'September 4',
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Missing Author ID'
          );
        });

        test('updateAuthor: Missing Author Name', async () => {
          const author = {
            id: 2,
            title: 'Prophet',
            born: '1689',
            died: '1569',
            is_bc: true,
            feast_day: 'September 4',
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Missing Author Name'
          );
        });

        test('updateAuthor: Missing Author Title', async () => {
          const author = {
            id: 2,
            name: 'Moishe',
            born: '1689',
            died: '1569',
            is_bc: true,
            feast_day: 'September 4',
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Missing Author Title'
          );
        });

        test('updateAuthor: Missing Author Born Date', async () => {
          const author = {
            id: 2,
            name: 'Moishe',
            title: 'Prophet',
            died: '1569',
            is_bc: true,
            feast_day: 'September 4',
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Missing Author Born Date'
          );
        });

        test('updateAuthor: Missing Author Died Date', async () => {
          const author = {
            id: 2,
            name: 'Moishe',
            title: 'Prophet',
            born: '1689',
            is_bc: true,
            feast_day: 'September 4',
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Missing Author Died Date'
          );
        });

        test('updateAuthor: Missing Author BC Boolean', async () => {
          const author = {
            id: 2,
            name: 'Moishe',
            title: 'Prophet',
            born: '1689',
            died: '1569',
            feast_day: 'September 4',
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Missing Author BC Boolean'
          );
        });

        test('updateAuthor: Missing Author Feast Day', async () => {
          const author = {
            id: 2,
            name: 'Moishe',
            title: 'Prophet',
            born: '1689',
            died: '1569',
            is_bc: true,
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Missing Author Feast Day'
          );
        });

        test('updateAuthor: Duplicate Author Info', async () => {
          const author = {
            id: 2,
            name: 'Moishe',
            title: 'Prophet',
            born: '1689',
            died: '1569',
            is_bc: true,
            feast_day: 'September 4',
            life: `The New Hieromartyr Cosmas, Equal of the Apostles, in the world Constas, was a native of Aitolia. He studied at first under the guidance of the archdeacon Ananias Dervisanos, and afterwards continued his education on Mount Athos, at the Vatopedi school renowned for teachers such as Nicholas Tzartzoulios (from Metsovo) and Eugenius Voulgaris (afterwards in the years 1775-1779 the archbishop of Ekaterinoslav and the Chersonessus). Remaining on Athos at the Philotheou monastery to devote himself to spiritual labors, he was tonsured a monk with the name Cosmas, and later was ordained hieromonk. The desire to benefit his fellow Christians, to guide them upon the way of salvation and strengthen their faith, impelled Saint Cosmas to seek the blessing of his spiritual fathers and go to Constantinople. There he mastered the art of rhetoric and, having received a written permit of Patriarch Seraphim II (and later from his successor Sophronius) to preach the Holy Gospel. So the saint began to proclaim the Gospel at first in the churches of Constantinople and the surrounding villages, then in the Danube regions, in Thessalonica, in Verroia, in Macedonia, Chimaera, Akarnania, Aitolia, on the islands of Saint Maura, Kephalonia and other places. His preaching, filled with the grace of the Holy Spirit, was simple, calm, and gentle. It brought Christians great spiritual benefit. The Lord Himself assisted him and confirmed his words with signs and miracles, just as He had confirmed the preaching of the Apostles. Preaching in the remote areas of Albania, where Christian piety had almost disappeared among the rough and coarse people entrenched in sin, Saint Cosmas led them to sincere repentance and improvement with the Word of God. Under his guidance, church schools were opened in the towns and villages. The rich offered their money for the betterment of the churches, for the purchase of Holy Books (which the saint distributed to the literate), veils (which he gave women, admonishing them to come to church with covered heads),for prayer ropes and crosses (which he distributed to the common folk), and for baptismal fonts so that children could be baptized in the proper manner. Since the churches could not accommodate everyone wanting to hear the wise preacher, Saint Cosmas with forty or fifty priests served the Vigil in the fields, and in city squares, where thousands of people prayed for the living and for the dead, and were edified by his preaching. Everywhere that Saint Cosmas halted and preached, the grateful listeners set up a large wooden cross, which remained thereafter in memory of this. The apostolic service of Saint Cosmas was brought to a close by his martyric death in the year 1779. At 65 years of age, he was seized by the Turks and strangled. His body was thrown into a river, and after three days, was found by the priest Mark and buried near the village of Kolikontasi at the monastery of the Entrance into the Temple of the Most Holy Theotokos. Afterwards, part of his relics were transferred to various places as a blessing. He was glorified by the Ecumenical Patriarchate in 1961.`,
          };
          await expect(() => updateAuthor(author)).rejects.toThrow(
            'Duplicate Author Info'
          );
        });

        test('updateAuthor: Incorrect Author Object failure', async () => {
          const author = {
            id: 1,
            name: 'Moses the Godseer',
            title: 'Prophet',
            born: '1689',
            died: '1569',
            is_bc: true,
            feast_day: 'September 4',
            best_friend: 'Bob?',
          };

          await expect(updateAuthor(author)).rejects.toThrow(
            'Error Updating Author'
          );
        });
      });
    });
  });

  describe('deleteAuthor', () => {
    test('deleteAuthor: Success', async () => {
      const id = 2;
      const author = await deleteAuthor(id);
      expect(author.isDeleted).toEqual(true);
      expect(author.createdAt).not.toEqual(author.modifiedAt);
    });

    describe('deleteAuthor: Failures', () => {
      test('deleteAuthor: Already Deleted failure', async () => {
        const id = 2;
        await expect(() => deleteAuthor(id)).rejects.toThrow(
          'Author Already Deleted'
        );
      });

      test('deleteAuthor: Missing ID failure', async () => {
        await expect(() => deleteAuthor()).rejects.toThrow('Missing Author ID');
      });
    });
  });

  describe('restoreAuthor', () => {
    test('restoreAuthor: Success', async () => {
      const id = 2;
      const author = await restoreAuthor(id);
      expect(author.is_deleted).toEqual(false);
      expect(author.created_at).not.toEqual(author.modified_at);
    });

    describe('restoreAuthor: Failures', () => {
      test('restoreAuthor: Not Deleted failure', async () => {
        const id = 2;
        await expect(() => restoreAuthor(id)).rejects.toThrow(
          'Author Not Deleted'
        );
      });

      test('restoreAuthor: Missing ID failure', async () => {
        await expect(() => restoreAuthor()).rejects.toThrow(
          'Missing Author ID'
        );
      });
    });
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });
});
