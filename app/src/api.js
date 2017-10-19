const MOCK_DATA = [
  { name: 'adidas', domain: 'adidas.com' },
  { name: 'nike', domain: 'nike.com' },
  { name: 'puma', domain: 'puma.com' },
];

// eslint-disable-next-line
export const findCompaniesDomains = (names) => {
  return new Promise((resolve) => {
    setTimeout(() => (resolve(MOCK_DATA)), 500);
  });
};
