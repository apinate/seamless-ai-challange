import * as queryString from 'query-string';

const baseUri = process.env.REACT_APP_SERVER_URL;

const headers = new Headers();
headers.append('Accept', 'application/json');

const basicRequest = {
  headers,
  method: 'GET',
  mode: 'cors',
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const findCompaniesDomains = async (companies) => {
  const queryParams = queryString.stringify({ companies }, { arrayFormat: 'bracket' });
  return fetch(`${baseUri}/domains?${queryParams}`, basicRequest).then(handleErrors);
};
