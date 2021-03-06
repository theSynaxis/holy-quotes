async function verifyAuthorInfo(author) {
  if (!author.name) {
    throw new Error('Missing Author Name');
  }
  if (!author.title) {
    throw new Error('Missing Author Title');
  }
  if (!author.born) {
    throw new Error('Missing Author Born Date');
  }
  if (!author.died) {
    throw new Error('Missing Author Died Date');
  }
  if (author.is_bc === (null || undefined)) {
    throw new Error('Missing Author BC Boolean');
  }
  if (!author.feast_date) {
    throw new Error('Missing Author Feast Date');
  }
  if (!author.feast_month) {
    throw new Error('Missing Author Feast Month');
  }
  return author;
}

function GqlToDBAuthorData(author) {
  let transformedAuthor;
  if (author.id) {
    transformedAuthor = {
      id: author.id,
      name: author.name,
      title: author.title,
      born: author.born,
      died: author.died,
      is_bc: author.isBC,
      feast_date: author.feastDate,
      feast_month: author.feastMonth,
      life: author.life,
      is_deleted: author.isDeleted,
      created_at: author.createdAt,
      modified_at: author.modifiedAt,
    };
    return transformedAuthor;
  }
  transformedAuthor = {
    name: author.name,
    title: author.title,
    born: author.born,
    died: author.died,
    is_bc: author.isBC,
    feast_date: author.feastDate,
    feast_month: author.feastMonth,
    life: author.life,
    is_deleted: author.isDeleted,
    created_at: author.createdAt,
    modified_at: author.modifiedAt,
  };
  return transformedAuthor;
}

function DBToGqlAuthorData(author) {
  const transformedAuthor = {
    id: author.id,
    name: author.name,
    title: author.title,
    born: author.born,
    died: author.died,
    isBC: author.is_bc,
    feastDate: author.feast_date,
    feastMonth: author.feast_month,
    life: author.life,
    isDeleted: author.is_deleted,
    createdAt: author.created_at,
    modifiedAt: author.modified_at,
  };
  return transformedAuthor;
}

module.exports = {
  verifyAuthorInfo,
  GqlToDBAuthorData,
  DBToGqlAuthorData,
};
