const { assert } = require('chai');
const querystring = require('querystring');

const helpers = require('./../helpers');
const testData = require('./testData');

describe('Companies GET query', () => {
  it('should fail without query param', async () => {
    const client = helpers.getClient();
    const response = await client.get('/domains');

    assert.equal(response.status, 422);
  });

  it('should return 200', async () => {
    const client = helpers.getClient();
    const companyTestData = testData.getTestData()[0];
    const { company } = companyTestData;

    const companiesQuery = querystring.stringify({ 'companies[]': [ company ] });
    const response = await client.get(`/domains?${companiesQuery}`);

    assert.equal(response.status, 200);
  });

  it('should have json Content-Type', async () => {
    const client = helpers.getClient();
    const companyTestData = testData.getTestData()[0];
    const { company } = companyTestData;

    const companiesQuery = querystring.stringify({ 'companies[]': [ company ] });
    const response = await client.get(`/domains?${companiesQuery}`);

    assert.isTrue(response.headers.hasOwnProperty('content-type'));

    const contentType = response.headers['content-type']
    assert.include(contentType, 'application/json');
  });

  it('should return domain', async () => {
    const client = helpers.getClient();
    const companyTestData = testData.getTestData()[0];
    const { company, domain } = companyTestData;

    const companiesQuery = querystring.stringify({ 'companies[]': [ company ] });
    const response = await client.get(`/domains?${companiesQuery}`);

    const { data } = response;
    assert.equal(data[0].name, company);
    assert.include(domain, data[0].domain);
  });

  it('should not be able to process more than 25 companies', async () => {
    const client = helpers.getClient();

    const companies = [];
    for (let i = 0; i < 26; i++) {
      companies.push(`company${i}`);
    }

    const companiesQuery = querystring.stringify({ companies });
    const response = await client.get(`/domains?${companiesQuery}` + companiesQuery);

    assert.equal(response.status, 413);
  });
  it('should return domain of test data companies', async () => {
    const client = helpers.getClient();
    const companiesTestData = testData.getTestData();

    let companies = companiesTestData.reduce((result, { company }) => {
      result.push(company);

      return result;
    }, []);

    const query = querystring.stringify({ companies });
    const response = await client.get('/domains?' + query);

    response.data.forEach(data => {
      const { name, domain } = data;

      assert.include(companies, name);
      const companyTestData = companiesTestData.filter(testData => testData.company === name);

      assert.include(companyTestData[0].domain, domain, `for company ${name}`);
    });
  });
})
