import Server from './server'
import Logger from './logger'

const server = new Server();
server.start(process.env.PORT);

process.on('unhandledRejection', (reason, promise) => {
  Logger.error(`Unhandled Promise Rejection. 'reason:' ${reason})`);
});
