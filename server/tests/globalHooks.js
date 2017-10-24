require = require('@std/esm')(module);

const { MongoClient } = require('mongodb');

const Server = require('../server.mjs').default;
const { setPort } = require('./helpers');
const config = require('./config').default;

let tempTestServer = {};
// Run before all tests.
before(async () => {
  tempTestServer = await startServer();
  port = tempTestServer.address().port;
  console.info(`🚀 Temp test server started on port ${port}.`);

  setPort(port);
  clearDB();
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

const clearDB = async () => {
  const db = await MongoClient.connect(config.mongo.uri);
  for (const collection of await db.collections()) {
    await collection.deleteMany({});
  }
};

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
