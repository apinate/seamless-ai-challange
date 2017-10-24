import mongo from 'mongodb';

import { config } from '../config'
import { DomainModel } from './domain-model'

export const ensureIndexes = async () => {
  const db = await mongo.MongoClient.connect(config.mongo.uri);
  await DomainModel.createIndexes(db);
};
