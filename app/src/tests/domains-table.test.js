import React from 'react';
import renderer from 'react-test-renderer';

import { DomainsTable } from '../components';

test('DomainsTable renders correctly when no companies provided', () => {
  const component = renderer.create(<DomainsTable companies={[]} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('DomainsTable renders correctly when one company provided', () => {
  const companies = [
    { name: 'adidas', domain: 'adidas.com' },
  ];

  const component = renderer.create(<DomainsTable companies={companies} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DomainsTable renders correctly when several companies provided', () => {
  const companies = [
    { name: 'adidas', domain: 'adidas.com' },
    { name: 'nike', domain: 'nike.com' },
    { name: 'apple', domain: 'apple.com' },
  ];

  const component = renderer.create(<DomainsTable companies={companies} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
