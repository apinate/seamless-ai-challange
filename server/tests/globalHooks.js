require = require('@std/esm')(module);

const Server = require('../server.mjs').default;
const { setPort } = require('./helpers');

let tempTestServer = {};
// Run before all tests.
before(async () => {
  tempTestServer = await startServer();
  port = tempTestServer.address().port;
  console.info(`🚀 Temp test server started on port ${port}.`);

  setPort(port);
});

after(async () => {
  await closeServer(tempTestServer);
});

const startServer = () => {
  const server = new Server();
  const httpServer = server.start();

  return new Promise((resolve) => {
    httpServer.on('listening', () => {
      resolve(httpServer);
    });
  });
}

const closeServer = async (server) => {
  if (server) {
    server.close();
    return new Promise((resolve) => {
      server.on('close', () => {
        resolve();
      });
    });
  }
};
