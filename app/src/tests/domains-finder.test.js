import React from 'react';
import renderer from 'react-test-renderer';
import enzyme from 'enzyme';

import * as api from '../api';
import { DomainsFinder } from '../pages';
import { SearchBar } from '../components';


test('DomainsFinder renders correctly with no danger', () => {
  const component = renderer.create(<DomainsFinder />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DomainsFinder shows error for no query provided', () => {
  const component = enzyme.mount(<DomainsFinder />);

  const expectedErrorMessage = 'No search query provided.';
  component.find(SearchBar).prop('onSearch')('');
  expect(component.state('queryError')).toEqual(expectedErrorMessage);
});

test('DomainsFinder shows error for exceeded company names', () => {
  const component = enzyme.shallow(<DomainsFinder />);

  const queryString = new Array(26).fill(0).map((_, i) => i).join(',');
  const expectedErrorMessage = 'Requested Company Domains Exceeds the Limit of 25';
  component.find(SearchBar).prop('onSearch')(queryString);
  expect(component.state('queryError')).toEqual(expectedErrorMessage);
});


test('DomainsFinder state should contain companies details on search', async () => {
  const component = enzyme.shallow(<DomainsFinder />);

  api.findCompaniesDomains = jest.fn().mockImplementation((names) => {
    return new Promise(resolve => resolve(names.map(name => ({ name, domain: `${name}.com` }))));
  });

  const queryString = 'adidas, nike';
  return component.find(SearchBar).prop('onSearch')(queryString).then(() => {
    expect(component.state('queryError')).toBeFalsy();
    expect(component.state('hasServerError')).toBeFalsy();

    const companies = component.state('companies');
    expect(companies).toHaveLength(2);
    expect(companies).toContainEqual({ name: 'adidas', domain: 'adidas.com' });
    expect(companies).toContainEqual({ name: 'nike', domain: 'nike.com' });
  });
});

test('DomainsFinder state should flag server error when findCompaniesDomains throws an error', async () => {
  const component = enzyme.shallow(<DomainsFinder />);

  api.findCompaniesDomains = jest.fn().mockImplementation((_) => {
    throw new Error();
  });

  const queryString = 'adidas, nike';
  return component.find(SearchBar).prop('onSearch')(queryString).then(() => {
    expect(component.state('queryError')).toBeFalsy();
    expect(component.state('hasServerError')).toBeTruthy();

    const companies = component.state('companies');
    expect(companies).toHaveLength(0);
  });
});

