import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { ReactText } from 'react';
import { Link } from 'react-router-dom';

import { Artist } from '../../shared/artist';
import ArtistCard from './ArtistCard';

configure({
  adapter: new Adapter(),
});

describe('<ArtistCard />', () => {
  const artist: Artist = {
    facebook_page_url: 'facebook-url',
    id: 1,
    image_url: 'image-url',
    mbid: 1,
    name: 'John Doe',
    thumb_url: 'thumb-url',
    tracker_count: 5,
    upcoming_event_count: 10,
    url: 'url',
  };
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ArtistCard {...artist} />);
  });

  test('should render artist thumb image', () => {
    // GIVEN
    const thumbImage = wrapper.find('.Image img');

    // THEN
    expect(thumbImage).toHaveLength(1);
    expect(thumbImage.prop('src')).toBe('thumb-url');
    expect(thumbImage.prop('alt')).toBe('John Doe');
  });

  describe('upcoming events text', () => {
    const cases = [['10 upcoming events', 10], ['1 upcoming event', 1]];

    test.each(cases)(
      'should render %s in upcoming events paragraph',
      (expectedText: ReactText, upcomingEventCount: ReactText) => {
        // GIVEN
        let upcomingEventsParagraph: ShallowWrapper;

        // WHEN
        wrapper.setProps({ upcoming_event_count: upcomingEventCount });
        upcomingEventsParagraph = wrapper.find('.UpcomingEvents span');

        // THEN
        const upcomingEventsText = upcomingEventsParagraph
          .map(element => element.text())
          .join('');

        expect(upcomingEventsText).toBe(expectedText);
      },
    );
  });

  describe('facebook url', () => {
    test('should render facebook url if it is truthy', () => {
      // GIVEN
      const link = wrapper.find('a.Facebook');

      // THEN
      expect(link).toHaveLength(1);
      expect(link.prop('href')).toBe('facebook-url');
    });

    test('should not render facebook url if it is falsy', () => {
      // GIVEN
      let link: ShallowWrapper;

      // WHEN
      wrapper.setProps({ facebook_page_url: null });
      link = wrapper.find('a.Facebook');

      // THEN
      expect(link).toHaveLength(0);
    });
  });

  test('should render link to artist page', () => {
    // GIVEN
    const link = wrapper.find(Link);

    // THEN
    expect(link).toHaveLength(1);
    expect(link.prop('to')).toBe('/john%20doe/');
  });
});
