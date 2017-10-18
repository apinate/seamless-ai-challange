import express from 'express';

import http from "http"

export class Server {
  constructor() {
    this.app = express();
    
    this.app.use('/status', this.status);
  }

  async start(port = 3000) {
    const server = await http.createServer(this.app);
    return server.listen(port, () => {
      console.info('🚀 Server is running.');
    });
  }

  status(req, res) { 
    res.sendStatus(200) 
  };
}
