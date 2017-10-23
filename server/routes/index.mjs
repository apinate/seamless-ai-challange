import parseDomain from 'parse-domain'
import google from 'googleapis'
import express from 'express'
import asyncMiddleware from 'async-middleware'

import { config } from '../config'
import Logger from '../logger'

const customSearch = google.customsearch('v1');
const excludedWebsites = [
  'google.com',
  'linkedin.com',
  'youtube.com',
  'crunchbase.com',
  'facebook.com',
  'wikipedia.com'
].map(website => website.toUpperCase());

const searchCompanies = (company) => {
  const customSearchPromise = new Promise((resolve, reject) => {
    const { google: { cx, auth } } = config;

    customSearch.cse.list({ cx, q: `${company} website`, num: 5, auth },
      (error, response) => {
        if (error) {
          return reject(error);
        }

        const { items } = response;
        if (items && items.length > 0) {
          return resolve(items);
        }

        return reject(new Error('Empty response'));
      });
  });

  return customSearchPromise;
}

const getDomains = asyncMiddleware.wrap(async (req, res) => {
  const { companies } = req.query;

  if (!Array.isArray(companies)) {
    const error = 'companies array should be send';
    Logger.error(error);

    return res.status(422).send(error);
  }

  if (companies.length > 25) {
    const error = 'Up to 25 companies can be processed';
    Logger.error(error);

    return res.status(413).send(error);
  }

  const domains = await Promise.all(companies.map(async (company) => {
    const dbDomain = await req.context.DomainModel.getCompanyDomain(company);

    if (dbDomain) {
      return {
        name: company,
        domain: dbDomain.domain
      };
    }

    const companyCandidates = await searchCompanies(company);
    const excludedCompany = excludedWebsites.find(excludedWebsite => excludedWebsite.toUpperCase().includes(company.toUpperCase()));

    let parsedDomains = companyCandidates.map(foundCompany => {
      const { domain, tld } = parseDomain(foundCompany.link);

      return { domain, tld };
    });

    if (!excludedCompany) {
      parsedDomains = parsedDomains.filter(result => {
        const { domain, tld } = result;

        return !excludedWebsites.find(excludedWebsite => excludedWebsite === `${domain}.${tld}`.toUpperCase());
      })
    }

    const filteredItem = parsedDomains.find(result => {
      const { domain, tld } = result;

      return domain.toUpperCase() === company.toUpperCase() || `${domain}.${tld}`.toUpperCase() === company.toUpperCase();
    });

    const { domain, tld } = filteredItem || parsedDomains[0];
    const foundDomain = {
      name: company,
      domain: `${domain}.${tld}`
    };

    req.context.DomainModel.storeCompanyDomain(foundDomain.name, foundDomain.domain);

    return foundDomain;
  }));

  res.json(domains);
});

export const domains = express.Router();
domains.get('/', getDomains);
