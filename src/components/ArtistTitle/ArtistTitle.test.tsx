import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import ArtistTitle from './ArtistTitle';

configure({
  adapter: new Adapter(),
});

describe('<ArtistTitle />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ArtistTitle name="John Doe" imageSrc="my-image-src" />);
  });

  test('should render artist image', () => {
    // GIVEN
    const image = wrapper.find('.Image');

    // THEN
    expect(image).toHaveLength(1);
    expect(image.prop('src')).toBe('my-image-src');
    expect(image.prop('alt')).toBe('John Doe');
  });

  test('should render artist name', () => {
    // GIVEN
    const paragraph = wrapper.find('.ArtistName');

    // THEN
    expect(paragraph).toHaveLength(1);
    expect(paragraph.contains('John Doe')).toBeTruthy();
  });
});
