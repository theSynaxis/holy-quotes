const {
  findAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
  restoreOne,
} = require('../../data/dataModel');
const { verifyAuthorInfo } = require('./authorFunctions');

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

async function addAuthor(author) {
  const verifiedAuthor = await verifyAuthorInfo(author);
  const newAuthor = await addOne('authors', verifiedAuthor)
    .then()
    .catch((err) => {
      if (err.toString().includes('duplicate key value')) {
        throw new Error('Duplicate Author Info');
      }
      return err;
    });
  return newAuthor;
}

async function updateAuthor(author) {
  if (!author.id) {
    throw new Error('Missing Author ID');
  }
  const verifiedAuthor = await verifyAuthorInfo(author);
  const updatedAuthor = await updateOne('authors', verifiedAuthor)
    .then()
    .catch((err) => {
      if (err.toString().includes('duplicate key value')) {
        throw new Error('Duplicate Author Info');
      }
      return err;
    });
  return updatedAuthor;
}

async function deleteAuthor(id) {
  const author = await getAuthor(id);
  if (author.is_deleted) {
    throw new Error('Author Already Deleted');
  }
  return deleteOne('authors', id);
}

async function restoreAuthor(id) {
  const author = await getAuthor(id);
  if (!author.is_deleted) {
    throw new Error('Author Not Deleted');
  }
  return restoreOne('authors', id);
}

module.exports = {
  getAuthors,
  getAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  restoreAuthor,
};
