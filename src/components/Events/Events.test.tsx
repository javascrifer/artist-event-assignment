import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { Event } from '../../shared/event';
import { toDateTimeString } from '../../shared/helpers';
import Events from './Events';

configure({
  adapter: new Adapter(),
});

describe('<Events />', () => {
  const events: Event[] = [
    {
      datetime: '2013-07-21T16:30:00',
      description: 'event-description',
      id: 1,
      lineup: [],
      venue: {
        city: 'venue-city-1',
        country: 'venue-country-1',
        name: 'venue-name-1',
      },
    },
    {
      datetime: '2014-01-14T20:00:00',
      id: 2,
      lineup: [],
      venue: {
        city: 'venue-city-2',
        country: 'venue-country-2',
        name: 'venue-name-2',
      },
    },
  ];
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Events events={events} />);
  });

  test('should render as much events as provided', () => {
    // GIVEN
    const _events = wrapper.find('.Event');

    // THEN
    expect(_events).toHaveLength(2);
  });

  test('should render event description only if it is provided', () => {
    // GIVEN
    const _events = wrapper.find('.Event');
    const withoutDescription = _events.last();
    const withDescription = _events.first();

    // THEN
    expect(withoutDescription.find('.Description')).toHaveLength(0);
    expect(withDescription.find('.Description')).toHaveLength(1);
    expect(
      withDescription
        .find('.Description')
        .contains(events[0].description as string),
    ).toBeTruthy();
  });

  test('should render event location and datetime', () => {
    // GIVEN
    const {
      datetime,
      venue: { name, city, country },
    } = events[0];

    const event = wrapper.find('.Event').first();
    const _datetime = event.find('p:first-child span');
    const _location = event.find('p:last-child span');

    // THEN
    expect(_datetime).toHaveLength(1);
    expect(_datetime.contains(toDateTimeString(datetime))).toBeTruthy();
    expect(_location).toHaveLength(1);
    expect(_location.contains(`${name}, ${city}, ${country}`)).toBeTruthy();
  });

  test('should render "Events not found" message if events are missing', () => {
    // GIVEN
    const _events: Event[] = [];

    // WHEN
    wrapper.setProps({ events: _events });

    // THEN
    const eventElements = wrapper.find('.Event');
    const notice = wrapper.find('.Notice');

    expect(eventElements).toHaveLength(0);
    expect(notice).toHaveLength(1);
    expect(notice.contains('Events not found')).toBeTruthy();
  });
});
