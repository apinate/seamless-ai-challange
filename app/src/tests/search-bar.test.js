import React from 'react';
import renderer from 'react-test-renderer';
import enzyme from 'enzyme';

import { SearchBar } from '../components';
import { event, eventWithValue } from './helpers';

test('SearchBar renders correctly with no danger', () => {
  const props = {
    searchPlaceholder: 'Enter company name',
    onSearch: () => null,
    hasError: false,
  };

  const component = renderer.create(<SearchBar {...props} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SearchBar renders correctly with has danger', () => {
  const props = {
    searchPlaceholder: 'Enter company name',
    onSearch: () => null,
    hasError: true,
  };

  const component = renderer.create(<SearchBar {...props} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SearchBar passes the right value on submit', () => {
  const errMessage = 'Validation did not pass';

  let actualValue;
  const props = {
    searchPlaceholder: 'Enter company name',
    onSearch: (value) => { actualValue = value; },
    validation: () => { throw new Error(errMessage); },
    queryExtractor: () => '',
  };

  const component = enzyme.shallow(<SearchBar {...props} />);

  const expectedValue = 'Test data';
  component.find('input[type="search"]').simulate('change', eventWithValue(expectedValue));
  component.find('form').simulate('submit', event);

  expect(component.state('value')).toEqual(expectedValue);
  expect(actualValue).toEqual(expectedValue);
});
