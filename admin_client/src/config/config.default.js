module.exports = {
  api:
    process.env.REACT_STATIC_ENV === 'production'
      ? 'xxx'
      : 'http://localhost:3001',
  videoRepo: 'xxx'
}
