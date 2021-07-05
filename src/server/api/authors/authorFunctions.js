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
  if (!author.is_bc) {
    throw new Error('Missing Author BC Boolean');
  }
  if (!author.feast_day) {
    throw new Error('Missing Author Feast Day');
  }
  return author;
}

function transformAuthorData(author) {
  if (author.feastDay) {
    const transformedAuthor = {
      name: author.name,
      title: author.title,
      born: author.born,
      died: author.died,
      is_bc: author.isBC,
      feast_day: author.feastDay,
      life: author.life,
      is_deleted: author.isDeleted,
      created_at: author.createdAt,
      modified_at: author.modifiedAt,
    };
    return transformedAuthor;
  }
  const transformedAuthor = {
    id: author.id,
    name: author.name,
    title: author.title,
    born: author.born,
    died: author.died,
    isBC: author.is_bc,
    feastDay: author.feast_day,
    life: author.life,
    isDeleted: author.is_deleted,
    createdAt: author.created_at,
    modifiedAt: author.modified_at,
  };
  return transformedAuthor;
}

module.exports = {
  verifyAuthorInfo,
  transformAuthorData,
};
