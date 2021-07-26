const {
  findAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
  restoreOne,
} = require('../../data/dataModel');
const {
  verifyAuthorInfo,
  GqlToDBAuthorData,
  DBToGqlAuthorData,
} = require('./authorFunctions');

function getAuthors() {
  return findAll('authors').then((res) => {
    return res.map((author) => {
      return DBToGqlAuthorData(author);
    });
  });
}

async function getAuthor(id) {
  if (!id) {
    throw new Error('Missing Author ID');
  }

  const author = await findOne('authors', id)
    .then(async (res) => {
      const transformedAuthor = await DBToGqlAuthorData(res);
      return transformedAuthor;
    })
    .catch(() => {
      throw new Error('Author Does Not Exist');
    });
  return author;
}

async function addAuthor(author) {
  let transformedAuthor = author;
  if (author.feastDate) {
    transformedAuthor = await GqlToDBAuthorData(author);
  }
  const verifiedAuthor = await verifyAuthorInfo(transformedAuthor);
  const newAuthor = await addOne('authors', verifiedAuthor)
    .then()
    .catch((err) => {
      if (err.toString().includes('duplicate key value')) {
        throw new Error('Duplicate Author Info');
      }
      return err;
    });
  if (newAuthor.name === 'Error') {
    throw new Error('Error Adding New Author');
  }
  const retransformedAuthor = await DBToGqlAuthorData(newAuthor);
  return retransformedAuthor;
}

async function updateAuthor(author) {
  if (!author.id) {
    throw new Error('Missing Author ID');
  }
  let transformedAuthor = author;
  if (author.feastDate) {
    transformedAuthor = await GqlToDBAuthorData(author);
  }
  const verifiedAuthor = await verifyAuthorInfo(transformedAuthor);
  const updatedAuthor = await updateOne('authors', verifiedAuthor)
    .then()
    .catch((err) => {
      if (err.toString().includes('duplicate key value')) {
        throw new Error('Duplicate Author Info');
      }
      return err;
    });
  if (updatedAuthor.name === 'error') {
    throw new Error('Error Updating Author');
  }
  const retransformedAuthor = await DBToGqlAuthorData(updatedAuthor);
  return retransformedAuthor;
}

async function deleteAuthor(id) {
  const author = await getAuthor(id);
  if (author.isDeleted) {
    throw new Error('Author Already Deleted');
  }
  return deleteOne('authors', id).then(async (res) => {
    const transformedAuthor = await DBToGqlAuthorData(res);
    return transformedAuthor;
  });
}

async function restoreAuthor(id) {
  const author = await getAuthor(id);
  if (!author.isDeleted) {
    throw new Error('Author Not Deleted');
  }
  return restoreOne('authors', id).then(async (res) => {
    const transformedAuthor = await DBToGqlAuthorData(res);
    return transformedAuthor;
  });
}

module.exports = {
  getAuthors,
  getAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  restoreAuthor,
};
