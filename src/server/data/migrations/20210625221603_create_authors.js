/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('authors', (tbl) => {
    tbl.increments();
    tbl.string('name');
    tbl.string('title');
    tbl.string('born');
    tbl.string('died');
    tbl.boolean('isBC');
    tbl.string('feast_day');
    tbl.text('life');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('modified_at').defaultTo(knex.fn.now());
    tbl.boolean('is_deleted').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('authors');
};
