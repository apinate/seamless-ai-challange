import google from 'googleapis'
import parseDomain from 'parse-domain'

import { config } from '../config'

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

export const googleCustomSearch = async (company) => {
  const companyCandidates = await searchCompanies(company);
  const excludedCompany = excludedWebsites.find(excludedWebsite => excludedWebsite.includes(company.toUpperCase()));

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
  return {
    name: company,
    domain: `${domain}.${tld}`
  };
}
