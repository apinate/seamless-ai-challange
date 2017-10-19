import http from 'http'
import express from 'express'

import * as routes from './routes'
import { cors } from './middlewares';

export default class Server {
  constructor () {
    this.app = express();

    this.app.use(cors);
    this.app.use('/status', this.status);
    this.app.use('/domains', routes.domains);
  }

  async start (port = 3000) {
    const server = await http.createServer(this.app);
    return server.listen(port, () => {
      console.info('🚀 Server is running.');
    });
  }

  status (req, res) {
    res.sendStatus(200);
  }
}
