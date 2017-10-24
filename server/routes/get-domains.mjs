import express from 'express'
import asyncMiddleware from 'async-middleware'

import Logger from '../logger'
import { googleCustomSearch } from '../domain-search'

const getDomains = asyncMiddleware.wrap(async (req, res) => {
  const { companies } = req.query;

  if (!Array.isArray(companies)) {
    const error = 'Companies array should be send';
    Logger.error(error);

    return res.status(422).send(error);
  }

  if (companies.length > 25) {
    const error = 'Up to 25 companies can be processed';
    Logger.error(error);

    return res.status(413).send(error);
  }

  const domains = await Promise.all(companies.map(async (company) => {
    const companyDomain = await req.context.DomainModel.getCompanyDomain(company);

    if (companyDomain) {
      return {
        name: company,
        domain: companyDomain.domain
      };
    }

    const foundDomain = await googleCustomSearch(company);

    req.context.DomainModel.storeCompanyDomain(foundDomain.name, foundDomain.domain);

    return foundDomain;
  }));

  res.json(domains);
});

export const domains = express.Router();
domains.get('/', getDomains);
