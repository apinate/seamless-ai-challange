module.exports.default = {
  mongo: {
    uri: process.env.TESTS_MONGO_URI || 'mongodb://127.0.0.1/seamlessai_tests'
  }
};
