/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('authors', (tbl) => {
    tbl.increments();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('authors');
};
