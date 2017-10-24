const config = require('./config').default;

process.env.MONGO_URI = config.mongo.uri;
