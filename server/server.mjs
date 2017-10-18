import express from 'express';

import http from 'http';

export class Server {
  constructor() {
    this.app = express();

    this.app.use('/status', this.status);
    this.app.get('/domains', this.getDomains);
  }

  async start(port = 3000) {
    const server = await http.createServer(this.app);
    return server.listen(port, () => {
      console.info('🚀 Server is running.');
    });
  }

  status(req, res) {
    res.sendStatus(200);
  }

  getDomains(req, res) {
    const data = {
      data: [
        {
          name: 'nike',
          domain: 'nike.com',
        },
        {
          name: 'adidas',
          domain: 'adidas.com',
        },
      ],
      length: 2,
    };

    res.json(data);
  }
}
