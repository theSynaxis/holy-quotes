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

module.exports = {
  verifyAuthorInfo,
};
