import { DomainModel } from './models'

export class RequestContext {
  constructor (req) {
    this.db = req.db;
  }

  get DomainModel () {
    if (!this.domainModel) {
      this.domainModel = new DomainModel(this);
    }

    return this.domainModel;
  }
}
