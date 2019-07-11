import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import ArtistTitle from '../../components/ArtistTitle/ArtistTitle';
import EventFilters from '../../components/EventFilters/EventFilters';
import Events from '../../components/Events/Events';
import Preloader from '../../components/Preloader/Preloader';
import { Artist } from '../../shared/artist';
import { ArtistTitleProps } from '../../shared/artist-title-props';
import { Event } from '../../shared/event';
import { EventDate } from '../../shared/event-date.enum';
import { EventFiltersProps } from '../../shared/event-filters-props';
import { EventsProps } from '../../shared/events-props';
import * as helpers from '../../shared/helpers/artist';
import ArtistPreview from './ArtistPreview';

configure({
  adapter: new Adapter(),
});

describe('<ArtistPreview />', () => {
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

  const matchMock = { params: { name: 'John%20Doe' } } as any;
  const historyMock = { push: jest.fn() } as any;
  const locationMock = jest.fn() as any;
  let getArtistSpy: jest.SpyInstance;
  let getEventsSpy: jest.SpyInstance;

  let wrapper: ReactWrapper;

  beforeEach(() => {
    const component = (
      <ArtistPreview
        match={matchMock}
        history={historyMock}
        location={locationMock}
      />
    );

    getArtistSpy = jest.spyOn(helpers, 'getArtist');
    getArtistSpy.mockImplementation(() => artist);
    getEventsSpy = jest.spyOn(helpers, 'getEvents');
    getEventsSpy.mockImplementation(() => events);

    wrapper = mount(component);
  });

  afterEach(() => {
    locationMock.mockClear();
    getArtistSpy.mockClear();
    getEventsSpy.mockClear();
  });

  test('should show preloader initially', () => {
    // GIVEN
    const preloader = wrapper.find(Preloader);

    // THEN
    expect(preloader).toHaveLength(1);
  });

  test('should request for artist and events', () => {
    // THEN
    expect(getArtistSpy).toHaveBeenCalledTimes(1);
    expect(getArtistSpy).toHaveBeenCalledWith('John Doe');
    expect(getEventsSpy).toHaveBeenCalledTimes(1);
    expect(getEventsSpy).toHaveBeenCalledWith('John Doe', EventDate.Upcoming);
  });

  test('should redirect to home page if artist is not found', async () => {
    // GIVEN
    getArtistSpy.mockImplementation(() => null);
    historyMock.push.mockClear();

    // WHEN
    await wrapper.setProps({ match: { params: { name: 'John' } } });

    // THEN
    expect(historyMock.push).toHaveBeenCalled();
  });

  test('should render article title, event filters, event after data is loaded', () => {
    // GIVEN
    let _articleTitle: ReactWrapper<ArtistTitleProps>;
    let _eventFilters: ReactWrapper<EventFiltersProps>;
    let _events: ReactWrapper<EventsProps>;

    // WHEN
    wrapper.update();
    _articleTitle = wrapper.find(ArtistTitle);
    _eventFilters = wrapper.find(EventFilters);
    _events = wrapper.find(Events);

    // THEN
    expect(_articleTitle).toHaveLength(1);
    expect(_articleTitle.prop('imageSrc')).toBe('thumb-url');
    expect(_articleTitle.prop('name')).toBe('John Doe');
    expect(_eventFilters).toHaveLength(1);
    expect(_eventFilters.prop('eventDate')).toBe(EventDate.Upcoming);
    expect(_events).toHaveLength(1);
    expect(_events.prop('events')).toBe(events);
  });

  test('should request events on event filter change', async () => {
    // WHEN
    await wrapper.update();
    wrapper
      .find(EventFilters)
      .find('button')
      .last()
      .simulate('click');
    await wrapper.update();

    // THEN
    expect(getArtistSpy).toHaveBeenCalledTimes(2);
    expect(getEventsSpy).toHaveBeenCalledTimes(2);
  });
});
