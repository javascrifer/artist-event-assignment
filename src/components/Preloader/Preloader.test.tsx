import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Preloader from './Preloader';

configure({
  adapter: new Adapter(),
});

describe('<Preloader />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Preloader />);
  });

  test('should have parent div with 4 child divs inside', () => {
    // GIVEN
    const parent = wrapper.find('.Preloader');

    // THEN
    expect(parent).toHaveLength(1);
    expect(parent.children().find('div')).toHaveLength(4);
  });
});
