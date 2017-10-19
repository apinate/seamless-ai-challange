import Server from './server'

const server = new Server();
server.start(process.env.PORT);

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Promise Rejection. 'reason:' ${reason})`);
});
