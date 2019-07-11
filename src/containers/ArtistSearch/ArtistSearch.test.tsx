import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import ArtistCard from '../../components/ArtistCard/ArtistCard';
import Input from '../../components/Input/Input';
import { Artist } from '../../shared/artist';
import { ArtistCardProps } from '../../shared/artist-card-props';
import * as helpers from '../../shared/helpers/artist';
import ArtistSearch from './ArtistSearch';

configure({
  adapter: new Adapter(),
});

jest.useFakeTimers();

describe('<ArtistSearch />', () => {
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

  let getArtistSpy: jest.SpyInstance;
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const component = (
      <MemoryRouter>
        <ArtistSearch />
      </MemoryRouter>
    );

    getArtistSpy = jest.spyOn(helpers, 'getArtist');
    getArtistSpy.mockImplementation(() => artist);

    wrapper = mount(component);
  });

  afterEach(() => {
    getArtistSpy.mockClear();
  });

  test('should render a title', () => {
    // GIVEN
    const title = wrapper.find('.Title');

    // THEN
    expect(title).toHaveLength(1);
    expect(title.contains('Find your artist')).toBeTruthy();
  });

  test('should render an input', () => {
    // GIVEN
    const input = wrapper.find(Input);

    // THEN
    expect(input).toHaveLength(1);
    expect(input.prop('placeholder')).toBe('Type artists name...');
    expect(input.prop('value')).toBe('');
  });

  test('should not render artist card if artist is not found', () => {
    // GIVEN
    const artistCard = wrapper.find(ArtistCard);

    // THEN
    expect(artistCard).toHaveLength(0);
  });

  test('should request for artist and render it on input change', async () => {
    // GIVEN
    const input = wrapper
      .find(Input)
      .find('input')
      .first();
    let artistCard: ReactWrapper<ArtistCardProps>;

    // WHEN
    input.simulate('change', { target: { value: 'John' } });
    jest.advanceTimersByTime(1000);
    await wrapper.update();
    await wrapper.update();
    artistCard = wrapper.find(ArtistCard);

    // THEN
    expect(getArtistSpy).toHaveBeenCalledTimes(1);
    expect(getArtistSpy).toHaveBeenCalledWith('John');
    expect(artistCard).toHaveLength(1);
    expect(artistCard.props()).toEqual({ ...artist, artistName: 'John' });
  });
});
