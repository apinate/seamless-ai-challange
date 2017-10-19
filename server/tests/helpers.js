const axios = require('axios');

const host = 'localhost';
let port = -1;

createAxiosServerConfig = () => {
  return {
    baseURL: `http://${host}:${port}/`,
    validateStatus: (status) => true
  };
};

module.exports.setPort = (p) => {
  port = p;
};

module.exports.getClient = () => {
  return axios.create(createAxiosServerConfig());
};
