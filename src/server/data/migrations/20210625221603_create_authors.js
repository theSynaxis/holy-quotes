/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('authors', (tbl) => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('title').notNullable();
    tbl.string('born').notNullable();
    tbl.string('died').notNullable();
    tbl.boolean('is_bc').notNullable();
    tbl.string('feast_day').notNullable();
    tbl.text('life').unique();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('modified_at').defaultTo(knex.fn.now());
    tbl.boolean('is_deleted').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('authors');
};
