import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';

configure({
  adapter: new Adapter(),
});

describe('<Nav />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  test('should render application name', () => {
    // GIVEN
    const expectedAppName = 'Artist events assignment';

    // THEN
    expect(wrapper.find('span').contains(expectedAppName)).toBeTruthy();
  });

  test('should redirect to root on link click', () => {
    // GIVEN
    const link = wrapper.find(Link);

    // THEN
    expect(link).toHaveLength(1);
    expect(link.prop('to')).toBe('/');
  });
});
