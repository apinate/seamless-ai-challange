const { assert } = require('chai');

const helpers = require('./../helpers');

describe('Companies GET query', () => {
  it('should fail without query param', async () => {
    const client = helpers.getClient();
    const response = await client.get('/domains');

    assert.equal(response.status, 422);
  });

  it('should return 200', async () => {
    const client = helpers.getClient();
    const response = await client.get('/domains?companies[]=google');

    assert.equal(response.status, 200);
  });

  it('should have json Content-Type', async () => {
    const client = helpers.getClient();
    const response = await client.get('/domains?companies[]=google');

    assert.isTrue(response.headers.hasOwnProperty('content-type'));

    const contentType = response.headers['content-type']
    assert.include(contentType, 'application/json');
  });

  it('should return domain', async () => {
    const client = helpers.getClient();
    const response = await client.get('/domains?companies[]=google');

    assert.equal(response.data[0].name, 'google');
    assert.equal(response.data[0].domain, 'google.com');
  });

  it('should not be able to process more than 25 companies', async () => {
    const client = helpers.getClient();

    const companiesArray = [];
    for (let i = 0; i < 26; i++) {
      companiesArray.push('companies[]=company' + i);
    }

    const companiesQuery = companiesArray.join('&');
    const response = await client.get('/domains?' + companiesQuery);

    assert.equal(response.status, 413);
  });
})
