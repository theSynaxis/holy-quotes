const { findAll, findOne } = require('../../data/dataModel');

function getAuthors() {
  return findAll('authors');
}

async function getAuthor(id) {
  if (!id) {
    throw new Error('Missing Author ID');
  }

  const author = await findOne('authors', id)
    .then((res) => res)
    .catch(() => {
      throw new Error('Author Does Not Exist');
    });
  return author;
}

module.exports = {
  getAuthors,
  getAuthor,
};
