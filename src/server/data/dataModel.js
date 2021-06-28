const db = require('./dbConfig');

function findOne(database, id) {
  return db(database)
    .where({ id })
    .first()
    .then((res) => {
      if (res === undefined) {
        throw new Error(`Item does not exist.`);
      }
      return res;
    })
    .catch((err) => {
      throw new Error(`Error finding item: ${err}`);
    });
}

function findAll(database) {
  return db(database)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(`Error finding item: ${err}`);
    });
}

async function addOne(database, item) {
  const [id] = await db(database)
    .insert(item, 'id')
    .then()
    .catch((err) => {
      throw new Error(`Error adding item: ${err}`);
    });
  return findOne(database, id);
}

async function updateOne(database, item) {
  if (!item) {
    throw new Error('Missing Data');
  }
  const { id } = item;
  if (!id) {
    throw new Error('Missing Item ID');
  }
  await db(database)
    .where({ id })
    .update(item)
    .then(() => {});
  return findOne(database, id);
}

async function deleteOne(database, id) {
  if (!id) {
    throw new Error('Missing Data');
  }

  await db(database)
    .where({ id })
    .update('is_deleted', true)
    .update('modified_at', db.fn.now());
  return findOne(database, id);
}

async function restoreOne(database, id) {
  if (!id) {
    throw new Error('Missing Data');
  }

  await db(database)
    .where({ id })
    .update('is_deleted', false)
    .update('modified_at', db.fn.now());
  return findOne(database, id);
}

module.exports = {
  findOne,
  findAll,
  addOne,
  updateOne,
  deleteOne,
  restoreOne,
};
