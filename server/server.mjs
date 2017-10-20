import http from 'http'
import express from 'express'
import compression from 'compression'
import cors from 'cors'

import * as routes from './routes'
import Logger from './logger'

export default class Server {
  constructor () {
    this.app = express();

    this.app.use(compression());
    this.app.use(cors());
    this.app.use('/status', this.status);
    this.app.use('/domains', routes.domains);
  }

  start (port = 3000) {
    const server = http.createServer(this.app);
    return server.listen(port, () => {
      Logger.info('🚀 Server is running.');
    });
  }

  status (req, res) {
    res.sendStatus(200);
  }
}
