import expressMongoDb from 'express-mongo-db'

import { config } from '../config'
import { RequestContext } from '../RequestContext'

export const requestContext = () => {
  const mongoMiddleware = expressMongoDb(config.mongo.uri);
  const contextMiddleware = (req, _, next) => {
    req.context = new RequestContext(req);
    next();
  }

  return [ mongoMiddleware, contextMiddleware ];
}
