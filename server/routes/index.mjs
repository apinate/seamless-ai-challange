import parseDomain from 'parse-domain'
import google from 'googleapis'
import express from 'express'
import asyncMiddleware from 'async-middleware'

import { config } from '../config'

const customSearch = google.customsearch('v1');

const searchCompany = (company) => {
  const customSearchPromise = new Promise((resolve, reject) => {
    const { google: { cx, auth } } = config;

    customSearch.cse.list({ cx, q: company, num: 1, auth },
      (error, response) => {
        if (error) {
          return reject(error);
        }

        const { items } = response;
        if (items && items.length > 0) {
          return resolve(items[0]);
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
    console.error(error);

    res.status(422).send(error);
  }

  const domains = [];
  await Promise.all(companies.map(async (company) => {
    const result = await searchCompany(company);
    const { domain, tld } = parseDomain(result.link);

    domains.push({
      name: company,
      domain: `${domain}.${tld}`
    });
  }));

  res.json(domains);
});

export const domains = express.Router();
domains.get('/', getDomains);
