import Logger from '../logger'

const collectionName = 'domains';

export class DomainModel {
  static createIndexes (db) {
    db.collection(collectionName).createIndex({ company: 1 });
    db.collection(collectionName).createIndex({ 'createdAt': 1 }, { expireAfterSeconds: 5184000 }); // expire after a month
  };

  constructor (requestContext) {
    this.db = requestContext.db;
  }

  get domainsCollection () {
    return this.db.collection(collectionName);
  }

  getCompanyDomain (company) {
    return this.domainsCollection.findOne({ company: company.toUpperCase() });
  }

  async storeCompanyDomain (company, domain) {
    const domainEntry = {
      company: company.toUpperCase(),
      domain,
      createdAt: new Date()
    };

    try {
      await this.domainsCollection.insertOne(domainEntry);
      Logger.info(`Inserted ${domain} domain for ${domainEntry.company} company`);
    } catch (e) {
      Logger.error(`Error when inserting ${domain} domain for ${domainEntry.company} company. ${e}`);
    }
  }
}
