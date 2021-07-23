/* istanbul ignore file */
const dev = process.env.NODE_ENV !== 'production';

const api = dev
  ? 'http://localhost:3000/api/graphql'
  : 'https://thesynaxis.com/api/graphql';

export default api;
