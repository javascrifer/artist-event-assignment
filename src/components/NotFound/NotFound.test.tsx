import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NotFound from './NotFound';

configure({
  adapter: new Adapter(),
});

describe('<NotFound />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFound message="Not found message" />);
  });

  test('should render sad face image', () => {
    // GIVEN
    const image = wrapper.find('.Image');

    // THEN
    expect(image).toHaveLength(1);
    expect(image.prop('src')).toBe('sad.png');
    expect(image.prop('alt')).toBe('Sad face');
  });

  test('should render not found message', () => {
    // GIVEN
    const paragraph = wrapper.find('.Message');

    // THEN
    expect(paragraph).toHaveLength(1);
    expect(paragraph.contains('Not found message')).toBeTruthy();
  });
});
