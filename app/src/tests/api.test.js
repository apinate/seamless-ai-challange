import * as queryString from 'query-string';

import { findCompaniesDomains } from '../api';

test('findCompaniesDomains rejects the promise when http response status is not OK', async () => {
  global.fetch =
    jest.fn().mockImplementationOnce(() => new Promise(res => res({ ok: false })));

  await expect(findCompaniesDomains([])).rejects.toBeDefined();
});


test('findCompaniesDomains resolves the payload when http response status OK', async () => {
  const payload = [
    { name: 'adidas', domain: 'adidas.com' },
    { name: 'nike', domain: 'nike.com' },
  ];

  global.fetch = jest.fn().mockImplementationOnce(() =>
    new Promise(res => res(new Response(JSON.stringify(payload), { status: 200 }))));

  await expect(findCompaniesDomains([])).resolves.toMatchObject(payload);
});

test('findCompaniesDomains passes Accept: application/json header', async () => {
  const payload = [
    { name: 'adidas', domain: 'adidas.com' },
    { name: 'nike', domain: 'nike.com' },
  ];

  global.fetch = jest.fn().mockImplementationOnce((_, requestInit) => new Promise((res) => {
    expect(requestInit.headers.get('Accept')).toEqual('application/json');
    res(new Response(JSON.stringify(payload), { status: 200 }));
  }));

  await findCompaniesDomains([]);
});

test('findCompaniesDomains passes correct query params', async () => {
  const payload = [
    { name: 'adidas', domain: 'adidas.com' },
    { name: 'nike', domain: 'nike.com' },
  ];

  const companies = ['adidas', 'nike'];

  global.fetch = jest.fn().mockImplementationOnce(request => new Promise((res) => {
    const queryParamsString = request.match(/^.+\/domains\?(.*)$/)[1];
    const queryParams = queryString.parse(queryParamsString, { arrayFormat: 'bracket' });
    expect(queryParams.companies).toHaveLength(2);
    expect(queryParams.companies).toEqual(expect.arrayContaining([...companies]));

    res(new Response(JSON.stringify(payload), { status: 200 }));
  }));

  await findCompaniesDomains(companies);
});
